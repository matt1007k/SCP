<template>
    <v-container>
        <page-header
            title="Reporte Judicial"
            subtitle="Consultar los beneficiarios judiciales de una persona."
            img="/img/clip-web-security.png"
        />

        <card class="mt-4">
            <SearchPerson
                :errors="errors"
                :person="form.persona"
                @input="onPerson($event)"
            />
            <v-flex row>
                <v-col xs="12" md="12">
                    <span class="body-2 mb-2 font-weight-semibold"
                        >El periodo del pago</span
                    >
                </v-col>
                <v-col xs="12" sm="6" md="3">
                    <div class="pr-2">
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
                    </div>
                </v-col>
                <v-col xs="12" sm="6" md="3" class="pl-2">
                    <v-select
                        v-model="form.mes"
                        :items="items_mes"
                        label="El mes"
                        filled
                        shaped
                        :error-messages="errors.mes"
                    ></v-select>
                </v-col>
                <v-col xs="12" sm="3" md="6"></v-col>
                <v-col xs="12" sm="3" md="3">
                    <v-btn
                        class="rounded-lg"
                        block
                        color="primary"
                        @click="buscarPago()"
                        >Buscar</v-btn
                    >
                </v-col>
            </v-flex>
        </card>
        <v-flex row>
            <v-col xs="12">
                <template v-if="Object.keys(lista_resultado).length !== 0">
                    <div class="mb-2">
                        <div class="title">Resultados encontrados</div>
                        <div class="caption text--secondary">
                            Descargar o imprimir el reporte judicial
                        </div>
                    </div>
                    <card
                        v-for="lista in lista_resultado"
                        :key="lista.id"
                        class="mb-4"
                    >
                        <v-card-text class="d-flex justify-between">
                            <div class="details-info">
                                <div
                                    class="display-1 font-weight-bold "
                                    :class="
                                        `${
                                            $vuetify.theme.dark
                                                ? 'white--text'
                                                : 'black--text'
                                        }`
                                    "
                                >
                                    {{ lista.periodo }}
                                </div>
                                <div
                                    class="body-1  font-weight-bold text--secondary"
                                >
                                    Titular
                                </div>
                                <div class="body-2">{{ getName() }}</div>
                            </div>
                            <div>
                                <div
                                    class="body-1  font-weight-bold text--secondary"
                                >
                                    Beneficiario
                                </div>
                                <div class="heading-1">
                                    {{ getNameB(lista) }}
                                </div>
                                <div class="body-2">DNI {{ lista.b_dni }}</div>
                            </div>
                            <div class="actions">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="dark"
                                            text
                                            class="rounded-lg"
                                            @click="downloadPDF(lista.id)"
                                            v-on="on"
                                        >
                                            <v-icon
                                                >mdi
                                                mdi-cloud-download-outline</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <span>Descargar</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="dark"
                                            text
                                            class="rounded-lg"
                                            @click="viewPDF(lista.id)"
                                            v-on="on"
                                        >
                                            <v-icon>mdi mdi-printer</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Imprimir</span>
                                </v-tooltip>
                            </div>
                        </v-card-text>
                    </card>
                </template>
                <template v-else-if="loading">
                    <card>
                        <v-card-text>
                            <div class="text-xs-center">
                                <v-progress-circular
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                            </div>
                        </v-card-text>
                    </card>
                </template>
                <template v-else-if="notFound">
                    <card>
                        <v-card-text>
                            <div class="text-xs-center body-2">
                                {{ this.msg }}
                            </div>
                        </v-card-text>
                    </card>
                </template>
            </v-col>
        </v-flex>
    </v-container>
</template>

<script>
import { months } from "../../../services/listMonthsOfTheYear";
import SearchPerson from "../../../components/personas/SearchPerson";
export default {
    components: { SearchPerson },
    data() {
        return {
            form: {
                persona: {},
                mes: "",
                anio: "",
                certificado: ""
            },
            items_mes: months,
            items_anio: [],
            lista_resultado: [],
            loading: false,
            notFound: false,
            msg: null,
            errors: {}
        };
    },
    created() {
        if (this.$auth.can("pagos.consultar") || this.$auth.isAdmin()) {
            document.title = "Reporte de pagos por mes de un año";
            this.getYears();
        } else {
            this.$router.push("/admin/403");
        }
    },
    methods: {
        getYears() {
            axios
                .get("/periodos")
                .then(res => (this.items_anio = res.data.years))
                .catch(err => console.log(err));
        },
        getNameMonth(numero) {
            let mes_item = this.items_mes.find(mes => {
                return mes.value === numero;
            });
            return mes_item.text;
        },
        onPerson(e) {
            this.form.persona = e.target.value;
        },
        buscarPago() {
            this.loading = true;
            axios
                .get(`/search/por-judicial`, {
                    params: {
                        anio: this.form.anio,
                        mes: this.form.mes,
                        persona_id: this.form.persona.id,
                        certificado: this.form.certificado
                    }
                })
                .then(res => {
                    this.loading = false;
                    this.errors = {};
                    this.lista_resultado = res.data.judiciales;

                    let msg = res.data.msg;
                    if (msg) {
                        this.loading = false;
                        this.notFound = true;
                        this.msg = msg;
                        this.lista_resultado = {};
                    }
                })
                .catch(err => {
                    this.loading = false;
                    this.errors = err.response.data.errors;
                });
        },
        downloadPDF(id) {
            let params = {
                id,
                anio: this.form.anio,
                mes: this.form.mes,
                persona_id: this.form.persona.id,
                certificado: this.form.certificado,
                ver: 0
            };
            const params_code = window.btoa(JSON.stringify(params));
            axios({
                url: `/reporte/judicial/${params_code}`,
                method: "GET",
                responseType: "blob" // important
            }).then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                const name_file = `${this.form.persona.codigo_modular}-${this.form.mes}-${this.form.anio}.pdf`;
                link.href = url;
                link.setAttribute("download", name_file); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
        },
        viewPDF(id) {
            let params = {
                id,
                anio: this.form.anio,
                mes: this.form.mes,
                persona_id: this.form.persona.id,
                certificado: this.form.certificado,
                ver: 0
            };
            const params_code = window.btoa(JSON.stringify(params));
            window.open(`/reporte/judicial/${params_code}`, "_blank");
        },
        getName() {
            return `${this.form.persona.apellido_paterno} ${this.form.persona.apellido_materno}, ${this.form.persona.nombre} `;
        },
        getNameB(persona) {
            return `${persona.b_apellido_paterno} ${persona.b_apellido_materno} ,
                                    ${persona.b_nombre}`;
        }
    }
};
</script>
