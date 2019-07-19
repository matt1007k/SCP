export const listItemsSidebar = [
    {
        title: "Tablero",
        url: "/admin",
        icon: "mdi mdi-chart-line",
        permission: "admin.index",
        exact: true
    },
    {
        title: "Usuarios",
        url: "/admin/usuarios",
        icon: "mdi mdi-account-multiple",
        exact: false,
        permission: "users.index"
    },
    {
        title: "Personas",
        url: "/admin/personas",
        icon: "mdi mdi-account-group",
        exact: false,
        permission: "personas.index"
    },
    {
        title: "Descuentos",
        url: "/admin/descuentos",
        icon: "mdi mdi-sale",
        permission: "descuentos.index"
    },
    {
        title: "Haberes",
        url: "/admin/haberes",
        icon: "mdi mdi-cash-usd",
        permission: "haberes.index"
    },
    {
        title: "Historial de constancias",
        url: "/admin/historiales",
        icon: "mdi mdi-chart-histogram",
        permission: "historiales.index"
    },
    {
        title: "Pagos",
        icon: "mdi mdi-credit-card",
        url: "/admin/pagos",
        group: true,
        permission: "pagos.index",
        submenu: [
            {
                title: "Lista de pagos",
                url: "/admin/pagos/lista",
                permission: "pagos.index"
            },
            {
                title: "Registrar pago",
                url: "/admin/pagos/crear",
                permission: "pagos.create"
            }
        ]
    },
    {
        title: "Roles y Permisos",
        icon: "mdi mdi-security",
        url: "/admin/seguridad",
        group: true,
        submenu: [
            {
                title: "Permisos",
                url: "/admin/seguridad/permisos",
                permission: "permisos.index"
            },
            {
                title: "Roles",
                url: "/admin/seguridad/roles",
                permission: "roles.index"
            }
        ]
    },
    {
        title: "Importar",
        icon: "mdi mdi-upload",
        url: "/admin/importar",
        group: true,
        permission: "importar.todos",
        submenu: [
            {
                title: "Haberes y Descuentos",
                url: "/admin/importar/haberes-descuentos",
                permission: "importar.descuentos"
            },
            {
                title: "Personas y Pagos",
                url: "/admin/importar/personas-pagos",
                permission: "importar.personas"
            }
        ]
    },
    {
        title: "Reportes",
        icon: "mdi mdi-file-chart",
        url: "/admin/reporte",
        group: true,
        permission: "pagos.consultar",
        submenu: [
            {
                title: "Por años",
                url: "/admin/reporte/rango-anual",
                permission: "pagos.consultar"
            },
            {
                title: "Por año",
                url: "/admin/reporte/anual",
                permission: "pagos.consultar"
            },
            {
                title: "Por mes",
                url: "/admin/reporte/mensual",
                permission: "pagos.consultar"
            }
        ]
    }
];
