<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm8 md9>
                <span class="headline">Lista de Haberes y Descuentos</span>
              </v-flex>
              <v-flex xs12 sm4 md3 justify-end flexbox>
                <v-btn color="primary">
                  <v-icon>$vuetify.icons.add</v-icon>Agregar hab. o desct.
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid style="padding-bottom: 0; padding-top: 0">
            <v-text-field v-model="search" clearable label="Buscar" type="text">
              <template v-slot:prepend>
                <v-icon>$vuetify.icons.search</v-icon>
              </template>
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                </v-fade-transition>
              </template>
            </v-text-field>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="descuentos"
          :search="search"
          hide-actions
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.codigo }}</td>
            <td class="text-xs-center">{{ props.item.nombre }}</td>
            <td>
              <template v-if="props.item.tipo === 'descuento'">
                <v-chip
                  text-color="white"
                  color="success"
                  class="text-capitalize"
                  small
                >{{ props.item.tipo }}</v-chip>
              </template>
              <template v-if="props.item.tipo === 'haber'">
                <v-chip
                  text-color="white"
                  color="info"
                  class="text-capitalize"
                  small
                >{{ props.item.tipo }}</v-chip>
              </template>
            </td>
            <td class="text-xs-center">{{ props.item.descripcion }}</td>
            <td class="text-xs-center">{{props.item.descripcion_simple}}</td>
            <td>
              <v-tooltip bottom>
                <v-btn color="info" fab small slot="activator">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn color="error" fab small slot="activator">
                  <v-icon>$vuetify.icons.delete</v-icon>
                </v-btn>
                <span>Cambiar estado</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      loading: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, { text: "Todos", value: -1 }],
      selected: [],
      headers: [
        {
          text: "Codigo",
          align: "left",
          sortable: false,
          value: "codigo"
        },
        { text: "Nombre", value: "nombre" },
        { text: "Tipo", value: "tipo" },
        { text: "Descripcion", value: "descripcion" },
        { text: "Descripcion simple", value: "descripcion_simple" }
      ],
      descuentos: []
    };
  },
  created() {
    document.title = "Lista de Haberes y Descuentos";
    this.getData();
    console.log(this.$root.$agregar.go());
  },
  methods: {
    getData(url = "/descuentos") {
      axios
        .get(url)
        .then(res => {
          this.personas = res.data.descuentos;
        })
        .catch(err => {
          console.log(err);
        });
    },
    sortBy(prop) {
      this.personas.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  }
};
</script>

<style>
</style>
