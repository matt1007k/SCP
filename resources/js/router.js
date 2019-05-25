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
                    path: "usuarios",
                    name: "usuarios",
                    meta: { titulo: "Usuarios" },
                    component: () => import("./views/admin/Usuarios.vue")
                },
                {
                    path: "roles",
                    name: "roles",
                    meta: { titulo: "Roles" },
                    component: () => import("./views/admin/Roles.vue")
                },
                {
                    path: "permisos",
                    name: "permisos",
                    meta: { titulo: "Permisos" },
                    component: () => import("./views/admin/Permisos.vue")
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
                    path: "pagos",
                    name: "pagos",
                    meta: { titulo: "Pagos" },
                    component: () => import("./views/admin/Pagos.vue")
                },
                {
                    path: "importar/haberes-descuentos",
                    name: "importar.descuentos",
                    component: () =>
                        import("./views/admin/importar/ImportarDescuentos.vue")
                },
                {
                    path: "importar/personas-pagos",
                    name: "importar.personas",
                    component: () =>
                        import("./views/admin/importar/ImportarPersonas.vue")
                },
                {
                    path: "403",
                    component: () => import("./views/errors/Unauthorize.vue")
                },
                {
                    path: "**",
                    component: () => import("./views/errors/NotFoundPage.vue")
                }
            ]
        }
    ]
});
