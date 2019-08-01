<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm9 md9>
                <span class="headline">Lista de usuarios</span>
              </v-flex>
              <v-flex
                xs12
                sm3
                md3
                justify-end
                flexbox
                v-if="$auth.can('users.create') || $auth.isAdmin()"
              >
                <v-btn color="primary" @click.stop="modalAgregar">
                  <v-icon>$vuetify.icons.add</v-icon>Agregar usuario
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
          :items="usuarios"
          :search="search"
          :loading="loadingData"
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <v-progress-linear v-slot:progress color="error" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.dni }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <template v-if="props.item.roles.length > 0">
              <td>
                <v-chip
                  v-for="(rol, index) in props.item.roles"
                  :key="index"
                  text-color="white"
                  color="info"
                  class="text-capitalize"
                  small
                >{{ rol.name }}</v-chip>
              </td>
            </template>
            <template v-else>
              <td class="text-xs-center">N/A</td>
            </template>
            <template v-if="props.item.estado === 'activo'">
              <td>
                <v-chip
                  text-color="white"
                  color="success"
                  class="text-capitalize"
                  small
                >{{ props.item.estado }}</v-chip>
              </td>
            </template>
            <template v-if="props.item.estado === 'inactivo'">
              <td>
                <v-chip
                  text-color="white"
                  color="error"
                  class="text-capitalize"
                  small
                >{{ props.item.estado }}</v-chip>
              </td>
            </template>
            <td>
              <v-tooltip bottom v-if="$auth.can('users.edit') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.can('users.destroy') || $auth.isAdmin()">
                <v-btn color="error" fab small slot="activator" @click="deleteData(props.item)">
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
    <modal-agregar ref="agregarUsuario"></modal-agregar>
    <modal-editar ref="editarUsuario"></modal-editar>
  </v-container>
</template>

<script>
import ModalAgregar from "../../components/usuarios/ModalAgregar";
import ModalEditar from "../../components/usuarios/ModalEditar";
import Vue from "vue";
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
          text: "DNI",
          align: "left",
          sortable: false,
          value: "dni"
        },
        {
          text: "Nombre completo",
          value: "name"
        },
        { text: "Correo Electrónico", value: "email" },
        { text: "Roles", value: "roles.name" },
        { text: "Estado", value: "estado" }
      ],
      usuarios: []
    };
  },
  created() {
    if (this.$auth.can("users.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Usuarios";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.agregarUsuario = this.$refs.agregarUsuario;
    this.$root.editarUsuario = this.$refs.editarUsuario;
  },
  methods: {
    getData(url = "/usuarios") {
      this.loadingData = true;
      axios
        .get(url)
        .then(res => {
          this.usuarios = res.data.usuarios;
          this.loadingData = false;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    modalAgregar() {
      this.$root.agregarUsuario.show();
    },
    modalEditar(persona) {
      this.$root.editarUsuario.show();
      this.$root.editarUsuario.form.id = persona.id;
      this.$root.editarUsuario.form.dni = persona.dni;
      this.$root.editarUsuario.form.name = persona.name;
      this.$root.editarUsuario.form.email = persona.email;
      this.$root.editarUsuario.form.roles = persona.roles;
      this.$root.editarUsuario.form.permissions = persona.permissions;
      this.$root.editarUsuario.form.estado = persona.estado;
    },
    deleteData(usuario) {
      this.$swal({
        title: "¿Está seguro de cambiar el estado?",
        text: "Esta operación va a cambiar el estado del registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, cambiar"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/usuarios/${usuario.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "Estado cambiado correctamente",
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
