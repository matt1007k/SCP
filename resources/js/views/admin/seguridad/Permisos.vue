<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm9 md9>
                <span class="headline">Lista de permisos</span>
              </v-flex>
              <v-flex
                xs12
                sm3
                md3
                justify-end
                flexbox
                v-if="$auth.can('permisos.create') || $auth.isAdmin()"
              >
                <v-btn color="primary" @click.stop="modalAgregar">
                  <v-icon>$vuetify.icons.add</v-icon>Agregar permiso
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
          :items="permisos"
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
            <td class="text-xs-center">{{ props.item.slug }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.description }}</td>
            <td>
              <v-tooltip bottom v-if="$auth.can('permisos.edit') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.can('permisos.destroy') || $auth.isAdmin()">
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
    <modal-agregar ref="agregarPermiso"></modal-agregar>
    <modal-editar ref="editarPermiso"></modal-editar>
  </v-container>
</template>

<script>
import ModalAgregar from "../../../components/permisos/ModalAgregar";
import ModalEditar from "../../../components/permisos/ModalEditar";
export default {
  components: { ModalAgregar, ModalEditar },
  data() {
    return {
      search: "",
      loading: false,
      loadingData: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, { text: "Todos", value: -1 }],
      selected: [],
      headers: [
        {
          text: "Identificador",
          align: "left",
          sortable: false,
          value: "slug"
        },
        {
          text: "Nombre del rol",
          value: "name"
        },
        { text: "Descripción", value: "description" }
      ],
      permisos: []
    };
  },
  created() {
    if (this.$auth.can("permisos.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Permisos";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.agregarPermiso = this.$refs.agregarPermiso;
    this.$root.editarPermiso = this.$refs.editarPermiso;
  },
  methods: {
    getData(url = "/permisos") {
      this.loadingData = true;
      axios
        .get(url)
        .then(res => {
          this.loadingData = false;
          this.permisos = res.data.permissions;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    modalAgregar() {
      this.$root.agregarPermiso.show();
    },
    modalEditar(permiso) {
      this.$root.editarPermiso.show();
      this.$root.editarPermiso.form.id = permiso.id;
      this.$root.editarPermiso.form.identificador = permiso.slug;
      this.$root.editarPermiso.form.nombre = permiso.name;
      this.$root.editarPermiso.form.descripcion = permiso.description;
    },
    deleteData(permiso) {
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
            .delete(`/permisos/${permiso.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "El permiso se eliminó correctamente",
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
