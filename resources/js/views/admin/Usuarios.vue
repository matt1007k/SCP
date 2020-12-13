<template>
    <v-container>
        <page-header
            title="Usuarios"
            subtitle="Administra los usuarios que ingresen en el sistema."
            img="/img/clip-online-consultation.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('users.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        @click.stop="modalAgregar"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Agregar Usuario
                    </v-btn>
                </div>
            </template>
        </page-header>
        <card class="mt-6">
            <v-flex row>
                <v-col sm="12" md="5">
                    <v-text-field
                        shaped
                        filled
                        label="Buscar"
                        prepend-inner-icon="mdi-magnify"
                        v-model="search"
                    ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="12" md="2">
                    <v-select
                        :items="RowsPerPageItems"
                        filled
                        label="Mostrar"
                        v-model="perPage"
                        dense
                        shaped
                    ></v-select>
                </v-col>
            </v-flex>
            <v-fade-transition leave-absolute>
                <v-progress-linear
                    v-if="loadingData"
                    size="24"
                    color="primary"
                    indeterminate
                ></v-progress-linear>
            </v-fade-transition>
            <data-table :headers="headers">
                <template v-slot:body>
                    <template v-if="usuarios.length">
                        <tr v-for="user in usuarios" :key="user.id">
                            <td>
                                <p class="mb-0">
                                    {{ user.name }}
                                </p>
                                <p class="text--secondary text--small">
                                    DNI {{ user.dni }}
                                </p>
                            </td>
                            <td>{{ user.email }}</td>
                            <roles-tag-table :roles="user.roles" />
                            <status-tag-table :user="user" />
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('users.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(user)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('users.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(user)"
                                        >
                                            <v-icon
                                                >$vuetify.icons.delete</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <span>Cambiar estado</span>
                                </v-tooltip>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td :colspan="headers.length">No hay registros.</td>
                        </tr>
                    </template>
                </template>
            </data-table>
            <div
                class="d-flex justify-between align-center flex-column flex-md-row"
            >
                <p class="caption mb-0">
                    Mostrando {{ pagination.from }} al {{ pagination.to }} de
                    {{ pagination.total }} registros
                </p>
                <v-pagination
                    v-model="page"
                    :length="pagination.last_page"
                    :total-visible="7"
                    color="primary"
                ></v-pagination>
            </div>
        </card>
        <modal-agregar ref="agregarUsuario"></modal-agregar>
        <modal-editar ref="editarUsuario"></modal-editar>
    </v-container>
</template>

<script>
import ModalAgregar from "../../components/usuarios/ModalAgregar";
import ModalEditar from "../../components/usuarios/ModalEditar";
import RolesTagTable from "../../components/usuarios/RolesTagTable.vue";
import StatusTagTable from "../../components/usuarios/StatusTagTable.vue";
export default {
    components: { ModalAgregar, ModalEditar, RolesTagTable, StatusTagTable },
    data() {
        return {
            search: "",
            loadingData: false,
            pagination: {},
            page: 1,
            RowsPerPageItems: [10, 15, 25],
            perPage: 10,
            headers: [
                {
                    text: "Nombre completo"
                },
                { text: "Correo Electrónico" },
                { text: "Roles" },
                { text: "Estado" },
                { text: "Acciones" }
            ],
            usuarios: []
        };
    },
    created() {
        if (this.$auth.can("users.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Usuarios";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.agregarUsuario = this.$refs.agregarUsuario;
        this.$root.editarUsuario = this.$refs.editarUsuario;
    },
    methods: {
        getData(
            url = `/usuarios?perPage=${this.perPage}&search=${this.search}&page=${this.page}`
        ) {
            this.loadingData = true;
            axios
                .get(url)
                .then(res => {
                    this.usuarios = res.data.data;
                    this.pagination = this.getPaginateElement(res.data);
                    this.loadingData = false;
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status == 403) {
                        this.$router.push("/admin/403");
                    }
                });
        },
        modalAgregar() {
            this.$root.agregarUsuario.show();
        },
        modalEditar(persona) {
            this.$root.editarUsuario.show();
            this.$root.editarUsuario.form.id = persona.id;
            this.$root.editarUsuario.form.dni = persona.dni;
            this.$root.editarUsuario.form.name = persona.name;
            this.$root.editarUsuario.form.email = persona.email;
            this.$root.editarUsuario.form.roles = persona.roles;
            this.$root.editarUsuario.form.permissions = persona.permissions;
            this.$root.editarUsuario.form.estado = persona.estado;
        },
        deleteData(usuario) {
            this.$swal({
                title: "¿Está seguro de cambiar el estado?",
                text: "Esta operación va a cambiar el estado del registro",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, cambiar"
            }).then(result => {
                if (result.value) {
                    axios
                        .delete(`/usuarios/${usuario.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "Estado cambiado correctamente",
                                "success"
                            );
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                            if (err.response.status == 403) {
                                this.$router.push("/403");
                            }
                        });
                }
            });
        },
        resetPage() {
            this.page = 1;
        }
    },
    watch: {
        search(value) {
            this.resetPage();
            this.getData();
        },
        perPage(value) {
            this.resetPage();
            this.getData();
        },
        page(value) {
            this.getData();
        }
    }
};
</script>
