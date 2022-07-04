<template>
    <v-container>
        <page-header
            title="Reporte de Constancia Anual"
            subtitle="Consultar los pagos de una persona de un año completo."
            img="/img/clip-web-security.png"
        />
        <card class="mt-4">
            <v-container fill-height fluid>
                <v-layout row wrap>
                    <SearchPerson
                        :errors="errors"
                        :person="form.persona"
                        @input="onPerson($event)"
                    />
                    <v-flex xs12>
                        <span class="body-2 font-weight-semibold mb-2"
                            >El periodo del pago</span
                        >
                    </v-flex>
                    <v-flex xs12 sm6 md3>
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
                    </v-flex>
                    <v-flex xs12 sm6 md3 class="pl-2">
                        <v-text-field
                            label="Número de Certificado"
                            v-model="form.certificado"
                            filled
                            shaped
                            :error-messages="errors.certificado"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md6></v-flex>
                    <v-flex xs12 sm3 md3>
                        <v-btn
                            class="rounded-lg"
                            color="primary"
                            block
                            @click="buscarPago()"
                            >Buscar</v-btn
                        >
                    </v-flex>
                </v-layout>
            </v-container>
        </card>
        <v-flex row>
            <v-col md="12">
                <template v-if="Object.keys(lista_resultado).length !== 0">
                    <div class="mb-2">
                        <div class="title">Resultados encontrados</div>
                        <div class="caption text--secondary">
                            Descargar o imprimir todos los pagos por año
                        </div>
                    </div>
                    <card>
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
                                    v-html="lista_resultado.anio"
                                ></div>
                                <div class="body-1">{{ getName() }}</div>
                            </div>
                            <div class="actions">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="dark"
                                            class="rounded-lg"
                                            text
                                            @click="
                                                downloadPDF(
                                                    lista_resultado.anio,
                                                    form.persona.dni
                                                )
                                            "
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
                                            @click="
                                                viewPDF(
                                                    lista_resultado.anio,
                                                    form.persona.dni
                                                )
                                            "
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
import SearchPerson from "../../../components/personas/SearchPerson";

export default {
    components: { SearchPerson },
    data: () => ({
        form: {
            persona: {},
            anio: "",
            certificado: ""
        },
        items_anio: [],
        lista_resultado: [],
        loading: false,
        notFound: false,
        msg: null,
        errors: {}
    }),
    created() {
        if (this.$auth.can("pagos.consultar") || this.$auth.isAdmin()) {
            document.title = "Reporte de pagos por año";
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
        onPerson(e) {
            this.form.persona = e.target.value;
        },
        buscarPago() {
            this.loading = true;
            axios
                .get(`/search/por-anio`, {
                    params: {
                        anio: this.form.anio,
                        persona_id: this.form.persona.id,
                        certificado: this.form.certificado
                    }
                })
                .then(res => {
                    this.loading = false;
                    this.errors = {};
                    this.lista_resultado = res.data.pagos;

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
        downloadPDF(anio, persona_id) {
            let params = {
                anio: this.form.anio,
                persona_id: this.form.persona.id,
                certificado: this.form.certificado,
                ver: 0
            };
            const params_code = window.btoa(JSON.stringify(params));
            axios({
                url: `/reporte/por-anio/${params_code}`,
                method: "GET",
                responseType: "blob" // important
            }).then(response => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                const name_file = `${this.form.persona.codigo_modular}-${this.form.anio}.pdf`;
                link.href = url;
                link.setAttribute("download", name_file); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
        },
        viewPDF(anio, persona_id) {
            let params = {
                anio: this.form.anio,
                persona_id: this.form.persona.id,
                certificado: this.form.certificado,
                ver: 0
            };
            const params_code = window.btoa(JSON.stringify(params));
            window.open(`/reporte/por-anio/${params_code}`, "_blank");
        },
        getName() {
            return `${this.form.persona.apellido_paterno} ${this.form.persona.apellido_materno}, ${this.form.persona.nombre} `;
        }
    }
};
</script>
