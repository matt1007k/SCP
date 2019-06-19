<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 class="mb-3">
                <span class="headline">Reporte de pagos por año</span>
                <div class="body-1">Consultar el pago de una persona de un año completo.</div>
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
                    :error-messages="errors.persona"
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
    <v-layout row wrap>
      <v-flex xs12>
        <div class="title mb-2">Resultados encontrados</div>
        <template v-if="lista_resultado.lenght > 0">
          <v-card>
            <v-card-text>
              <div class="body-2">go</div>
            </v-card-text>
          </v-card>
        </template>
        <template v-else>
          <v-card>
            <v-card-text>
              <div class="body-2">Sin resultados...</div>
            </v-card-text>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import { years } from "../../../services/listYears";
export default {
  data: () => ({
    form: {
      persona: {},
      mes: "",
      anio: ""
    },
    isLoading: false,
    items_anio: years,
    items_mes: months,
    search: "",
    lista_personas: [],
    lista_resultado: [],
    errors: {}
  }),
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
    buscarPago() {
      // axios
      //   .get(`/reporte/por-anio`, {
      //     params: {
      //       anio: this.form.anio,
      //       dni: this.form.dni
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     this.errors = err.response.data.errors;
      //   });

      axios({
        url: "/reporte/por-anio",
        method: "GET",
        params: {
          anio: this.form.anio,
          persona_id: this.form.persona.id
        },
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const name_file = `${this.form.persona.codigo_modular}-${
          this.form.anio
        }.pdf`;
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    viewPDF() {
      axios(`/reporte/pdf`, {
        method: "GET",
        responseType: "blob" //Force to receive data in a Blob Format
      })
        .then(response => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch(error => {
          console.log(error);
        });
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
