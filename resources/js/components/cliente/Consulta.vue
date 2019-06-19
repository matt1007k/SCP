<template>
  <v-app>
    <tool-bar-client></tool-bar-client>
    <v-content>
      <v-container>
        <v-layout row wrap class="mb-3">
          <v-flex xs12>
            <v-card>
              <v-container fill-height fluid>
                <v-layout row wrap>
                  <v-flex xs12 class="mb-3">
                    <span class="headline">Buscar el pago por año y el mes</span>
                    <div class="body-1">Consulta tus pagos por año y el mes.</div>
                  </v-flex>
                  <v-flex xs12>
                    <span class="body-2">Tus datos personales</span>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="Nombre completo" v-model="form.persona.nombre" disabled></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field label="El DNI" v-model="form.persona.dni" disabled></v-text-field>
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
    </v-content>
  </v-app>
</template>

<script>
import { months } from "../../services/listMonthsOfTheYear";
import { years } from "../../services/listYears";
import ToolBarClient from "./ToolBarClient";
export default {
  components: { ToolBarClient },
  data: () => ({
    form: {
      persona: {},
      mes: "",
      anio: ""
    },
    isLoading: false,
    items_anio: years,
    items_mes: months,
    lista_resultado: [],
    errors: {}
  }),
  created() {
    this.form.persona.id = this.$auth.user.user.id;
    this.form.persona.dni = this.$auth.user.user.dni;
    this.form.persona.nombre = this.$auth.user.user.name;
    this.form.persona.cargo = this.$auth.user.user.cargo;
  },
  methods: {
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
  }
};
</script>

