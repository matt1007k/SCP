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
                beginAtZero: true,
                callback: function(label, index, labels) {
                  return (
                    "S/. " +
                    label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    ".00"
                  );
                }
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
        tooltips: {
          mode: "label",
          label: "mylabel",
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                "S/. " +
                tooltipItem.yLabel
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            }
          }
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

