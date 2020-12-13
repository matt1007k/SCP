<template>
    <v-container>
        <page-header
            title="Descuentos"
            subtitle="Administra los descuentos para los pagos."
            img="/img/pixeltrue-icons-discount-2.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('descuentos.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        @click.stop="modalAgregar"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Agregar Descuento
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
                    <template v-if="descuentos.length">
                        <tr v-for="descuento in descuentos" :key="descuento.id">
                            <td class="text-xs-center">
                                {{ descuento.codigo }}
                            </td>
                            <td>{{ descuento.nombre }}</td>
                            <td>
                                <v-chip
                                    text-color="white"
                                    color="success"
                                    class="text-capitalize"
                                    small
                                    >{{ descuento.tipo }}</v-chip
                                >
                            </td>
                            <td class="text-xs-center">
                                {{ descuento.descripcion }}
                            </td>
                            <td class="text-xs-center">
                                {{ descuento.descripcion_simple }}
                            </td>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('descuentos.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(descuento)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('descuentos.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(descuento)"
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
        <modal-agregar ref="agregarDescuento"></modal-agregar>
        <modal-editar ref="editarDescuento"></modal-editar>
    </v-container>
</template>

<script>
import ModalAgregar from "../../components/descuentos/ModalAgregar";
import ModalEditar from "../../components/descuentos/ModalEditar";
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
                    text: "Codigo"
                },
                { text: "Nombre" },
                { text: "Tipo" },
                { text: "Descripcion" },
                { text: "Descripcion simple" },
                { text: "Acciones" }
            ],
            descuentos: []
        };
    },
    created() {
        if (this.$auth.can("descuentos.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Descuentos";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.agregarDescuento = this.$refs.agregarDescuento;
        this.$root.editarDescuento = this.$refs.editarDescuento;
    },
    methods: {
        getData(
            url = `/descuentos?perPage=${this.perPage}&search=${this.search}&page=${this.page}`
        ) {
            this.loadingData = true;
            axios
                .get(url)
                .then(res => {
                    this.descuentos = res.data.data;
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
            this.$root.agregarDescuento.show();
        },
        modalEditar(descuento) {
            this.$root.editarDescuento.show();
            this.$root.editarDescuento.form.id = descuento.id;
            this.$root.editarDescuento.form.codigo = descuento.codigo;
            this.$root.editarDescuento.form.nombre = descuento.nombre;
            this.$root.editarDescuento.form.tipo = descuento.tipo;
            this.$root.editarDescuento.form.descripcion = descuento.descripcion;
            this.$root.editarDescuento.form.descripcion_simple =
                descuento.descripcion_simple;
        },
        deleteData(descuento) {
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
                        .delete(`/descuentos/${descuento.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "El descuento se eliminó correctamente",
                                "success"
                            );
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                            if (errors.response.status == 403) {
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
