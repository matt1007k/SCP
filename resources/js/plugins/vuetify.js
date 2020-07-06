import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import mdi_icons from "./mdi-icons";

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: {
            light: {
                primary: "#01579B",
                secondary: "#ee44aa",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107"
            }
        }
    },
    icons: {
        iconfont: "mdi",
        values: mdi_icons
    }
};

export default new Vuetify(opts);
