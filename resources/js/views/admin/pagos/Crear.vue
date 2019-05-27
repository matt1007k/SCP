<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 class="mb-3">
                <span class="headline">Registrar pagos</span>
              </v-flex>
              <v-flex xs12>
                <span class="body-2">Datos Persona</span>
              </v-flex>
              <v-flex xs12 sm6>
                <div class="typeahead-dropdown">
                  <div class="typeahead-input_wrap">
                    <v-text-field
                      :value="getNamePersona"
                      ref="search"
                      @blur="onBlur"
                      type="text"
                      label="Persona"
                      placeholder="Buscar persona por DNI o Nombre..."
                      @input="filterDataPersona"
                      @keydown.esc="onEsc"
                      @keydown.up="onKey"
                      @keydown.down="onDownKey"
                      @keydown.enter="onEnterKey"
                      autocomplete="off"
                    ></v-text-field>
                  </div>
                  <ul class="typeahead-list" v-if="lista_personas.length">
                    <li
                      class="typeahead-item"
                      v-for="(persona, index) in lista_personas"
                      :key="persona.id"
                    >
                      <a
                        :class="['typeahead-link', selectIndex === index ? 'typeahead-active':'']"
                        @mousedown.prevent="select(persona)"
                        @mouseover.prevent="onMouse(index)"
                      >{{persona.dni}} - {{persona.apellido_paterno}} {{persona.apellido_materno}}, {{persona.nombre}}</a>
                    </li>
                  </ul>
                  <!-- <ul class="typeahead-list" v-else>
                  <li class="typeahead-item">No existe ese registro...</li>
                  </ul>-->
                </div>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="El DNI" v-model="form.persona.dni" disabled></v-text-field>
              </v-flex>
              <v-flex xs12>
                <span class="body-2 mb-2">El periodo de pago</span>
              </v-flex>
              <v-flex xs12 sm4>
                <div class="form-group">
                  <label for="anio">El año</label>
                  <select v-model="form.anio" class="form-control" id="anio">
                    <option selected value>--- Seleccionar el año ---</option>
                    <option v-for="(anio, i) in items_anio" :key="i" :value="anio" v-text="anio"></option>
                  </select>
                </div>
              </v-flex>
              <v-flex xs12 sm4 class="pl-2">
                <div class="form-group">
                  <label for="mes">El mes</label>
                  <select v-model="form.mes" class="form-control" id="mes">
                    <option selected value>--- Seleccionar el mes ---</option>
                    <option
                      v-for="(mes, i) in items_mes"
                      :key="i"
                      :value="mes.value"
                      v-text="mes.text"
                    ></option>
                  </select>
                </div>
                <v-select v-model="form.mes" :items="items_mes" label="El mes del pago"></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-left">
              <v-text-field v-model="props.item.descuento"></v-text-field>
            </td>
            <td class="text-xs-center">
              <v-text-field type="number" v-model="props.item.monto"></v-text-field>
            </td>
            <td>
              <v-tooltip bottom>
                <v-btn slot="activator" icon color="error" @click="removeRow(props.index)">
                  <v-icon>$vuetify.icons.close</v-icon>
                </v-btn>
                <span>Eliminar fila</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:footer>
            <td>
              <v-btn color="primary" @click="addRow">Agregar fila</v-btn>
            </td>
            <td>
              <strong>Total Liquido</strong>
              <p>S/. 2131</p>
            </td>
            <td></td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import { years } from "../../../services/listYears";
export default {
  components: {},
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
      isOpen: false,
      selectIndex: -1,
      headers: [
        {
          text: "Haber o Decuento",
          align: "left",
          sortable: false,
          value: "descuento"
        },
        { text: "Monto S/.", value: "monto", sortable: false },
        { text: "Accion", value: "action", sortable: false }
      ],
      items: [
        {
          id: 1,
          descuento: "Frozen Yogurt",
          monto: 159
        },
        {
          id: 2,
          descuento: "Ice cream sandwich",
          monto: 237
        }
      ]
    };
  },
  created() {
    document.title = "Registrar un Pago";
    this.addCurrentYear();
  },
  methods: {
    addRow() {
      this.items.push({
        descuento: "",
        monto: 0
      });
    },
    removeRow(index) {
      this.items.splice(index, 1);
    },
    onKey(e) {
      const KeyCode = e.KeyCode || e.which;
      if (!e.shiftKey && KeyCode !== 9 && !this.isOpen) {
        this.open();
      }
    },
    open() {
      this.fetchData("");
      this.isOpen = true;
      this.$nextTick(() => {
        this.$refs.search.focus();
      });
    },
    filterDataPersona(ev) {
      this.isLoading = true;
      const params = {
        q: ev
      };
      axios
        .get("/search-personas", { params })
        .then(res => {
          this.isLoading = false;

          this.lista_personas = res.data.personas;
        })
        .catch(err => console.log(err));
    },
    onBlur() {
      this.close();
    },
    onEsc() {
      this.close();
    },
    close() {
      this.lista_personas = [];
      this.isOpen = false;
      this.search = "";
      this.selectIndex = -1;
    },
    onSearch(e) {
      const q = e.target.value;
      this.selectIndex = 0;
      this.filterDataPersona(q);
    },
    onUpKey(e) {
      if (this.selectIndex > 0) {
        this.selectIndex--;
      }
    },
    onDownKey(e) {
      if (this.results.length - 1 > this.selectIndex) {
        this.selectIndex++;
      }
    },
    onEnterKey() {
      const found = this.results[this.selectIndex];
      if (found) {
        this.select(found);
      }
    },
    select(result) {
      this.form.persona = result;
      this.$emit("input", {
        target: {
          value: result
        }
      });
      this.close();
    },
    onMouse(index) {
      this.selectIndex = index;
    },
    addCurrentYear() {
      let currentYear = new Date().getFullYear();
      let lastYear = this.items_anio.pop();
      if (Number(lastYear) < currentYear) {
        this.items_anio = [...this.items_anio, lastYear];
        this.items_anio = [...this.items_anio, currentYear];
      }
    }
  },
  computed: {
    getNamePersona() {
      if (!this.form.persona.apellido_paterno) {
        return "";
      }
      return `${this.form.persona.apellido_paterno} ${
        this.form.persona.apellido_materno
      }, ${this.form.persona.nombre}`;
    }
  }
};
</script>

<style>
</style>
