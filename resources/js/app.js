require("./bootstrap");

import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/sweetalert2";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";

const app = new Vue({
    render: h => h(App),
    router
}).$mount("#app");
