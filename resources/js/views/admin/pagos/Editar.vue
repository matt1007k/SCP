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
                  <span class="headline">Editar pago</span>
                </v-flex>
                <SearchPerson :errors="errors" :person="form.persona" @input="onPerson($event)" />
                <v-flex xs12>
                  <span class="body-2 mb-2">El periodo del pago</span>
                  <v-tooltip top v-if="$auth.can('periodos.create') || $auth.isAdmin()">
                    <v-btn color="primary" fab small @click="addPeriodo()" slot="activator">
                      <v-icon>$vuetify.icons.add</v-icon>
                    </v-btn>
                    <span>Agregar un nuevo año</span>
                  </v-tooltip>
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
    <modal-agregar ref="modalAgregarPeriodo"></modal-agregar>
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import Agregar from "../../../components/pagos/Agregar";
import ModalAgregar from "../../../components/periodos/ModalAgregar";
import SearchPerson from "../../../components/personas/SearchPerson";

import ListaItems from "../../../components/pagos/ListaItems";
export default {
  components: { Agregar, ListaItems, ModalAgregar, SearchPerson },
  data() {
    return {
      form: {
        id: "",
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
      items_anio: [],
      items_mes: months,
      lista_personas: [],
      errors: {},
      search: "",
      isLoading: false
    };
  },
  created() {
    if (this.$auth.can("pagos.edit") || this.$auth.isAdmin()) {
      document.title = "Editar un Pago";
      this.getYears();
      this.getItem();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
    this.$root.modalAgregarPeriodo = this.$refs.modalAgregarPeriodo;
  },
  methods: {
    getItem() {
      axios
        .get(`/pagos/${this.$route.params.id}/edit`)
        .then(res => {
          this.form = res.data.form;
        })
        .catch(err => {
          this.errors = err.response.data.errors;
          if (err.response.status == 403) {
            this.$router.push("/403");
          }
        });
    },
    getYears() {
      axios
        .get("/periodos")
        .then(res => (this.items_anio = res.data.years))
        .catch(err => console.log(err));
    },
    addPeriodo() {
      this.$root.modalAgregarPeriodo.show();
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
          this.form.haberes.push({ ...item, monto: 0.0, hd_id: item.id });
        } else {
          this.$swal(
            "Mensaje de operación",
            "El haber ya ha sido agregado.",
            "info"
          );
        }
      } else if (tipo == "descuento") {
        const descuentos = [...this.form.descuentos];
        const updatedItemIndex = descuentos.findIndex(
          descuento => descuento.id === item.id
        );
        if (updatedItemIndex < 0) {
          this.form.descuentos.push({ ...item, monto: 0.0, hd_id: item.id });
        } else {
          this.$swal(
            "Mensaje de operación",
            "El descuento ya ha sido agregado.",
            "info"
          );
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
    onPerson(e) {
      this.form.persona = e.target.value;
    },
    onSubmit() {
      const form = {
        anio: this.form.anio,
        mes: this.form.mes,
        persona_id: this.form.persona.id,
        total_haber: this.totalHaber(),
        haberes: this.form.haberes,
        total_descuento: this.totalDescuento(),
        descuentos: this.form.descuentos,
        monto_liquido: this.totalLiquido(),
        monto_imponible: this.totalImponible()
      };
      axios
        .put(`/pagos/${this.$route.params.id}`, form)
        .then(res => {
          this.$router.push("/admin/pagos/lista");
          this.$swal(
            "Mensaje de operación",
            "Datos editados correctamente",
            "success"
          );
        })
        .catch(err => {
          this.errors = err.response.data.errors;
          if (err.response.status == 403) {
            this.$router.push("/403");
          }
        });
    },
    onCancel() {
      this.$router.push("/admin/pagos/lista");
    }
  }
};
</script>

