<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <span class="headline">Reporte de pagos por mes</span>
                <div class="body-1">Consultar los pagos de una persona por un periodo mensual.</div>
              </v-flex>
              <v-flex xs12>
                <span class="body-2">Datos de la persona</span>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="pr-2">
                  <v-autocomplete
                    v-model="form.persona"
                    :items="lista_personas"
                    :loading="isLoading"
                    :search-input.sync="search"
                    no-data-text="Sin resultados"
                    item-text="nombre"
                    item-value="API"
                    label="Nombre"
                    prepend-icon="mdi-database-search"
                    :filter="customFilter"
                    placeholder="Buscar por DNI o nombre completo..."
                    return-object
                    :error-messages="errors.dni"
                  >
                    <template v-slot:item="data">
                      <v-list-tile-content>
                        <v-list-tile-title>{{data.item.apellido_paterno}} {{data.item.apellido_materno}}, {{data.item.nombre}}</v-list-tile-title>
                        <v-list-tile-sub-title>DNI: {{data.item.dni}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </v-autocomplete>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="Apellido Paterno"
                  v-model="form.persona.apellido_paterno"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  label="Apellido Materno"
                  v-model="form.persona.apellido_materno"
                  disabled
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="El DNI" v-model="form.persona.dni" disabled></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="El cargo" v-model="form.persona.cargo" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <span class="body-2 mb-2">El periodo del pago</span>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <div class="pr-2">
                  <v-select
                    v-model="form.anio"
                    :items="items_anio"
                    item-text="anio"
                    item-value="anio"
                    label="El año"
                    :error-messages="errors.anio"
                  ></v-select>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md3 class="pl-2">
                <v-select
                  v-model="form.mes"
                  :items="items_mes"
                  label="El mes"
                  :error-messages="errors.mes"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm9 md3></v-flex>
              <v-flex xs12 sm3 md3 class="d-flex" justify-end>
                <v-btn color="success" @click="buscarPago()">Buscar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap row>
      <v-flex xs12>
        <template v-if="Object.keys(lista_resultado).length !== 0">
          <div class="title mb-2">Resultados encontrados</div>
          <v-card>
            <v-card-text class="d-flex justify-content-between">
              <div class="details-info">
                <div class="heading">{{getNameMonth(lista_resultado.mes)}}, {{lista_resultado.anio}}</div>
                <div class="body-2">{{getName()}}</div>
              </div>
              <div class="actions">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="success"
                      @click="downloadPDF(lista_resultado.anio, lista_resultado.mes, form.persona.dni)"
                      v-on="on"
                    >
                      <v-icon>mdi mdi-cloud-download-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Descargar constancia de pago</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="info"
                      @click="viewPDF(lista_resultado.anio, lista_resultado.mes, form.persona.dni)"
                      v-on="on"
                    >
                      <v-icon>mdi mdi-printer</v-icon>
                    </v-btn>
                  </template>
                  <span>Imprimir constancia de pago</span>
                </v-tooltip>
              </div>
            </v-card-text>
          </v-card>
        </template>
        <template v-else-if="loading">
          <v-card>
            <v-card-text>
              <div class="text-xs-center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </div>
            </v-card-text>
          </v-card>
        </template>
        <template v-else-if="notFound">
          <v-card>
            <v-card-text>
              <div class="text-xs-center body-2">{{this.msg}}</div>
            </v-card-text>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";

export default {
  data() {
    return {
      form: {
        persona: {},
        mes: "",
        anio: ""
      },
      items_mes: months,
      items_anio: [],
      isLoading: false,
      search: "",
      lista_personas: [],
      lista_resultado: [],
      loading: false,
      notFound: false,
      msg: null,
      errors: {}
    };
  },
  created() {
    document.title = "Reporte de pagos por mes de un año";
    this.getYears();
  },
  methods: {
    customFilter(item, queryText, itemText) {
      const nombre = item.nombre.toLowerCase();
      const apellido_paterno = item.apellido_paterno.toLowerCase();
      const apellido_materno = item.apellido_materno.toLowerCase();
      const dni = item.dni.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        nombre.indexOf(searchText) > -1 ||
        apellido_paterno.indexOf(searchText) ||
        apellido_materno.indexOf(searchText) ||
        dni.indexOf(searchText) > -1
      );
    },
    getYears() {
      axios
        .get("/periodos")
        .then(res => (this.items_anio = res.data.years))
        .catch(err => console.log(err));
    },
    getNameMonth(numero) {
      let mes_item = this.items_mes.find(mes => {
        return mes.value === numero;
      });
      return mes_item.text;
    },
    buscarPago() {
      this.loading = true;
      axios
        .get(`/search/por-mes`, {
          params: {
            anio: this.form.anio,
            mes: this.form.mes,
            dni: this.form.persona.dni
          }
        })
        .then(res => {
          this.loading = false;
          this.errors = {};
          this.lista_resultado = res.data.pagos;

          let msg = res.data.msg;
          if (msg) {
            this.loading = false;
            this.notFound = true;
            this.msg = msg;
            this.lista_resultado = {};
          }
        })
        .catch(err => {
          this.loading = false;
          this.errors = err.response.data.errors;
        });
    },
    downloadPDF(anio, mes, dni) {
      axios({
        url: "/reporte/por-mes",
        method: "GET",
        params: { anio, mes, dni },
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const name_file = `${this.form.persona.codigo_modular}-${
          this.form.mes
        }-${this.form.anio}.pdf`;
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    viewPDF(anio, mes, dni) {
      window.open(
        `/reporte/por-mes?anio=${anio}&mes=${mes}&dni=${dni}`,
        "_blank"
      );
    },
    getName() {
      return `${this.form.persona.apellido_paterno} ${
        this.form.persona.apellido_materno
      }, ${this.form.persona.apellido_materno} `;
    }
  },
  watch: {
    search(value) {
      if (this.isLoading) return;
      this.isLoading = true;
      const params = { q: value };
      axios
        .get("/search-personas", { params })
        .then(res => {
          this.isLoading = false;

          this.lista_personas = res.data.personas;
        })
        .catch(err => console.log(err))
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>

<style>
</style>
