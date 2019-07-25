<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 class="mb-3">
                <span class="headline">Reporte de pagos por años</span>
                <div class="body-1">Consultar el pago de una persona por rango de años.</div>
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
                <span class="body-2 mb-2">El periodo del pago por años</span>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <div class="pr-2">
                  <v-select
                    v-model="form.anio_anterior"
                    :items="items_anio"
                    item-text="anio"
                    item-value="anio"
                    label="Del año"
                    :error-messages="errors.anio_anterior"
                  ></v-select>
                </div>
              </v-flex>
              <div>
                <v-icon>mdi mdi-arrow-expand-horizontal</v-icon>
              </div>
              <v-flex xs12 sm6 md3>
                <div class="pr-2">
                  <v-select
                    v-model="form.anio_actual"
                    :items="items_anio"
                    item-text="anio"
                    item-value="anio"
                    label="Hasta el año"
                    :error-messages="errors.anio_actual"
                  ></v-select>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md3 class="pl-2">
                <v-text-field
                  label="Número de Certificado"
                  v-model="form.certificado"
                  :error-messages="errors.certificado"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm4 class="d-flex" justify-end>
                <v-btn color="success" @click="buscarPago()">Buscar</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <template v-if="lista_resultado.length > 0">
          <div class="mb-2 d-flex justify-content-between">
            <div>
              <div class="title">Resultados encontrados</div>
              <dir class="caption">Descargar o imprimir todos los pagos por el rango de años</dir>
            </div>
            <div class="actions">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="success" @click="downloadAllPDF()" v-on="on" icon>
                    <v-icon>mdi mdi-cloud-download-outline</v-icon>
                  </v-btn>
                </template>
                <span>Descargar constancia de pago de todos los años</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="info" @click="viewAllPDF()" v-on="on" icon>
                    <v-icon>mdi mdi-printer</v-icon>
                  </v-btn>
                </template>
                <span>Imprimir constancia de pago de todos los años</span>
              </v-tooltip>
            </div>
          </div>

          <template v-for="(pago, index) in lista_resultado">
            <v-card :key="index">
              <v-card-text class="d-flex justify-content-between">
                <div class="details-info">
                  <div class="heading">Año: {{pago.anio}}</div>
                  <div class="body-2">Nombre completo: {{getName()}}</div>
                  <div class="caption">DNI: {{form.persona.dni}}</div>
                </div>
                <div class="actions">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="success"
                        @click="downloadPDF(pago.anio, form.persona.dni)"
                        v-on="on"
                      >
                        <v-icon>mdi mdi-cloud-download-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Descargar constancia de pago del año ({{pago.anio}})</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn color="info" @click="viewPDF(pago.anio, form.persona.dni)" v-on="on">
                        <v-icon>mdi mdi-printer</v-icon>
                      </v-btn>
                    </template>
                    <span>Imprimir constancia de pago del año ({{pago.anio}})</span>
                  </v-tooltip>
                </div>
              </v-card-text>
            </v-card>
          </template>
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
export default {
  data: () => ({
    form: {
      persona: {},
      anio_anterior: "",
      anio_actual: "",
      certificado: ""
    },
    items_anio: [],
    isLoading: false,
    search: "",
    lista_personas: [],
    lista_resultado: [],
    loading: false,
    notFound: false,
    msg: null,
    errors: {}
  }),
  created() {
    if (this.$auth.can("pagos.consultar") || this.$auth.isAdmin()) {
      document.title = "Reporte de pagos por año";
      this.getYears();
    } else {
      this.$router.push("/admin/403");
    }
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
    buscarPago() {
      this.loading = true;
      if (this.form.anio_anterior > this.form.anio_actual) {
        this.$swal(
          "Mensaje de operación",
          "El campo (del año anterior) debe ser menor, que el campo (hasta el año) o actual.",
          "info"
        );
      }
      axios
        .get(`/search/por-anios`, {
          params: {
            anio_anterior: this.form.anio_anterior,
            anio_actual: this.form.anio_actual,
            dni: this.form.persona.dni,
            certificado: this.form.certificado
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
            this.lista_resultado = [];
          }
        })
        .catch(err => {
          this.loading = false;
          this.errors = err.response.data.errors;
        });
    },
    downloadPDF(anio, dni) {
      axios({
        url: "/reporte/por-anio",
        method: "GET",
        params: { anio, dni, certificado: this.form.certificado },
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const name_file = `${this.form.persona.codigo_modular}-${this.form.anio}.pdf`;
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    downloadAllPDF() {
      let params = {
        anio_anterior: this.form.anio_anterior,
        anio_actual: this.form.anio_actual,
        dni: this.form.persona.dni,
        certificado: this.form.certificado
      };
      axios({
        url: "/reporte/por-anios",
        method: "GET",
        params,
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        const name_file = `${this.form.persona.codigo_modular}-${this.form.anio_anterior}-${this.form.anio_actual}.pdf`;
        link.href = url;
        link.setAttribute("download", name_file); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
    viewPDF(anio, dni) {
      const certificado = this.form.certificado;
      window.open(
        `/reporte/por-anio?anio=${anio}&dni=${dni}&certificado=${certificado}`,
        "_blank"
      );
    },
    viewAllPDF() {
      const anio_anterior = this.form.anio_anterior;
      const anio_actual = this.form.anio_actual;
      const dni = this.form.persona.dni;
      const certificado = this.form.certificado;
      window.open(
        `/reporte/por-anios?anio_anterior=${anio_anterior}&anio_actual=${anio_actual}&dni=${dni}&certificado=${certificado}`,
        "_blank"
      );
    },
    getName() {
      return `${this.form.persona.apellido_paterno} ${this.form.persona.apellido_materno}, ${this.form.persona.nombre} `;
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
