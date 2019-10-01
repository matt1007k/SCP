<script>
import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Pie,
  props: { title: String },
  mixins: [reactiveProp],
  data() {
    return {
      //Chart.js options that controls the appearance of the chart
      options: {
        title: {
          display: true,
          text: this.title
        },
        legend: {
          display: true
        },
        plugins: {
          labels: {
            render: function(args) {
              return "$" + args.value;
            },
            arc: true
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

