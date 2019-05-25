/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/sweetalert2";
import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";

const app = new Vue({
    el: "#app",
    render: h => h(App),
    router
});
