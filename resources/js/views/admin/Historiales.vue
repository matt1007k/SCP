<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <span class="headline">Lista de Historial de Constancias</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-container fluid style="padding-bottom: 0; padding-top: 0">
            <v-text-field
              v-model="search"
              clearable
              label="Buscar"
              type="text"
              placeholder="Buscar por número de certificado..."
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
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="historiales"
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
            <td class="text-xs-center">{{props.item.certificado}}</td>
            <td class="text-xs-center">{{ props.item.anio }}</td>
            <td class="text-xs-center">{{props.item.meses}}</td>
            <td class="text-xs-center">{{props.item.dni}}</td>
            <td class="text-xs-center">{{props.item.dni_user}}</td>
            <td class="text-xs-center">{{ formatDateTime(props.item.created_at)}}</td>
            <template v-if="$auth.isAdmin()">
              <td class="text-xs-center">
                <EstadoChip :estado="props.item.estado" />
              </td>
            </template>
            <td>
              <v-tooltip bottom v-if="$auth.can('pagos.consultar') || $auth.isAdmin()">
                <v-btn color="info" fab small slot="activator" @click="viewPDF(props.item)">
                  <v-icon>$vuetify.icons.file</v-icon>
                </v-btn>
                <span>Ver constancia</span>
              </v-tooltip>
              <v-tooltip
                bottom
                v-if="$auth.user.user.dni == props.item.dni_user && props.item.estado === 'creado'"
              >
                <v-btn color="error" fab small slot="activator" @click="deleteData(props.item)">
                  <v-icon>$vuetify.icons.delete</v-icon>
                </v-btn>
                <span>Eliminar historial</span>
              </v-tooltip>
              <v-tooltip bottom v-if="$auth.user.user.dni == props.item.dni_user">
                <v-btn
                  color="primary"
                  fab
                  small
                  slot="activator"
                  @click="certificadoEdit(props.item)"
                >
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
                <span>Editar certificado</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <!-- <v-pagination v-model="pagination.page" :length="pages"></v-pagination> -->
        </div>
      </v-flex>
    </v-layout>
    <modal-editar ref="editarCertificado"></modal-editar>
  </v-container>
</template>

<script>
import EstadoChip from "../../components/historiales/EstadoChip";
import ModalEditar from "../../components/historiales/ModalEditar";
import moment from "moment";
export default {
  components: { EstadoChip, ModalEditar },
  data() {
    return {
      search: "",
      loading: false,
      loadingData: false,
      pagination: {},
      RowsPerPageItems: [9, 15, 25, { text: "Todos", value: -1 }],
      selected: [],
      headers: [
        { text: "N°. Certificado", value: "certificado", sortable: true },
        {
          text: "Año",
          align: "left",
          sortable: true,
          value: "anio"
        },
        { text: "El Mes o Meses", value: "meses" },
        { text: "DNI de la persona", value: "dni" },
        { text: "DNI del responsable", value: "dni_user" },
        { text: "Fecha de entrega", value: "created_at", sortable: true }
      ],
      historiales: []
    };
  },
  created() {
    if (this.$auth.can("historiales.index") || this.$auth.isAdmin()) {
      document.title = "Lista de constancias";
      this.getData();
    } else {
      this.$router.push("/admin/403");
    }
  },
  mounted() {
    this.$root.editarCertificado = this.$refs.editarCertificado;
  },
  methods: {
    getData(url = "/historiales") {
      this.loadingData = true;
      axios
        .get(url)
        .then(res => {
          this.loadingData = false;
          this.historiales = res.data.historiales;
        })
        .catch(err => {
          console.log(err);
          if (err.response.status == 403) {
            this.$router.push("/admin/403");
          }
        });
    },
    formatDateTime(datetime) {
      return moment(datetime)
        .locale("es")
        .format("llll a");
    },
    deleteData(historial) {
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
            .delete(`/historiales/${historial.id}`)
            .then(res => {
              this.$swal(
                "Mensaje de operación",
                "El historial se eliminó correctamente",
                "success"
              );
              this.getData();
            })
            .catch(err => {
              if (err.response.status == 403) {
                this.$router.push("/403");
              }
            });
        }
      });
    },
    certificadoEdit(historial) {
      this.$root.editarCertificado.show();
      this.$root.editarCertificado.form.id = historial.id;
      this.$root.editarCertificado.form.certificado = historial.certificado;
    },
    viewPDF(historial) {
      const anio = historial.anio;
      const meses = historial.meses;
      const persona_id = historial.persona_id;
      const certificado = historial.certificado;
      const tipo = historial.tipo;

      if (tipo == "rango") {
        var array_years = anio.split("-");
        var anio_anterior = array_years[0];
        var anio_actual = array_years[1];

        let params = {
          anio_anterior: anio_anterior,
          anio_actual: anio_actual,
          persona_id: persona_id,
          certificado: certificado,
          ver: 1
        };
        const params_code = window.btoa(JSON.stringify(params));
        window.open(`/reporte/por-anios/${params_code}`, "_blank");
      }
      if (tipo == "anio") {
        let params = {
          anio: anio,
          persona_id: persona_id,
          certificado: certificado,
          ver: 1
        };
        const params_code = window.btoa(JSON.stringify(params));
        window.open(`/reporte/por-anio/${params_code}`, "_blank");
      }
      if (tipo == "mes") {
        let params = {
          anio: anio,
          mes: meses,
          persona_id: persona_id,
          certificado: certificado,
          ver: 1
        };
        const params_code = window.btoa(JSON.stringify(params));
        window.open(`/reporte/por-mes/${params_code}`, "_blank");
      }
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