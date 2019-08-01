<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm8 md9>
                <span class="headline">Lista de Descuentos</span>
              </v-flex>
              <v-flex
                xs12
                sm4
                md3
                justify-end
                flexbox
                v-if="$auth.can('descuentos.create') || $auth.isAdmin()"
              >
                <v-btn color="primary" @click="modalAgregar">
                  <v-icon>$vuetify.icons.add</v-icon>Agregar descuento
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
          :loading="loadingData"
          :pagination.sync="pagination"
          :rows-per-page-items="RowsPerPageItems"
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.codigo }}</td>
            <td>{{ props.item.nombre }}</td>
            <td>
              <v-chip
                text-color="white"
                color="success"
                class="text-capitalize"
                small
              >{{ props.item.tipo }}</v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.descripcion }}</td>
            <td class="text-xs-center">{{props.item.descripcion_simple}}</td>
            <td>
              <v-tooltip bottom v-if="$auth.can('descuentos.edit') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.can('descuentos.destroy') || $auth.isAdmin()">
                <v-btn color="error" fab small slot="activator" @click="deleteData(props.item)">
                  <v-icon>$vuetify.icons.delete</v-icon>
                </v-btn>
                <span>Eliminar registro</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <!-- <v-pagination v-model="pagination.page" :length="pages"></v-pagination> -->
        </div>
      </v-flex>
    </v-layout>
    <modal-agregar ref="agregarDescuento"></modal-agregar>
    <modal-editar ref="editarDescuento"></modal-editar>
  </v-container>
</template>

<script>
import ModalAgregar from "../../components/descuentos/ModalAgregar";
import ModalEditar from "../../components/descuentos/ModalEditar";
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
          text: "Codigo",
          align: "left",
          sortable: true,
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
    if (this.$auth.can("descuentos.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Descuentos";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.agregarDescuento = this.$refs.agregarDescuento;
    this.$root.editarDescuento = this.$refs.editarDescuento;
  },
  methods: {
    getData(url = "/descuentos") {
      this.loadingData = true;
      axios
        .get(url)
        .then(res => {
          this.loadingData = false;
          this.descuentos = res.data.descuentos;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    modalAgregar() {
      this.$root.agregarDescuento.show();
    },
    modalEditar(descuento) {
      this.$root.editarDescuento.show();
      this.$root.editarDescuento.form.id = descuento.id;
      this.$root.editarDescuento.form.codigo = descuento.codigo;
      this.$root.editarDescuento.form.nombre = descuento.nombre;
      this.$root.editarDescuento.form.tipo = descuento.tipo;
      this.$root.editarDescuento.form.descripcion = descuento.descripcion;
      this.$root.editarDescuento.form.descripcion_simple =
        descuento.descripcion_simple;
    },
    deleteData(descuento) {
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
            .delete(`/descuentos/${descuento.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "El descuento se eliminó correctamente",
                "success"
              );
              this.getData();
            })
            .catch(err => {
              console.log(err);
              if (errors.response.status == 403) {
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
