<template>
    <v-container>
        <v-container fill-height fluid>
            <v-layout row wrap>
                <v-flex xs12>
                    <span class="display-1 font-weight-bold"
                        >Historial de Constancias</span
                    >
                </v-flex>
            </v-layout>
        </v-container>
        <card class="mt-4">
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
                    <template v-if="historiales.length">
                        <tr
                            v-for="historial in historiales"
                            :key="historial.id"
                        >
                            <td class="text-xs-center">
                                {{ historial.certificado }}
                            </td>
                            <td class="text-xs-center">{{ historial.anio }}</td>
                            <td class="text-xs-center">
                                {{ historial.meses }}
                            </td>
                            <td class="text-xs-center">{{ historial.dni }}</td>
                            <td class="text-xs-center">
                                {{ historial.dni_user }}
                            </td>
                            <td class="text-xs-center">
                                {{ formatDateTime(historial.created_at) }}
                            </td>
                            <template v-if="$auth.isAdmin()">
                                <td class="text-xs-center">
                                    <EstadoChip :estado="historial.estado" />
                                </td>
                            </template>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('pagos.consultar') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <v-btn
                                        color="info"
                                        fab
                                        small
                                        slot="activator"
                                        @click="viewPDF(historial)"
                                    >
                                        <v-icon>$vuetify.icons.file</v-icon>
                                    </v-btn>
                                    <span>Ver constancia</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.user.user.dni ==
                                            historial.dni_user &&
                                            historial.estado === 'creado'
                                    "
                                >
                                    <v-btn
                                        color="error"
                                        fab
                                        small
                                        slot="activator"
                                        @click="deleteData(historial)"
                                    >
                                        <v-icon>$vuetify.icons.delete</v-icon>
                                    </v-btn>
                                    <span>Eliminar historial</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.user.user.dni ==
                                            historial.dni_user
                                    "
                                >
                                    <v-btn
                                        color="primary"
                                        fab
                                        small
                                        slot="activator"
                                        @click="certificadoEdit(historial)"
                                    >
                                        <v-icon>$vuetify.icons.edit</v-icon>
                                    </v-btn>
                                    <span>Editar certificado</span>
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
        <modal-editar ref="editarCertificado"></modal-editar>
    </v-container>
</template>

<script>
import EstadoChip from "../../components/historiales/EstadoChip";
import ModalEditar from "../../components/historiales/ModalEditar";
import moment from "moment";
export default {
    components: { EstadoChip, ModalEditar },
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
                    text: "N°. Certificado"
                },
                {
                    text: "Año"
                },
                { text: "El Mes o Meses" },
                { text: "DNI de la persona" },
                { text: "DNI del responsable" },
                {
                    text: "Fecha de entrega"
                },
                { text: "Acciones" }
            ],
            historiales: []
        };
    },
    created() {
        if (this.$auth.can("historiales.index") || this.$auth.isAdmin()) {
            document.title = "Lista de constancias";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.editarCertificado = this.$refs.editarCertificado;
    },
    methods: {
        getData(
            url = `/historiales?perPage=${this.perPage}&search=${this.search}&page=${this.page}`
        ) {
            this.loadingData = true;
            axios
                .get(url)
                .then(res => {
                    this.historiales = res.data.data;
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
        formatDateTime(datetime) {
            return moment(datetime)
                .locale("es")
                .format("llll a");
        },
        deleteData(historial) {
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
                        .delete(`/historiales/${historial.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "El historial se eliminó correctamente",
                                "success"
                            );
                            this.getData();
                        })
                        .catch(err => {
                            if (err.response.status == 403) {
                                this.$router.push("/403");
                            }
                        });
                }
            });
        },
        certificadoEdit(historial) {
            this.$root.editarCertificado.show();
            this.$root.editarCertificado.form.id = historial.id;
            this.$root.editarCertificado.form.certificado =
                historial.certificado;
        },
        viewPDF(historial) {
            const anio = historial.anio;
            const meses = historial.meses;
            const persona_id = historial.persona_id;
            const certificado = historial.certificado;
            const tipo = historial.tipo;

            if (tipo == "rango") {
                var array_years = anio.split("-");
                var anio_anterior = array_years[0];
                var anio_actual = array_years[1];

                let params = {
                    anio_anterior: anio_anterior,
                    anio_actual: anio_actual,
                    persona_id: persona_id,
                    certificado: certificado,
                    ver: 1
                };
                const params_code = window.btoa(JSON.stringify(params));
                window.open(`/reporte/por-anios/${params_code}`, "_blank");
            }
            if (tipo == "anio") {
                let params = {
                    anio: anio,
                    persona_id: persona_id,
                    certificado: certificado,
                    ver: 1
                };
                const params_code = window.btoa(JSON.stringify(params));
                window.open(`/reporte/por-anio/${params_code}`, "_blank");
            }
            if (tipo == "mes") {
                let params = {
                    anio: anio,
                    mes: meses,
                    persona_id: persona_id,
                    certificado: certificado,
                    ver: 1
                };
                const params_code = window.btoa(JSON.stringify(params));
                window.open(`/reporte/por-mes/${params_code}`, "_blank");
            }
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
