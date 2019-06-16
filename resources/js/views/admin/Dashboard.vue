<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <span class="headline">Tablero de resumenes</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="(item, index) in count_items" :key="index">
        <count-item :color="item.color" :icon="item.icon" :label="item.label" :total="item.total"></count-item>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CountItem from "../../components/dashboard/CountItem";
export default {
  components: { CountItem },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
  created() {
    document.title = "Tablero de Resumenes";
  },
  data: () => ({
    count_items: [
      {
        label: "Total de pagos",
        color: "error",
        icon: "mdi mdi-credit-card",
        total: 3500
      },
      {
        label: "Total de personas",
        color: "indigo",
        icon: "mdi mdi-account-group",
        total: 1200
      },
      {
        label: "Total de haberes",
        color: "info",
        icon: "mdi mdi-cash-usd",
        total: 230
      },
      {
        label: "Total de descuentos",
        color: "success",
        icon: "mdi mdi-sale",
        total: 300
      }
    ]
  })
};
</script>

<style>
</style>
