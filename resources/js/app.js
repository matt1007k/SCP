require("./bootstrap");

import Vue from "vue";
import Vuetify from "./plugins/vuetify";
import "./plugins/sweetalert2";
// import "./plugins/socket-io";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";
import Auth from "./helpers/auth";

import "./mixins/pagination";

import "./plugins/global-components";

Vue.prototype.$auth = new Auth(window.user);

new Vue({
    vuetify: Vuetify,
    render: h => h(App),
    router
}).$mount("#app");
