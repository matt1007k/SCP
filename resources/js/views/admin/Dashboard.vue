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
      <v-flex xs12 sm8>
        <v-card>
          <v-card-title>Total de pagos</v-card-title>
          <v-card-text>
            <bar-chart :chart-data="dataPagos"></bar-chart>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm4>
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
    anio: new Date().getFullYear(),
    estado: "activo"
  }),
  created() {
    document.title = "Tablero de Resumenes";
    this.getCount();
    this.getTotalPagos();
    this.getTotalPersonas();
  },
  mounted() {
    this.getTotalPagos();
  },
  methods: {
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
    }
  }
};
</script>
