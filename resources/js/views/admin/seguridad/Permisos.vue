<template>
    <v-container>
        <page-header
            title="Permisos"
            subtitle="Administra los permisos especiales de acceso al sistema."
            img="/img/flame-1250.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('permisos.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        @click.stop="modalAgregar"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Agregar Permiso
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
                    <template v-if="permisos.length">
                        <tr v-for="permiso in permisos" :key="permiso.id">
                            <td class="text-xs-center">
                                <v-chip>{{ permiso.slug }}</v-chip>
                            </td>
                            <td>{{ permiso.name }}</td>
                            <td>{{ permiso.description }}</td>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('permisos.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(permiso)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('permisos.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(permiso)"
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
        <modal-agregar ref="agregarPermiso"></modal-agregar>
        <modal-editar ref="editarPermiso"></modal-editar>
    </v-container>
</template>

<script>
import ModalAgregar from "../../../components/permisos/ModalAgregar";
import ModalEditar from "../../../components/permisos/ModalEditar";
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
            permisos: []
        };
    },
    created() {
        if (this.$auth.can("permisos.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Permisos";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.agregarPermiso = this.$refs.agregarPermiso;
        this.$root.editarPermiso = this.$refs.editarPermiso;
    },
    methods: {
        getData(
            url = `/permisos?perPage=${this.perPage}&search=${this.search}&page=${this.page}`
        ) {
            this.loadingData = true;
            axios
                .get(url)
                .then(res => {
                    this.permisos = res.data.data;
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
            this.$root.agregarPermiso.show();
        },
        modalEditar(permiso) {
            this.$root.editarPermiso.show();
            this.$root.editarPermiso.form.id = permiso.id;
            this.$root.editarPermiso.form.identificador = permiso.slug;
            this.$root.editarPermiso.form.nombre = permiso.name;
            this.$root.editarPermiso.form.descripcion = permiso.description;
        },
        deleteData(permiso) {
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
                        .delete(`/permisos/${permiso.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "El permiso se eliminó correctamente",
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
