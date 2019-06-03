<template>
  <v-container>
    <form @submit.prevent="onSubmit">
      <v-layout row wrap class="mb-3">
        <v-flex xs12>
          <v-btn color="info" @click="onCancel">
            <v-icon>$vuetify.icons.left</v-icon>
            <span>Regresar Atrás</span>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-container fill-height fluid>
              <v-layout row wrap>
                <v-flex xs12 class="mb-3">
                  <span class="headline">Registrar pago</span>
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
                      <!-- <template
                      v-slot:selection="data"
                      >{{data.item.apellido_paterno}} {{data.item.apellido_materno}}, {{data.item.nombre}}</template>-->
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
                <v-flex xs12 sm6 md3>
                  <v-btn color="success" @click="addHD('haber')">Agregar Haber</v-btn>
                </v-flex>
                <v-flex xs12 sm6 md3>
                  <v-btn color="success" @click="addHD('descuento')">Agregar Descuento</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout wrap>
        <transition name="fade">
          <v-flex xs12 v-if="errors.haberes">
            <v-alert :value="true" type="error">
              <div class="body-2">Los haberes son necesarios.</div>
            </v-alert>
          </v-flex>
        </transition>
        <transition name="fade">
          <v-flex xs12 v-if="errors.descuentos">
            <v-alert :value="true" type="error">
              <div class="body-2">Los descuentos son necesarios.</div>
            </v-alert>
          </v-flex>
        </transition>
        <v-flex xs12>
          <lista-items title="Haberes" :items="form.haberes" @remove="removeItem"></lista-items>
          <lista-items title="Descuentos" :items="form.descuentos" @remove="removeItem"></lista-items>
        </v-flex>
        <v-flex xs12 class="mb-2">
          <v-card>
            <v-container fluid grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 sm3>
                  <div class="subheading font-weight-bold">Total Haber</div>
                  <p class="no-margin">S/. {{totalHaber()}}</p>
                </v-flex>
                <v-flex xs12 sm3>
                  <div class="subheading font-weight-bold">Total Descuento</div>
                  <p class="no-margin">S/. {{totalDescuento()}}</p>
                </v-flex>
                <v-flex xs12 sm3>
                  <div class="subheading font-weight-bold">Total Líquido</div>
                  <p class="no-margin">S/. {{totalLiquido()}}</p>
                </v-flex>
                <v-flex xs12 sm3>
                  <div class="subheading font-weight-bold">Total Imponible</div>
                  <p class="no-margin">S/. {{totalImponible()}}</p>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-btn color="error" @click="onCancel">Cancelar</v-btn>
        </v-flex>
        <v-flex xs12 sm6>
          <v-btn color="primary" type="submit">Guardar</v-btn>
        </v-flex>
      </v-layout>
    </form>
    <agregar ref="modalAgregarhb" @addRow="addRow"></agregar>
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import { years } from "../../../services/listYears";
import Agregar from "../../../components/pagos/Agregar";
import ListaItems from "../../../components/pagos/ListaItems";
export default {
  components: { Agregar, ListaItems },
  data() {
    return {
      form: {
        anio: "",
        mes: "",
        persona: {},
        total_haber: 0,
        haberes: [],
        total_descuento: 0,
        descuentos: [],
        monto_liquido: 0,
        monto_imponible: 0
      },
      items_anio: years,
      items_mes: months,
      lista_personas: [],
      errors: {},
      search: "",
      isLoading: false
    };
  },
  created() {
    document.title = "Registrar un Pago";
    // this.addCurrentYear();
  },
  mounted() {
    this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
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

    addHD(tipo) {
      this.$root.modalAgregarhb.showModal();
      this.$root.modalAgregarhb.tipo = tipo;
    },
    addRow(item, tipo) {
      if (tipo == "haber") {
        const haberes = [...this.form.haberes];
        const updatedItemIndex = haberes.findIndex(
          haber => haber.id === item.id
        );
        if (updatedItemIndex < 0) {
          this.form.haberes.push({ ...item, monto: 0.0 });
        } else {
          this.$root.$snackbar.show("El haber ya a sido agregado.", {
            color: "warning"
          });
        }
      } else if (tipo == "descuento") {
        const descuentos = [...this.form.descuentos];
        const updatedItemIndex = descuentos.findIndex(
          descuento => descuento.id === item.id
        );
        if (updatedItemIndex < 0) {
          this.form.descuentos.push({ ...item, monto: 0.0 });
        } else {
          this.$root.$snackbar.show("El descuento ya a sido agregado.", {
            color: "warning"
          });
        }
      }
    },
    removeItem(index, tipo) {
      if (tipo == "haber") {
        this.form.haberes.splice(index, 1);
      } else if (tipo == "descuento") {
        this.form.descuentos.splice(index, 1);
      }
    },
    // addCurrentYear() {
    //   let currentYear = new Date().getFullYear();
    //   let lastYear = this.items_anio.pop();
    //   if (Number(lastYear) < currentYear) {
    //     this.items_anio = [...this.items_anio, lastYear];
    //     this.items_anio = [...this.items_anio, currentYear];
    //   }
    // },
    totalHaber() {
      const totalHaber = this.form.haberes
        .map(item => {
          let total = 0;
          return (total += parseFloat(item.monto));
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);

      return parseFloat(totalHaber).toFixed(2);
    },
    totalDescuento() {
      const totalDescuento = this.form.descuentos
        .map(item => {
          let total = 0;
          return (total += parseFloat(item.monto));
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);

      return parseFloat(totalDescuento).toFixed(2);
    },
    totalLiquido() {
      const total = this.totalHaber() - this.totalDescuento();
      return parseFloat(total).toFixed(2);
    },
    totalImponible() {
      const total = this.form.haberes
        .map(item => {
          let totalItem = 0;
          if (item.es_imponible == 1) {
            return (totalItem += parseFloat(item.monto));
          }
          return totalItem;
        })
        .reduce((a, b) => {
          return a + b;
        }, 0);
      return parseFloat(total).toFixed(2);
    },
    onSubmit() {
      const form = {
        anio: this.form.anio,
        mes: this.form.mes,
        persona: this.form.persona,
        total_haber: this.totalHaber(),
        haberes: this.form.haberes,
        total_descuento: this.totalDescuento(),
        descuentos: this.form.descuentos,
        monto_liquido: this.totalLiquido(),
        monto_imponible: this.totalImponible()
      };
      axios
        .post("/pagos", form)
        .then(res => {
          this.$router.push("/admin/pagos/lista");
          this.$parent.this.$root.$snackbar.show(
            "Datos registrados correctamente."
          );
          this.resetForm();
        })
        .catch(err => {
          this.errors = err.response.data.errors;
          if (err.response.status == 403) {
            this.$router.push("/403");
          }
        });
    },
    resetForm() {
      this.form.persona = {};
      this.form.anio = "";
      this.form.mes = "";
      this.form.haberes = [];
      this.form.descuentos = [];
      this.form.total_haber = 0;
      this.form.total_descuento = 0;
      this.form.monto_liquido = 0;
      this.form.monto_imponible = 0;
    },
    onCancel() {
      this.$router.push("/admin/pagos/lista");
      this.resetForm();
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
