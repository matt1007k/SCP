<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <span class="headline">Tablero de resumenes</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm4 md3 v-for="(item, index) in count_items" :key="index">
        <count-item :color="item.color" :icon="item.icon" :label="item.label" :total="item.total"></count-item>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
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
            <pie-chart :chart-data="dataPersonas"></pie-chart>
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
    dataPagos: {},
    dataPersonas: {},
    anio: String(new Date().getFullYear()),
    estado: "activo",
    items: []
  }),
  created() {
    document.title = "Tablero de Resumenes";
    this.getCount();
    this.getTotalPagos();
    this.getTotalPersonas();
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
            anio: this.anio,
            estado: this.estado
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
