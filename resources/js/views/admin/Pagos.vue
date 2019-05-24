<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm9 md9>
                <span class="headline">Lista de pagos</span>
              </v-flex>
              <v-flex xs12 sm3 md3 justify-end flexbox>
                <v-btn color="primary" @click.stop="modalAgregar">
                  <v-icon>$vuetify.icons.add</v-icon>Realizar pago
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
            <span class="mb-2">
              <v-tooltip bottom>
                <v-icon slot="activator">$vuetify.icons.filter</v-icon>
                <span>Filtar por estado</span>
              </v-tooltip>
              <v-btn flat @click="filterBy('Todos')">Todos</v-btn>
              <v-btn flat color="success" @click="filterBy('activo')">Activos</v-btn>
              <v-btn flat color="info" @click="filterBy('sobreviviente')">Sobrevivientes</v-btn>
              <v-btn flat color="error" @click="filterBy('cesante')">Censantes</v-btn>
            </span>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="pagos"
          :search="search"
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.periodo }}</td>
            <td>{{ props.item.persona.apellido_paterno }} {{ props.item.persona.apellido_materno }}, {{ props.item.persona.nombre }}</td>
            <td class="text-xs-center">{{ props.item.total_haber }}</td>
            <td class="text-xs-center">{{ props.item.total_descuento }}</td>
            <td class="text-xs-center">{{ props.item.monto_liquido }}</td>
            <td class="text-xs-center">{{ props.item.monto_imponible }}</td>
            <td>
              <v-tooltip bottom>
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
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
    <!-- <modal-agregar ref="agregarPersona"></modal-agregar>
    <modal-editar ref="editarPersona"></modal-editar>-->
    <!-- <modal-editar v-model="showModalEdit"></modal-editar> -->
  </v-container>
</template>

<script>
import ModalAgregar from "../../components/personas/ModalAgregar";
import ModalEditar from "../../components/personas/ModalEditar";
export default {
  components: {},
  data() {
    return {
      search: "",
      tipo: "Todos",
      loading: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, { text: "Todos", value: -1 }],
      selected: [],
      headers: [
        {
          text: "Periodo",
          align: "left",
          sortable: false,
          value: "periodo"
        },
        {
          text: "Nombre persona",
          value: "persona.apellido_paterno"
        },
        { text: "Total Haber", value: "total_haber" },
        { text: "Total Descuento", value: "total_descuento" },
        { text: "Monto Liquido", value: "monto_liquido" },
        { text: "Monto Imponible", value: "monto_Total" }
      ],
      pagos: [],
      showModalEdit: false
    };
  },
  created() {
    document.title = "Lista de Pagos";
    this.getData();
  },
  // mounted() {
  //   this.$root.agregarPersona = this.$refs.agregarPersona;
  //   this.$root.editarPersona = this.$refs.editarPersona;
  // },
  methods: {
    getData(url = "/pagos") {
      axios
        .get(url, { params: { tipo: this.tipo } })
        .then(res => {
          this.pagos = res.data.pagos;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    filterBy(prop) {
      // this.tipo = prop;
      // this.getData();
    },
    modalAgregar() {
      // this.$root.agregarPersona.show();
    },
    modalEditar(persona) {
      // this.$root.editarPersona.show();
      // this.$root.editarPersona.form.id = persona.id;
      // this.$root.editarPersona.form.nombre = persona.nombre;
      // this.$root.editarPersona.form.apellido_paterno = persona.apellido_paterno;
      // this.$root.editarPersona.form.apellido_materno = persona.apellido_materno;
      // this.$root.editarPersona.form.dni = persona.dni;
      // this.$root.editarPersona.form.codigo_modular = persona.codigo_modular;
      // this.$root.editarPersona.form.cargo = persona.cargo;
      // this.$root.editarPersona.form.estado = persona.estado;
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
