<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm9 md9>
                <span class="headline">Lista de personas</span>
              </v-flex>
              <v-flex
                xs12
                sm3
                md3
                justify-end
                flexbox
                v-if="$auth.can('personas.create') || $auth.isAdmin()"
              >
                <v-btn color="primary" @click.stop="modalAgregar">
                  <v-icon>$vuetify.icons.add</v-icon>Agregar persona
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
                <span>Filtrar por estado</span>
              </v-tooltip>
              <v-btn-toggle light v-model="toggleActiveBtn">
                <v-btn flat color="success" @click="filterBy('activo')">Activos</v-btn>
                <v-btn flat color="info" @click="filterBy('sobreviviente')">Sobrevivientes</v-btn>
                <v-btn flat color="error" @click="filterBy('cesante')">Cesantes</v-btn>
              </v-btn-toggle>
            </span>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="personas"
          :search="search"
          :loading="loadingData"
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.codigo_modular }}</td>
            <td>{{ props.item.apellido_paterno }} {{ props.item.apellido_materno }}, {{ props.item.nombre }}</td>
            <td class="text-xs-center">{{ props.item.dni }}</td>
            <td class="text-xs-center">{{ props.item.cargo }}</td>
            <td class="text-xs-center">
              <EstadoChip :estado="props.item.estado" />
            </td>
            <td>
              <v-tooltip bottom v-if="$auth.can('personas.edit') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.can('personas.destroy') || $auth.isAdmin()">
                <v-btn color="error" fab small slot="activator" @click="deleteData(props.item)">
                  <v-icon>$vuetify.icons.delete</v-icon>
                </v-btn>
                <span>Eliminar registro</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
      </v-flex>
    </v-layout>
    <modal-agregar ref="agregarPersona"></modal-agregar>
    <modal-editar ref="editarPersona"></modal-editar>
    <!-- <modal-editar v-model="showModalEdit"></modal-editar> -->
  </v-container>
</template>

<script>
import ModalAgregar from "../../components/personas/ModalAgregar";
import ModalEditar from "../../components/personas/ModalEditar";
import EstadoChip from "../../components/personas/EstadoChip";
export default {
  components: { ModalAgregar, ModalEditar, EstadoChip },
  data() {
    return {
      search: "",
      estado: "activo",
      toggleActiveBtn: 0,
      loading: false,
      loadingData: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, { text: "Todos", value: -1 }],
      selected: [],
      headers: [
        {
          text: "Codigo Modular",
          align: "left",
          sortable: false,
          value: "codigo_modular"
        },
        {
          text: "Nombre completo",
          value: "apellido_paterno"
        },
        { text: "DNI", value: "dni" },
        { text: "Cargo", value: "cargo" },
        { text: "Estado", value: "estado" }
      ],
      personas: [],
      showModalEdit: false
    };
  },
  created() {
    if (this.$auth.can("personas.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Personas";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.agregarPersona = this.$refs.agregarPersona;
    this.$root.editarPersona = this.$refs.editarPersona;
  },
  methods: {
    getData(url = "/personas") {
      this.loadingData = true;
      axios
        .get(url, { params: { estado: this.estado } })
        .then(res => {
          this.loadingData = false;
          this.personas = res.data.personas;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    filterBy(prop) {
      this.estado = prop;
      this.getData();
    },
    modalAgregar() {
      this.$root.agregarPersona.show();
    },
    modalEditar(persona) {
      this.$root.editarPersona.show();
      this.$root.editarPersona.form.id = persona.id;
      this.$root.editarPersona.form.nombre = persona.nombre;
      this.$root.editarPersona.form.apellido_paterno = persona.apellido_paterno;
      this.$root.editarPersona.form.apellido_materno = persona.apellido_materno;
      this.$root.editarPersona.form.dni = persona.dni;
      this.$root.editarPersona.form.codigo_modular = persona.codigo_modular;
      this.$root.editarPersona.form.cargo = persona.cargo;
      this.$root.editarPersona.form.estado = persona.estado;
    },
    deleteData(persona) {
      this.$swal({
        title: "¿Está seguro de eliminar el registro?",
        text: "Esta operación va a eliminar el registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/personas/${persona.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "La persona se eliminó correctamente",
                "success"
              );
              this.getData();
            })
            .catch(err => {
              console.log(err);
              if (err.response.status == 403) {
                this.$router.push("/403");
              }
            });
        }
      });
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
