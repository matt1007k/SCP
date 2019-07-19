import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const ParentComponent = {
    template: `<router-view :key='$route.fullPath'></router-view>`
};

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
                    path: "perfil",
                    name: "perfil",
                    meta: { titulo: "Perfil" },
                    component: () => import("./views/admin/Perfil.vue")
                },
                {
                    path: "usuarios",
                    name: "usuarios",
                    meta: { titulo: "Usuarios" },
                    component: () => import("./views/admin/Usuarios.vue")
                },
                {
                    path: "personas",
                    name: "personas",
                    meta: { titulo: "Personas" },
                    component: () => import("./views/admin/Personas.vue")
                },
                {
                    path: "descuentos",
                    name: "descuentos",
                    component: () => import("./views/admin/Descuentos.vue")
                },
                {
                    path: "haberes",
                    name: "haberes",
                    component: () => import("./views/admin/Haberes.vue")
                },
                {
                    path: "historiales",
                    name: "historiales",
                    component: () => import("./views/admin/Historiales.vue")
                },
                {
                    path: "pagos",
                    name: "pagos",
                    meta: { titulo: "Pagos" },
                    component: ParentComponent,
                    children: [
                        {
                            path: "lista",
                            component: () =>
                                import("./views/admin/pagos/Index.vue")
                        },
                        {
                            path: "crear",
                            component: () =>
                                import("./views/admin/pagos/Crear.vue")
                        },
                        {
                            path: "editar/:id",
                            component: () =>
                                import("./views/admin/pagos/Editar.vue")
                        }
                    ]
                },
                {
                    path: "seguridad",
                    component: ParentComponent,
                    children: [
                        {
                            path: "roles",
                            name: "roles",
                            meta: { titulo: "Roles" },
                            component: () =>
                                import("./views/admin/seguridad/Roles.vue")
                        },
                        {
                            path: "permisos",
                            name: "permisos",
                            meta: { titulo: "Permisos" },
                            component: () =>
                                import("./views/admin/seguridad/Permisos.vue")
                        }
                    ]
                },
                {
                    path: "importar",
                    component: ParentComponent,
                    children: [
                        {
                            path: "haberes-descuentos",
                            name: "importar.descuentos",
                            component: () =>
                                import(
                                    "./views/admin/importar/ImportarDescuentos.vue"
                                )
                        },
                        {
                            path: "personas-pagos",
                            name: "importar.personas",
                            component: () =>
                                import(
                                    "./views/admin/importar/ImportarPersonas.vue"
                                )
                        }
                    ]
                },
                {
                    path: "reporte",
                    component: ParentComponent,
                    children: [
                        {
                            path: "rango-anual",
                            name: "reporte.rango-anual",
                            component: () =>
                                import("./views/admin/reportes/RangoAnual.vue")
                        },
                        {
                            path: "anual",
                            name: "reporte.anual",
                            component: () =>
                                import("./views/admin/reportes/Anual.vue")
                        },
                        {
                            path: "mensual",
                            name: "reporte.mensual",
                            component: () =>
                                import("./views/admin/reportes/Mensual.vue")
                        }
                    ]
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
