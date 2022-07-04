import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";
import mdi_icons from "./mdi-icons";

Vue.use(Vuetify);
const opts = {
    theme: {
        dark: false,
        themes: {
            light: {
                primary: colors.lightBlue.darken1,
                secondary: colors.grey.lighten2,
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107"
            },
            dark:{
                primary: colors.lightBlue.darken1
            },
        }
    },
    icons: {
        iconfont: "mdi",
        values: mdi_icons
    }
};

export default new Vuetify(opts);
