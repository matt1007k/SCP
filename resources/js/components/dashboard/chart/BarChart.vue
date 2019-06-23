<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Bar,
  // props: { datasets: Array },
  mixins: [reactiveProp],
  data() {
    return {
      // datacollection: {
      //   //Data to be represented on x-axis
      //   labels: [
      //     "Enero",
      //     "Febrero",
      //     "Marzo",
      //     "Abril",
      //     "Mayo",
      //     "Junio",
      //     "Julio",
      //     "Agosto",
      //     "Septiembre",
      //     "Octubre",
      //     "Noviembre",
      //     "Deciembre"
      //   ],
      //   datasets: this.datasets
      // },
      //Chart.js options that controls the appearance of the chart
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
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