<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12 sm8 md9>
                <span class="headline">Lista de Haberes</span>
              </v-flex>
              <v-flex
                xs12
                sm4
                md3
                justify-end
                flexbox
                v-if="$auth.can('haberes.create') || $auth.isAdmin()"
              >
                <v-btn color="primary" @click="modalAgregar">
                  <v-icon>$vuetify.icons.add</v-icon>Agregar haber
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
                <span>Filtar por si es afectado por un impuesto o tributo</span>
              </v-tooltip>
              <v-btn flat @click="filterBy('Todos')">Todos</v-btn>
              <v-btn flat color="success" @click="filterBy('1')">Asegurables</v-btn>
              <v-btn flat color="info" @click="filterBy('0')">No Asegurables</v-btn>
            </span>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="haberes"
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
                color="info"
                class="text-capitalize"
                small
              >{{ props.item.tipo }}</v-chip>
            </td>
            <td class="text-xs-center">{{ props.item.descripcion }}</td>
            <td class="text-xs-center">{{props.item.descripcion_simple}}</td>
            <td class="text-xs-center">
              <template v-if="props.item.es_imponible == '1'">
                <v-chip text-color="white" color="success" class="text-capitalize" small>Si</v-chip>
              </template>
              <template v-if="props.item.es_imponible == '0'">
                <v-chip text-color="white" color="info" class="text-capitalize" small>No</v-chip>
              </template>
            </td>
            <td>
              <v-tooltip bottom v-if="$auth.can('haberes.edit') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.can('haberes.destroy') || $auth.isAdmin()">
                <v-btn color="error" fab small slot="activator" @click="deleteData(props.item)">
                  <v-icon>$vuetify.icons.delete</v-icon>
                </v-btn>
                <span>Cambiar asegurable</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <!-- <v-pagination v-model="pagination.page" :length="pages"></v-pagination> -->
        </div>
      </v-flex>
    </v-layout>
    <modal-agregar ref="agregarHaber"></modal-agregar>
    <modal-editar ref="editarHaber"></modal-editar>
  </v-container>
</template>

<script>
import ModalAgregar from "../../components/haberes/ModalAgregar";
import ModalEditar from "../../components/haberes/ModalEditar";
export default {
  components: { ModalAgregar, ModalEditar },
  data() {
    return {
      imponible: "Todos",
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
        { text: "Descripcion simple", value: "descripcion_simple" },
        { text: "Asegurable", value: "es_imponible", sortable: false }
      ],
      haberes: []
    };
  },
  created() {
    if (this.$auth.can("haberes.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Haberes";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.agregarHaber = this.$refs.agregarHaber;
    this.$root.editarHaber = this.$refs.editarHaber;
  },
  methods: {
    getData(url = "/haberes") {
      this.loadingData = true;
      axios
        .get(url, { params: { imponible: this.imponible } })
        .then(res => {
          this.loadingData = false;
          this.haberes = res.data.haberes;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    filterBy(prop) {
      this.imponible = prop;
      this.getData();
    },
    modalAgregar() {
      this.$root.agregarHaber.show();
    },
    modalEditar(persona) {
      this.$root.editarHaber.show();
      this.$root.editarHaber.form.id = persona.id;
      this.$root.editarHaber.form.codigo = persona.codigo;
      this.$root.editarHaber.form.nombre = persona.nombre;
      this.$root.editarHaber.form.tipo = persona.tipo;
      this.$root.editarHaber.form.descripcion = persona.descripcion;
      this.$root.editarHaber.form.descripcion_simple =
        persona.descripcion_simple;
      this.$root.editarHaber.form.es_imponible = String(persona.es_imponible);
    },
    deleteData(haber) {
      this.$swal({
        title: "¿Está seguro de cambiar el estado del registro?",
        text: "Esta operación va a cambiar a ser asegurable o no el haber",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, cambiar"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/haberes/${haber.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "Se cambio el estado correctamente",
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