<template>
  <div class="container">
    <bar-chart :datasets="datos"></bar-chart>
  </div>
</template>

<script>
import BarChart from "./chart/BarChart";
export default {
  components: { BarChart },
  props: {
    datos: Array
  }
};
</script>