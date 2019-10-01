require("./bootstrap");

import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/sweetalert2";
// import "./plugins/socket-io";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";
import Auth from "./helpers/auth";

Vue.prototype.$auth = new Auth(window.user);

const app = new Vue({
    render: h => h(App),
    router
}).$mount("#app");
