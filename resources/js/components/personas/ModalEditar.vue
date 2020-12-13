<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" persistent small width="800px">
            <card>
                <form @submit.prevent="Submit">
                    <modal-header title="Editar persona">
                        <template v-slot:close>
                            <btn-secondary
                                :onClick="close"
                                fab
                                class="rounded-circle"
                                small
                                color="primary"
                            >
                                <v-icon>$vuetify.icons.close</v-icon>
                            </btn-secondary>
                        </template>
                    </modal-header>
                    <v-card-text>
                        <v-container grid-list-lg>
                            <v-layout wrap>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Nombre"
                                        required
                                        filled
                                        shaped
                                        v-model="form.nombre"
                                        :error-messages="errors.nombre"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Apellido Paterno"
                                        required
                                        filled
                                        shaped
                                        v-model="form.apellido_paterno"
                                        :error-messages="
                                            errors.apellido_paterno
                                        "
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Apellido Materno"
                                        required
                                        filled
                                        shaped
                                        v-model="form.apellido_materno"
                                        :error-messages="
                                            errors.apellido_materno
                                        "
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="El DNI"
                                        required
                                        filled
                                        shaped
                                        v-model="form.dni"
                                        maxlength="8"
                                        :error-messages="errors.dni"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Código Modular"
                                        required
                                        filled
                                        shaped
                                        v-model="getCodigoModular"
                                        maxlength="10"
                                        :error-messages="errors.codigo_modular"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Cargo"
                                        required
                                        filled
                                        shaped
                                        v-model="form.cargo"
                                        :error-messages="errors.cargo"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <div class="body-2 font-weight-bold">
                                        Estado
                                    </div>
                                    <v-radio-group
                                        v-model="form.estado"
                                        row
                                        :error-messages="errors.estado"
                                    >
                                        <v-radio
                                            label="Activo"
                                            value="activo"
                                            color="success"
                                        ></v-radio>
                                        <v-radio
                                            label="Sobreviviente"
                                            value="sobreviviente"
                                            color="info"
                                        ></v-radio>
                                        <v-radio
                                            label="Cesante"
                                            value="cesante"
                                            color="error"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>Ingrese los campos obligatorios.</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <btn-secondary :onClick="close">Cancelar</btn-secondary>
                        <v-btn class="rounded-lg" color="primary" type="submit"
                            >Guardar</v-btn
                        >
                    </v-card-actions>
                </form>
            </card>
        </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props: {
        value: Boolean
    },
    data: () => ({
        open: false,
        form: {
            id: "",
            nombre: "",
            apellido_paterno: "",
            apellido_materno: "",
            dni: "",
            codigo_modular: "10",
            cargo: "",
            estado: "activo"
        },
        errors: {}
    }),
    methods: {
        Submit() {
            axios
                .put(`/personas/${this.form.id}`, {
                    params: { persona_id: this.form.id }
                })
                .then(res => {
                    this.$parent.getData();
                    this.open = false;
                    this.$swal(
                        "Mensaje de operación",
                        "Datos editados correctamente",
                        "success"
                    );
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                });
        },
        show() {
            this.open = true;
            this.errors = {};
        },
        close() {
            this.open = false;
            this.errors = {};
        }
    },
    computed: {
        getCodigoModular() {
            return (this.form.codigo_modular = "10" + this.form.dni);
        }
    }
};
</script>
