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
              <v-flex xs12 sm3 md3 justify-end flexbox>
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
            <span class="mb-2">
              <v-tooltip bottom>
                <v-icon slot="activator">$vuetify.icons.filter</v-icon>
                <span>Filtar por estado</span>
              </v-tooltip>
              <v-btn flat @click="filterBy('Todos')">Todos</v-btn>
              <v-btn flat color="success" @click="filterBy('activo')">Activos</v-btn>
              <v-btn flat color="error" @click="filterBy('inactivo')">Inactivos</v-btn>
            </span>
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
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.dni }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <template v-if="props.item.roles.length > 0">
              <td v-for="(rol, index) in props.item.roles" :key="index">
                <v-chip text-color="white" color="info" class="text-capitalize" small>{{ rol.name }}</v-chip>
              </td>
            </template>
            <template v-else>
              <td class="text-xs-center">N/A</td>
            </template>

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
    <modal-agregar ref="agregarUsuario"></modal-agregar>
    <modal-editar ref="editarUsuario"></modal-editar>
    <!-- <modal-editar v-model="showModalEdit"></modal-editar> -->
  </v-container>
</template>

<script>
import ModalAgregar from "../../components/usuarios/ModalAgregar";
import ModalEditar from "../../components/usuarios/ModalEditar";
export default {
  components: { ModalAgregar, ModalEditar },
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
        { text: "Roles", value: "roles.name" }
      ],
      usuarios: []
    };
  },
  created() {
    document.title = "Lista de Usuarios";
    this.getData();
  },
  mounted() {
    this.$root.agregarUsuario = this.$refs.agregarUsuario;
    this.$root.editarUsuario = this.$refs.editarUsuario;
  },
  methods: {
    getData(url = "/usuarios") {
      axios
        .get(url, { params: { tipo: this.tipo } })
        .then(res => {
          this.usuarios = res.data.usuarios;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    filterBy(prop) {
      this.tipo = prop;
      // this.getData();
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
      // this.$root.editarUsuario.form.estado = persona.estado;
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
