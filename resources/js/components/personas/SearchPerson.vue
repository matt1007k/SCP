<template>
  <v-layout row wrap class="mb-3">
    <v-flex xs12>
      <span class="body-2">Datos de la persona</span>
    </v-flex>
    <v-flex xs12 class="mb-2 mt-2">
      <v-tooltip bottom>
        <v-icon slot="activator">$vuetify.icons.filter</v-icon>
        <span>Filtrar por estado</span>
      </v-tooltip>
      <v-btn-toggle light v-model="toggleActiveBtn">
        <v-btn flat color="success" @click="filterBy('activo')">Activos</v-btn>
        <v-btn flat color="info" @click="filterBy('sobreviviente')">Sobrevivientes</v-btn>
        <v-btn flat color="error" @click="filterBy('cesante')">Cesantes</v-btn>
      </v-btn-toggle>
    </v-flex>
    <v-flex xs12 sm6>
      <div class="pr-2">
        <v-autocomplete
          v-model="getPersona"
          :items="lista_personas"
          :loading="isLoading"
          :search-input.sync="search"
          @change="onSelect"
          no-data-text="Sin resultados"
          item-text="nombre"
          item-value="API"
          label="Nombre"
          prepend-icon="mdi-database-search"
          :filter="customFilter"
          placeholder="Buscar por Cod. Modular, DNI,  o nombre completo..."
          return-object
          :error-messages="errors.persona_id"
        >
          <template v-slot:item="data">
            <v-list-tile-content>
              <v-list-tile-title>{{getNameComplete(data.item)}}</v-list-tile-title>
              <v-list-tile-sub-title>
                <span>DNI: {{data.item.dni}} -</span>
                <span>COD. MODULAR: {{data.item.codigo_modular}}</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </v-autocomplete>
      </div>
    </v-flex>
    <v-flex xs12>
      <transition name="slide-fade">
        <v-card class="pa-2" outlined v-if="Object.keys(getPersona).length !== 0">
          <div class="title mb-1">{{getNameComplete(getPersona)}}</div>
          <div class="subtitle-1">
            <div>
              <span class="font-weight-bold">DNI:</span>
              {{getPersona.dni}}
            </div>
            <div>
              <span class="font-weight-bold">COD. MODULAR:</span>
              {{getPersona.codigo_modular}}
            </div>
            <div>
              <span class="font-weight-bold">ESTADO:</span>
              <EstadoChip :estado="getPersona.estado" />
            </div>
          </div>
        </v-card>
      </transition>
    </v-flex>
  </v-layout>
</template>
<script>
import EstadoChip from "./EstadoChip";
export default {
  components: { EstadoChip },
  props: {
    errors: {
      default: null
    },
    person: {
      default: null
    }
  },
  data() {
    return {
      estado: "activo",
      toggleActiveBtn: 0,
      search: "",
      lista_personas: [],
      isLoading: false,
      persona: {}
    };
  },
  computed: {
    getPersona: {
      get() {
        this.persona = this.person && this.person.nombre ? this.person : {};
        this.estado =
          this.person && this.person.estado ? this.person.estado : this.estado;
        this.onSelectStatus(this.estado);
        return this.persona;
      },
      set(value) {
        return (this.persona = value);
      }
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
    filterBy(prop) {
      this.estado = prop;
      this.lista_personas = [];
      this.$emit("input", {
        target: {
          value: {}
        }
      });
    },
    onSelect(result) {
      this.$emit("input", {
        target: {
          value: result
        }
      });
    },
    onSelectStatus(estado) {
      if (estado == "activo") {
        this.toggleActiveBtn = 0;
      } else if (estado == "sobreviviente") {
        this.toggleActiveBtn = 1;
      } else if (estado == "cesante") {
        this.toggleActiveBtn = 2;
      } else {
        this.toggleActiveBtn = 0;
      }
    },
    getNameComplete(persona) {
      if (persona !== undefined)
        return `${persona.apellido_paterno} ${persona.apellido_materno}, ${persona.nombre}`;
      else return "";
    }
  },
  watch: {
    search(value) {
      if (this.isLoading) return;
      this.isLoading = true;
      const params = { q: value, estado: this.estado };
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