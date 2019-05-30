<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 class="mb-3">
                <span class="headline">Editar pago</span>
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
                  <v-select v-model="form.anio" :items="items_anio" label="El año"></v-select>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md3 class="pl-2">
                <v-select v-model="form.mes" :items="items_mes" label="El mes"></v-select>
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
      <v-flex xs12 class="mb-3">
        <v-data-table
          :headers="headersHaber"
          :items="form.haberes"
          hide-actions
          class="elevation-1"
          no-data-text="No hay haberes agregados"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">
              <v-text-field v-model="props.item.nombre" label="Nombre" disabled></v-text-field>
            </td>
            <td class="text-xs-center">
              <v-text-field type="number" v-model="props.item.monto"></v-text-field>
            </td>
            <td>
              <v-tooltip bottom>
                <v-btn
                  slot="activator"
                  icon
                  color="error"
                  @click="removeItem(props.index, 'haber')"
                >
                  <v-icon>$vuetify.icons.close</v-icon>
                </v-btn>
                <span>Eliminar haber</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:footer>
            <td>
              <strong>Total Haber</strong>
              <p>S/. {{totalHaber()}}</p>
            </td>
            <td></td>
            <td></td>
          </template>
        </v-data-table>

        <v-data-table
          :headers="headersDescuento"
          :items="form.descuentos"
          hide-actions
          class="elevation-1"
          no-data-text="No hay descuentos agregados"
        >
          <template v-slot:items="props">
            <td class="text-xs-left">
              <v-text-field v-model="props.item.nombre" label="Nombre" disabled></v-text-field>
            </td>
            <td class="text-xs-center">
              <v-text-field type="number" v-model="props.item.monto"></v-text-field>
            </td>
            <td>
              <v-tooltip bottom>
                <v-btn
                  slot="activator"
                  icon
                  color="error"
                  @click="removeItem(props.index, 'descuento')"
                >
                  <v-icon>$vuetify.icons.close</v-icon>
                </v-btn>
                <span>Eliminar descuento</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:footer>
            <td>
              <strong>Total Descuento</strong>
              <p>S/. {{totalDescuento()}}</p>
            </td>
            <td>
              <strong>Total Liquido</strong>
              <p>S/. {{totalLiquido()}}</p>
            </td>
            <td>
              <strong>Total Remuneracion</strong>
              <p>S/. 2131</p>
            </td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 sm6>
        <v-btn color="error">Cancelar</v-btn>
      </v-flex>
      <v-flex xs12 sm6>
        <v-btn color="primary">Guardar</v-btn>
      </v-flex>
    </v-layout>
    <agregar ref="modalAgregarhb" @addRow="addRow"></agregar>
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import { years } from "../../../services/listYears";
import Agregar from "../../../components/pagos/Agregar";
export default {
  components: { Agregar },
  data() {
    return {
      isLoading: false,
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
      errors: {},
      lista_personas: [],
      search: "",
      headersHaber: [
        {
          text: "Haber",
          align: "left",
          sortable: false,
          value: "haber"
        },
        { text: "Monto S/.", value: "monto", sortable: false },
        { text: "Accion", value: "action", sortable: false }
      ],
      headersDescuento: [
        {
          text: "Descuento",
          align: "left",
          sortable: false,
          value: "descuento"
        },
        { text: "Monto S/.", value: "monto", sortable: false },
        { text: "Accion", value: "action", sortable: false }
      ]
    };
  },
  beforeCreate() {
    this.addCurrentYear();
  },
  created() {
    document.title = "Editar un Pago";
    this.getSale();
  },
  mounted() {
    this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
  },
  methods: {
    getSale() {
      axios
        .get(`/pagos/${this.$route.params.id}/edit`)
        .then(res => (this.form = res.data.form))
        .catch(err => console.log(res));
    },
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
    addCurrentYear() {
      let currentYear = new Date().getFullYear();
      let lastYear = this.items_anio.pop();
      if (Number(lastYear) < currentYear) {
        this.items_anio = [...this.items_anio, lastYear];
        this.items_anio = [...this.items_anio, currentYear];
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

