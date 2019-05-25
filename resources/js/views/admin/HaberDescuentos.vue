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
                <v-btn color="primary" @click="modalAgregar">
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
            <span class="mb-2">
              <v-tooltip bottom>
                <v-icon slot="activator">$vuetify.icons.filter</v-icon>
                <span>Filtar por tipo</span>
              </v-tooltip>
              <v-btn flat @click="filterBy('Todos')">Todos</v-btn>
              <v-btn flat color="success" @click="filterBy('haber')">Haberes</v-btn>
              <v-btn flat color="info" @click="filterBy('descuento')">Descuentos</v-btn>
            </span>
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
          rows-per-page-text="Mostrar"
          no-data-text="No hay registros"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.codigo }}</td>
            <td>{{ props.item.nombre }}</td>
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
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom>
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
      tipo: "Todos",
      search: "",
      loading: false,
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
    document.title = "Lista de Haberes y Descuentos";
    this.getData();
  },
  mounted() {
    this.$root.agregarDescuento = this.$refs.agregarDescuento;
    this.$root.editarDescuento = this.$refs.editarDescuento;
  },
  methods: {
    getData(url = "/descuentos") {
      axios
        .get(url, { params: { tipo: this.tipo } })
        .then(res => {
          this.descuentos = res.data.descuentos;
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
      this.getData();
    },
    modalAgregar() {
      this.$root.agregarDescuento.show();
    },
    modalEditar(persona) {
      this.$root.editarDescuento.show();
      this.$root.editarDescuento.form.id = persona.id;
      this.$root.editarDescuento.form.codigo = persona.codigo;
      this.$root.editarDescuento.form.nombre = persona.nombre;
      this.$root.editarDescuento.form.tipo = persona.tipo;
      this.$root.editarDescuento.form.descripcion = persona.descripcion;
      this.$root.editarDescuento.form.descripcion_simple =
        persona.descripcion_simple;
    },
    deleteData(descuento) {
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
            .delete(`/descuentos/${descuento.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "Elimino correctamente",
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

<style>
</style>
