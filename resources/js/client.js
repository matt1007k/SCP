require("./bootstrap");

import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/sweetalert2";
import "@mdi/font/css/materialdesignicons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";
import Auth from "./helpers/auth";

Vue.prototype.$auth = new Auth(window.user);

Vue.component(
    "consulta-cliente",
    require("./components/cliente/Consulta.vue").default
);

const vue = new Vue({
    el: "#app"
});
