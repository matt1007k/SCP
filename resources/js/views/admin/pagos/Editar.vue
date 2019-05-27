<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm9 md9>
                <span class="headline">Editar pagos</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid style="padding-bottom: 0; padding-top: 0">
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
      <v-flex xs12>dd</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    document.title = "Registrar un Pago";
  },
  methods: {
    modalAgregar() {},
    modalEditar(persona) {},
    deleteData(pago) {
      this.$swal({
        title: "Esta seguro de eliminar el registro?",
        text: "Esta operación va ha cambiar el estado del registro",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, eliminar"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/pagos/${pago.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "Rol eliminado correctamente",
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
