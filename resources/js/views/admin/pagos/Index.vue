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
              <v-flex xs12 sm3 md3 v-if="$auth.can('pagos.create') || $auth.isAdmin()">
                <v-spacer></v-spacer>
                <v-btn color="primary" router to="/admin/pagos/crear">
                  <v-icon>$vuetify.icons.add</v-icon>Realizar pago
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid style="padding-bottom: 0; padding-top: 0">
            <v-text-field
              v-model="search"
              clearable
              label="Buscar"
              type="text"
              placeholder="Buscar por DNI de la persona..."
            >
              <template v-slot:prepend>
                <v-icon>$vuetify.icons.search</v-icon>
              </template>
              <template v-slot:append>
                <v-fade-transition leave-absolute>
                  <v-progress-circular v-if="loading" size="24" color="info" indeterminate></v-progress-circular>
                </v-fade-transition>
              </template>
            </v-text-field>
            <v-layout row wrap class="mb-2" align-center>
              <v-flex xs1>
                <v-tooltip bottom>
                  <v-icon slot="activator">$vuetify.icons.filter</v-icon>
                  <span>Filtar por periodo</span>
                </v-tooltip>
                <!-- <v-btn flat @click="filterBy('Todos')">Todos</v-btn> -->
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="items_anio"
                  v-model="anio"
                  item-text="anio"
                  item-value="anio"
                  @input="filterByYear()"
                  label="Seleccionar el año"
                ></v-select>
              </v-flex>
              <v-flex xs4 class="ml-2">
                <v-select
                  v-model="mes"
                  :items="items_mes"
                  label="Seleccionar el mes"
                  @input="filterByMonth()"
                ></v-select>
              </v-flex>
            </v-layout>
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
          :loading="loadingData"
          rows-per-page-text="Mostrar"
          no-data-text="No hay pagos registrados"
          no-results-text="No hay registros encontrados"
          :pagination.sync="pagination"
          class="elevation-1"
          :rows-per-page-items="RowsPerPageItems"
        >
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.anio }}, {{ props.item.mes }}</td>
            <td>{{ props.item.persona.apellido_paterno }} {{ props.item.persona.apellido_materno }}, {{ props.item.persona.nombre }}</td>
            <td class="text-xs-center">{{ props.item.total_haber }}</td>
            <td class="text-xs-center">{{ props.item.total_descuento }}</td>
            <td class="text-xs-center">{{ props.item.monto_liquido }}</td>
            <td class="text-xs-center">{{ props.item.monto_imponible }}</td>
            <td>
              <v-tooltip bottom v-if="$auth.can('pagos.edit') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="modalEditar(props.item)">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar registro</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.can('pagos.destroy') || $auth.isAdmin()">
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
  </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
export default {
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
          text: "Periodo",
          align: "left",
          sortable: true,
          value: "anio"
        },
        {
          text: "Nombre persona",
          value: "persona.dni"
        },
        { text: "Total Haber", value: "total_haber" },
        { text: "Total Descuento", value: "total_descuento" },
        { text: "Monto Liquido", value: "monto_liquido" },
        { text: "Monto Imponible", value: "monto_Total" }
      ],
      pagos: [],
      items_anio: [],
      items_mes: months,
      anio: "",
      mes: ""
    };
  },
  created() {
    if (this.$auth.can("pagos.index") || this.$auth.isAdmin()) {
      document.title = "Lista de Pagos";
      var date_now = new Date();
      this.anio = String(date_now.getFullYear());
      this.mes = date_now
        .getMonth()
        .toString()
        .padStart(2, "0");
      this.getData();
      this.getYears();
    } else {
      this.$router.push("/admin/403");
    }
  },
  methods: {
    getData(url = "/pagos") {
      this.loadingData = true;
      axios
        .get(url, {
          params: { anio: this.anio, mes: this.mes }
        })
        .then(res => {
          this.loadingData = false;
          this.pagos = res.data.pagos;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    filterByYear() {
      this.mes = "01";
      this.getData();
    },
    filterByMonth() {
      this.getData();
    },
    getYears() {
      axios
        .get("/periodos")
        .then(res => (this.items_anio = res.data.years))
        .catch(err => console.log(err));
    },
    modalEditar(pago) {
      this.$router.push("/admin/pagos/editar/" + pago.id);
    },
    deleteData(pago) {
      this.$swal({
        title: "¿Está seguro de eliminar el registro?",
        text: "Esta operación va a eliminar el registro.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, eliminar"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/pagos/${pago.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "El pago se eliminó correctamente",
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
