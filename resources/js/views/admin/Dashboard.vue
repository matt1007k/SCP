<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 v-if="$auth.can('admin.index') || $auth.isAdmin()">
        <span class="headline">Tablero de resumenes</span>
      </v-flex>
      <v-flex xs12 v-else>
        <v-alert :value="true" type="info">
          <span
            class="headline"
          >Usted no tiene ningún permiso, comuníquese con el administrador del sistema.</span>
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2" v-if="$auth.can('admin.index') || $auth.isAdmin()">
      <v-flex xs12 sm4 md3 v-for="(item, index) in count_items" :key="index">
        <count-item :color="item.color" :icon="item.icon" :label="item.label" :total="item.total"></count-item>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="$auth.can('admin.index') || $auth.isAdmin()">
      <template v-if="$auth.isAdmin()">
        <v-flex xs12>
          <v-card>
            <v-list>
              <v-subheader>
                <h2>Cantidad de constancias de pago entregadas por usuario</h2>
              </v-subheader>
              <v-list-tile v-for="user in dataConstanciasByUsers" :key="user.dni">
                <v-list-tile-content>
                  <v-list-tile-title>{{ user.nombre }}</v-list-tile-title>
                  <v-list-tile-sub-title>DNI: {{ user.dni }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                <div>
                  <v-chip color="info" text-color="white">
                    <h3>Por años: {{user.total_anios}}</h3>
                    <v-icon right>$vuetify.icons.file</v-icon>
                  </v-chip>
                  <v-chip color="error" text-color="white">
                    <h3>Por año: {{user.total_anio}}</h3>
                    <v-icon right>$vuetify.icons.file</v-icon>
                  </v-chip>
                  <v-chip color="indigo" text-color="white">
                    <h3>Por mes: {{user.total_mes}}</h3>
                    <v-icon right>$vuetify.icons.file</v-icon>
                  </v-chip>
                </div>
                <!-- <v-list-tile-action></v-list-tile-action> -->
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>

      <v-flex xs12>
        <v-card>
          <v-card-title class="no-padding-bottom">
            <v-layout row align-center>
              <v-flex xs1>
                <v-tooltip bottom>
                  <v-icon slot="activator">$vuetify.icons.filter</v-icon>
                  <span>Filtar o ver los total de pagos por año y estado de personas</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs12 sm4 class="text-center">
                <v-select
                  :items="items"
                  v-model="anio"
                  item-text="anio"
                  item-value="anio"
                  @input="filterByYear()"
                  label="Seleccionar el año"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text class="no-padding-top">
            <bar-chart :chart-data="dataPagos"></bar-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <pie-chart :chart-data="dataPersonas" title="Cantidad de personas por estado"></pie-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <pie-chart
              :chart-data="dataConstancias"
              title="Cantidad de constancias por tipo de reporte"
            ></pie-chart>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CountItem from "../../components/dashboard/CountItem";
import BarChart from "../../components/dashboard/chart/BarChart";
import PieChart from "../../components/dashboard/chart/PieChart";
export default {
  components: { CountItem, BarChart, PieChart },
  data: () => ({
    count_items: [],
    dataConstanciasByUsers: [],
    dataPagos: {},
    dataPersonas: {},
    dataConstancias: {},
    anio: String(new Date().getFullYear()),
    items: []
  }),
  created() {
    document.title = "Tablero de Resumenes";
    this.getCount();
    this.getTotalPagos();
    this.getTotalPersonas();
    this.getTotalConstancias();
    this.getTotalConstanciasByUsers();
    this.getYears();
  },
  mounted() {
    this.getTotalPagos();
  },
  methods: {
    getYears() {
      axios
        .get("/periodos")
        .then(res => (this.items = res.data.years))
        .catch(err => console.log(err));
    },
    getCount() {
      axios
        .get("/getCount")
        .then(res => (this.count_items = res.data.totales))
        .catch(err => console.log(err));
    },
    async getTotalPagos() {
      try {
        let res = await axios.get("/getTotalPagos", {
          params: {
            anio: this.anio
          }
        });
        this.dataPagos = {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Deciembre"
          ],
          datasets: res.data.total_pagos
        };
      } catch (error) {
        console.log(error);
      }
    },
    getTotalPersonas() {
      axios
        .get("/getTotalPersonas")
        .then(res => {
          this.dataPersonas = {
            labels: ["Activos", "Cesantes", "Sobrevivientes"],
            datasets: res.data.total_personas
          };
        })
        .catch(err => console.log(err));
    },
    getTotalConstancias() {
      axios
        .get("/getTotalConstancias")
        .then(res => {
          this.dataConstancias = {
            labels: ["Por rango de años", "Por año", "Por mes"],
            datasets: res.data.total_constancias
          };
        })
        .catch(err => console.log(err));
    },
    getTotalConstanciasByUsers() {
      axios
        .get("/getTotalConstanciasByUsers")
        .then(res => {
          this.dataConstanciasByUsers = res.data.totales;
        })
        .catch(err => console.log(err));
    },
    filterBy(estado) {
      this.estado = estado;
      this.getTotalPagos();
    },
    filterByYear() {
      this.getTotalPagos();
    }
  }
};
</script>
<style>
.v-card__title.no-padding-bottom {
  padding-bottom: 0;
}
.v-card__text.no-padding-top {
  padding-top: 0;
}
</style>
