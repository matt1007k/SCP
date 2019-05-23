import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    // linkExactActiveClass: "active",
    routes: [
        {
            path: "/",
            redirect: "auth/login"
        },
        {
            path: "/auth",
            component: () => import("./components/layout/LayoutClient.vue"),
            children: [
                {
                    path: "login",
                    component: () => import("./views/auth/Login.vue")
                }
            ]
        },
        {
            path: "/admin",
            component: () => import("./components/layout/LayoutAdmin.vue"),
            children: [
                {
                    path: "",
                    name: "admin",
                    component: () => import("./views/admin/Dashboard.vue")
                },
                {
                    path: "personas",
                    name: "personas",
                    meta: { titulo: "Personas" },
                    component: () => import("./views/admin/Personas.vue")
                },
                {
                    path: "haberes-descuentos",
                    name: "descuentos",
                    component: () => import("./views/admin/HaberDescuentos.vue")
                },
                {
                    path: "**",
                    component: () => import("./views/errors/NotFoundPage.vue")
                }
            ]
        }
    ]
});
