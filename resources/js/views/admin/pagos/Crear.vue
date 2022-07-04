<template>
    <v-container fluid>
        <div class="mb-3">
            <v-btn text @click="onCancel">
                <v-icon>$vuetify.icons.left</v-icon>
                <span class="ml-2">Regresar</span>
            </v-btn>
            <div class="display-1 font-weight-bold">Registrar Pago</div>
        </div>
        <form @submit.prevent="onSubmit">
            <card>
                <SearchPerson
                    :errors="errors"
                    :person="form.persona"
                    @input="onPerson($event)"
                />
                <div>
                    <span class="body-2 mb-4 font-weight-bold"
                        >El periodo del pago</span
                    >
                    <v-tooltip
                        top
                        v-if="$auth.can('periodos.create') || $auth.isAdmin()"
                    >
                        <template v-slot:activator="{ on }">
                            <v-btn
                                color="primary"
                                fab
                                x-small
                                @click="addPeriodo()"
                                v-on="on"
                            >
                                <v-icon>$vuetify.icons.add</v-icon>
                            </v-btn>
                        </template>
                        <span>Agregar un nuevo año</span>
                    </v-tooltip>
                </div>
                <v-flex row>
                    <v-col xs="12" sm="4" class="pr-sm-2">
                        <v-select
                            v-model="form.anio"
                            :items="items_anio"
                            item-text="anio"
                            item-value="anio"
                            label="El año"
                            filled
                            shaped
                            :error-messages="errors.anio"
                        ></v-select>
                    </v-col>
                    <v-col xs="12" sm="4" class="pr-sm-2">
                        <v-select
                            v-model="form.mes"
                            :items="items_mes"
                            label="El mes"
                            filled
                            shaped
                            :error-messages="errors.mes"
                        ></v-select>
                    </v-col>
                    <v-col xs="12" sm="12">
                        <v-btn
                            color="text"
                            outlined
                            small
                            @click="addHD('haber')"
                            class="rounded-xl"
                            >Agregar Haber</v-btn
                        >
                        <v-btn
                            color="text"
                            outlined
                            small
                            class="rounded-xl ml-2"
                            @click="addHD('descuento')"
                            >Agregar Descuento</v-btn
                        >
                    </v-col>
                </v-flex>
            </card>
            <v-layout wrap>
                <transition name="fade">
                    <v-flex xs12 v-if="errors.haberes">
                        <v-alert :value="true" type="error">
                            <div class="body-2">
                                Los haberes son necesarios.
                            </div>
                        </v-alert>
                    </v-flex>
                </transition>
                <transition name="fade">
                    <v-flex xs12 v-if="errors.descuentos">
                        <v-alert :value="true" type="error">
                            <div class="body-2">
                                Los descuentos son necesarios.
                            </div>
                        </v-alert>
                    </v-flex>
                </transition>
                <v-flex xs12>
                    <lista-items
                        title="Haberes"
                        :items="form.haberes"
                        @remove="removeItem"
                    ></lista-items>
                    <lista-items
                        title="Descuentos"
                        :items="form.descuentos"
                        @remove="removeItem"
                    ></lista-items>
                </v-flex>
                <v-flex xs12 class="mb-2">
                    <card>
                        <v-container fluid grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12 sm3>
                                    <div class="subheading font-weight-bold">
                                        Total Haber
                                    </div>
                                    <p class="no-margin">
                                        S/. {{ totalHaber() }}
                                    </p>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <div class="subheading font-weight-bold">
                                        Total Descuento
                                    </div>
                                    <p class="no-margin">
                                        S/. {{ totalDescuento() }}
                                    </p>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <div class="subheading font-weight-bold">
                                        Total Líquido
                                    </div>
                                    <p class="no-margin">
                                        S/. {{ totalLiquido() }}
                                    </p>
                                </v-flex>
                                <v-flex xs12 sm3>
                                    <div class="subheading font-weight-bold">
                                        Total Imponible
                                    </div>
                                    <p class="no-margin">
                                        S/. {{ totalImponible() }}
                                    </p>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <div class="d-flex mt-4">
                            <v-btn
                                class="rounded-lg mr-2"
                                color="primary"
                                type="submit"
                                >Guardar</v-btn
                            >
                            <btn-secondary :onClick="onCancel"
                                >Cancelar</btn-secondary
                            >
                        </div>
                    </card>
                </v-flex>
            </v-layout>
        </form>
        <agregar ref="modalAgregarhb" @addRow="addRow"></agregar>
        <modal-agregar ref="modalAgregarPeriodo"></modal-agregar>
    </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import Agregar from "../../../components/pagos/Agregar";
