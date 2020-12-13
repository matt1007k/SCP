<template>
    <v-container>
        <page-header
            title="Haberes"
            subtitle="Administra los haberes para los pagos."
            img="/img/delesign-assets-and-liabilities.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('haberes.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        @click.stop="modalAgregar"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Agregar Haberes
                    </v-btn>
                </div>
            </template>
        </page-header>

        <card class="mt-6">
            <v-flex row>
                <v-col sm="12" md="6" flex>
                    <span class="font-weight-bold text--secondary"
                        >Filtrar por:</span
                    >
                    <v-chip
                        class="ma-2"
                        :color="`${imponible == 'Todos' ? 'primary' : ''}`"
                        @click="filterBy('activo')"
                    >
                        Todos
                    </v-chip>
                    <v-chip
                        class="ma-2"
                        :color="`${imponible == '1' ? 'primary' : ''}`"
                        @click="filterBy('1')"
                    >
                        Asegurable
                    </v-chip>
                    <v-chip
                        class="ma-2"
                        :color="`${imponible == '0' ? 'primary' : ''}`"
                        @click="filterBy('0')"
                    >
                        No asegurable
                    </v-chip>
                </v-col>
            </v-flex>
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
                    <template v-if="haberes.length">
                        <tr v-for="haber in haberes" :key="haber.id">
                            <td class="text-xs-center">{{ haber.codigo }}</td>
                            <td>
                                <p class="mb-0">{{ haber.nombre }}</p>
                                <v-chip
                                    text-color="white"
                                    color="info"
                                    class="text-capitalize"
                                    small
                                    >{{ haber.tipo }}</v-chip
                                >
                            </td>
                            <td class="text-xs-center">
                                {{ haber.descripcion }}
                            </td>
                            <td class="text-xs-center">
                                {{ haber.descripcion_simple }}
                            </td>
                            <td class="text-xs-center">
                                <is-asegurable :haber="haber" />
                            </td>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('haberes.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(haber)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('haberes.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(haber)"
                                        >
                                            <v-icon
                                                >$vuetify.icons.delete</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <span>Cambiar asegurable</span>
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
        <modal-agregar ref="agregarHaber"></modal-agregar>
        <modal-editar ref="editarHaber"></modal-editar>
    </v-container>
</template>

<script>
import IsAsegurable from "../../components/haberes/IsAsegurable.vue";
import ModalAgregar from "../../components/haberes/ModalAgregar";
import ModalEditar from "../../components/haberes/ModalEditar";
export default {
    components: { ModalAgregar, ModalEditar, IsAsegurable },
    data() {
        return {
            imponible: "Todos",
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
                { text: "Descripcion" },
                { text: "Descripcion simple" },
                { text: "Asegurable" },
                { text: "Acciones" }
            ],
            haberes: []
        };
    },
    created() {
        if (this.$auth.can("haberes.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Haberes";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.agregarHaber = this.$refs.agregarHaber;
        this.$root.editarHaber = this.$refs.editarHaber;
    },
    methods: {
        getData(
            url = `/haberes?perPage=${this.perPage}&search=${this.search}&page=${this.page}&imponible=${this.imponible}`
        ) {
            this.loadingData = true;
            axios
                .get(url, { params: { imponible: this.imponible } })
                .then(res => {
                    this.haberes = res.data.data;
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
        filterBy(prop) {
            this.imponible = prop;
            this.getData();
            this.resetPage();
        },
        modalAgregar() {
            this.$root.agregarHaber.show();
        },
        modalEditar(persona) {
            this.$root.editarHaber.show();
            this.$root.editarHaber.form.id = persona.id;
            this.$root.editarHaber.form.codigo = persona.codigo;
            this.$root.editarHaber.form.nombre = persona.nombre;
            this.$root.editarHaber.form.tipo = persona.tipo;
            this.$root.editarHaber.form.descripcion = persona.descripcion;
            this.$root.editarHaber.form.descripcion_simple =
                persona.descripcion_simple;
            this.$root.editarHaber.form.es_imponible = String(
                persona.es_imponible
            );
        },
        deleteData(haber) {
            this.$swal({
                title: "¿Está seguro de cambiar el imponible del registro?",
                text:
                    "Esta operación va a cambiar a ser asegurable o no el haber",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, cambiar"
            }).then(result => {
                if (result.value) {
                    axios
                        .delete(`/haberes/${haber.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "Se cambio el imponible correctamente",
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
