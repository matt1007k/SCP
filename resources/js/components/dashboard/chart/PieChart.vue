<script>
import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Pie,
  // props: { datasets: Array },
  mixins: [reactiveProp],
  data() {
    return {
      //Chart.js options that controls the appearance of the chart
      options: {
        title: {
          display: true,
          text: "Cantidad de personas por estado"
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style>
</style>