import ModalAgregar from "../../../components/periodos/ModalAgregar";
import ListaItems from "../../../components/pagos/ListaItems";
import SearchPerson from "../../../components/personas/SearchPerson";
export default {
    components: { Agregar, ListaItems, ModalAgregar, SearchPerson },
    data() {
        return {
            form: {
                anio: "",
                mes: "",
                persona: {},
                total_haber: 0,
                haberes: [],
                total_descuento: 0,
                descuentos: [],
                monto_liquido: 0,
                monto_imponible: 0
            },
            items_anio: [],
            items_mes: months,
            errors: {}
        };
    },
    created() {
        if (this.$auth.can("pagos.create") || this.$auth.isAdmin()) {
            document.title = "Registrar un Pago";
            this.getYears();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.modalAgregarhb = this.$refs.modalAgregarhb;
        this.$root.modalAgregarPeriodo = this.$refs.modalAgregarPeriodo;
    },
    methods: {
        getYears() {
            axios
                .get("/periodos")
                .then(res => (this.items_anio = res.data.years))
                .catch(err => console.log(err));
        },
        addHD(tipo) {
            this.$root.modalAgregarhb.showModal();
            this.$root.modalAgregarhb.tipo = tipo;
        },
        addPeriodo() {
            this.$root.modalAgregarPeriodo.show();
        },
        addRow(item, tipo) {
            if (tipo == "haber") {
                const haberes = [...this.form.haberes];
                const updatedItemIndex = haberes.findIndex(
                    haber => haber.id === item.id
                );
                if (updatedItemIndex < 0) {
                    this.form.haberes.push({
                        ...item,
                        monto: 0.0,
                        hd_id: item.id
                    });
                } else {
                    this.$swal(
                        "Mensaje de operación",
                        "El haber ya ha sido agregado.",
                        "info"
                    );
                }
            } else if (tipo == "descuento") {
                const descuentos = [...this.form.descuentos];
                const updatedItemIndex = descuentos.findIndex(
                    descuento => descuento.id === item.id
                );
                if (updatedItemIndex < 0) {
                    this.form.descuentos.push({
                        ...item,
                        monto: 0.0,
                        hd_id: item.id
                    });
                } else {
                    this.$swal(
                        "Mensaje de operación",
                        "El descuento ya ha sido agregado.",
                        "info"
                    );
                }
            }
        },
        removeItem(index, tipo) {
            if (tipo == "haber") {
                this.form.haberes.splice(index, 1);
            } else if (tipo == "descuento") {
                this.form.descuentos.splice(index, 1);
            }
        },
        totalHaber() {
            const totalHaber = this.form.haberes
                .map(item => {
                    let total = 0;
                    return (total += parseFloat(item.monto));
                })
                .reduce((a, b) => {
                    return a + b;
                }, 0);

            return parseFloat(totalHaber).toFixed(2);
        },
        totalDescuento() {
            const totalDescuento = this.form.descuentos
                .map(item => {
                    let total = 0;
                    return (total += parseFloat(item.monto));
                })
                .reduce((a, b) => {
                    return a + b;
                }, 0);

            return parseFloat(totalDescuento).toFixed(2);
        },
        totalLiquido() {
            const total = this.totalHaber() - this.totalDescuento();
            return parseFloat(total).toFixed(2);
        },
        totalImponible() {
            const total = this.form.haberes
                .map(item => {
                    let totalItem = 0;
                    if (item.es_imponible == 1) {
                        return (totalItem += parseFloat(item.monto));
                    }
                    return totalItem;
                })
                .reduce((a, b) => {
                    return a + b;
                }, 0);
            return parseFloat(total).toFixed(2);
        },
        onPerson(e) {
            this.form.persona = e.target.value;
        },
        onSubmit() {
            const form = {
                anio: this.form.anio,
                mes: this.form.mes,
                persona_id: this.form.persona.id,
                total_haber: this.totalHaber(),
                haberes: this.form.haberes,
                total_descuento: this.totalDescuento(),
                descuentos: this.form.descuentos,
                monto_liquido: this.totalLiquido(),
                monto_imponible: this.totalImponible()
            };
            axios
                .post("/pagos", form)
                .then(res => {
                    this.$router.push("/admin/pagos/lista");
                    this.$swal(
                        "Mensaje de operación",
                        "Datos registrados correctamente",
                        "success"
                    );
                    this.resetForm();
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                    if (err.response.status == 403) {
                        this.$router.push("/403");
                    }
                });
        },
        resetForm() {
            this.form.persona = {};
            this.form.anio = "";
            this.form.mes = "";
            this.form.haberes = [];
            this.form.descuentos = [];
            this.form.total_haber = 0;
            this.form.total_descuento = 0;
            this.form.monto_liquido = 0;
            this.form.monto_imponible = 0;
        },
        onCancel() {
            this.$router.push("/admin/pagos/lista");
            this.resetForm();
        }
    }
};
</script>

<style></style>
