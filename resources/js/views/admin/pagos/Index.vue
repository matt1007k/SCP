<template>
    <v-container>
        <page-header
            title="Pagos"
            subtitle="Administra los pagos recibidos por las personas."
            img="/img/clip-payment-processed-2.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('pagos.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        router
                        to="/admin/pagos/crear"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Registrar Pago
                    </v-btn>
                </div>
            </template>
        </page-header>

        <card class="mt-6">
            <v-flex row class="d-flex align-end">
                <v-col sm="12" md="5">
                    <span class="font-weight-bold text--secondary">
                        <span>Filtar por periodo:</span>
                    </span>
                    <v-select
                        :items="items_anio"
                        v-model="anio"
                        filled
                        shaped
                        item-text="anio"
                        item-value="anio"
                        @input="filterByYear()"
                        label="Seleccionar el año"
                    ></v-select>
                </v-col>
                <v-col xs="12" md="4" class="ml-2">
                    <v-select
                        v-model="mes"
                        :items="items_mes"
                        filled
                        shaped
                        label="Seleccionar el mes"
                        @input="filterByMonth()"
                    ></v-select>
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
                    <template v-if="pagos.length">
                        <tr v-for="pago in pagos" :key="pago.id">
                            <td class="text-xs-center">
                                {{ pago.anio }}, {{ pago.mes }}
                            </td>
                            <td>
                                <p class="mb-0">
                                    {{ pago.persona.apellido_paterno }}
                                    {{ pago.persona.apellido_materno }},
                                    {{ pago.persona.nombre }}
                                </p>
                                <p class="mb-0 text--secondary">
                                    COD. MODULAR
                                    {{ pago.persona.codigo_modular }}
                                </p>
                            </td>
                            <td class="text-xs-center">
                                {{ pago.total_haber }}
                            </td>
                            <td class="text-xs-center">
                                {{ pago.total_descuento }}
                            </td>
                            <td class="text-xs-center">
                                {{ pago.monto_liquido }}
                            </td>
                            <td class="text-xs-center">
                                {{ pago.monto_imponible }}
                            </td>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('pagos.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(pago)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('pagos.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(pago)"
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
    </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
export default {
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
                    text: "Periodo"
                },
                {
                    text: "Nombre persona"
                },
                { text: "Total Haber" },
                { text: "Total Descuento" },
                { text: "Monto Liquido" },
                { text: "Monto Imponible" },
                { text: "Acciones" }
            ],
            pagos: [],
            items_anio: [],
            items_mes: months,
            anio: "",
            mes: ""
        };
    },
    created() {
        if (this.$auth.can("pagos.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Pagos";
            var date_now = new Date();
            this.anio = String(date_now.getFullYear());
            this.mes = date_now
                .getMonth()
                .toString()
                .padStart(2, "0");
            this.getData();
            this.getYears();
        } else {
            this.$router.push("/admin/403");
        }
    },
    methods: {
        getData(url = `/pagos`) {
            this.loadingData = true;
            axios
                .get(url, {
                    params: {
                        anio: this.anio,
                        mes: this.mes,
                        perPage: this.perPage,
                        search: this.search,
                        page: this.page
                    }
                })
                .then(res => {
                    this.pagos = res.data.data;
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
        filterByYear() {
            this.mes = "01";
            this.getData();
        },
        filterByMonth() {
            this.getData();
        },
        getYears() {
            axios
                .get("/periodos")
                .then(res => (this.items_anio = res.data.years))
                .catch(err => console.log(err));
        },
        modalEditar(pago) {
            this.$router.push("/admin/pagos/editar/" + pago.id);
        },
        deleteData(pago) {
            this.$swal({
                title: "¿Está seguro de eliminar el registro?",
                text: "Esta operación va a eliminar el registro.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, eliminar"
            }).then(result => {
                if (result.value) {
                    axios
                        .delete(`/pagos/${pago.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "El pago se eliminó correctamente",
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
