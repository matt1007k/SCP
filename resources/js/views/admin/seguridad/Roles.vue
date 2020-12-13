<template>
    <v-container>
        <page-header
            title="Roles"
            subtitle="Administra los roles para los usuarios que acceden al sistema"
            img="/img/information-security-1.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('roles.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        @click.stop="modalAgregar"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Agregar Rol
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
                    <template v-if="roles.length">
                        <tr v-for="rol in roles" :key="rol.id">
                            <td class="text-xs-center">
                                <v-chip>{{ rol.slug }}</v-chip>
                            </td>
                            <td>{{ rol.name }}</td>
                            <td>{{ rol.description }}</td>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('roles.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(rol)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('roles.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(rol)"
                                        >
                                            <v-icon
                                                >$vuetify.icons.delete</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <span>Eliminar registro</span>
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
        <modal-agregar ref="agregarRol"></modal-agregar>
        <modal-editar ref="editarRol"></modal-editar>
    </v-container>
</template>

<script>
import ModalAgregar from "../../../components/roles/ModalAgregar";
import ModalEditar from "../../../components/roles/ModalEditar";
export default {
    components: { ModalAgregar, ModalEditar },
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
                    text: "Identificador"
                },
                {
                    text: "Nombre del rol"
                },
                { text: "Descripción" },
                { text: "Acciones" }
            ],
            roles: []
        };
    },
    created() {
        if (this.$auth.can("roles.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Roles";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.agregarRol = this.$refs.agregarRol;
        this.$root.editarRol = this.$refs.editarRol;
    },
    methods: {
        getData(url = "/roles") {
            this.loadingData = true;
            axios
                .get(url, {
                    params: {
                        perPage: this.perPage,
                        page: this.page,
                        search: this.search
                    }
                })
                .then(res => {
                    this.roles = res.data.data;
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
            this.$root.agregarRol.show();
        },
        modalEditar(persona) {
            this.$root.editarRol.show();
            this.$root.editarRol.form.id = persona.id;
            this.$root.editarRol.form.identificador = persona.slug;
            this.$root.editarRol.form.nombre = persona.name;
            this.$root.editarRol.form.descripcion = persona.description;
            this.$root.editarRol.form.permissions = persona.permissions;
        },
        deleteData(rol) {
            this.$swal({
                title: "¿Está seguro de eliminar el registro?",
                text: "Esta operación va a eliminar el registro",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, eliminar"
            }).then(result => {
                if (result.value) {
                    axios
                        .delete(`/roles/${rol.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "El rol se eliminó correctamente",
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

<style></style>
