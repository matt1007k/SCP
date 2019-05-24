export const listItemsSidebar = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: "mdi mdi-chart-line",
        exact: true
    },
    {
        title: "Usuarios",
        url: "/admin/usuarios",
        icon: "mdi mdi-account-multiple",
        exact: false,
        permission: "usuarios.index"
    },
    {
        title: "Personas",
        url: "/admin/personas",
        icon: "mdi mdi-account-group",
        exact: false,
        permission: "personas.index"
    },
    {
        title: "Haberes y Descuentos",
        url: "/admin/haberes-descuentos",
        icon: "mdi mdi-sale",
        permission: "descuentos.index"
    },
    {
        title: "Pagos",
        url: "/admin/pagos",
        icon: "mdi mdi-credit-card",
        exact: false,
        permission: "pagos.index"
    },
    {
        title: "Roles y Permisos",
        icon: "mdi mdi-security",
        group: true,
        submenu: [
            {
                title: "Permisos",
                url: "/admin/permisos",
                permission: "permisos.index"
            },
            {
                title: "Roles",
                url: "/admin/roles",
                permission: "roles.index"
            }
        ]
    },
    {
        title: "Importar",
        icon: "mdi mdi-upload",
        group: true,
        submenu: [
            {
                title: "Importar Habs. o Descts.",
                url: "/admin/importar/haberes-descuentos",
                permission: "importar.descuentos"
            },
            {
                title: "Importar Personas o Pagos",
                url: "/admin/importar/personas-pagos",
                permission: "importar.personas"
            }
        ]
    }
];
