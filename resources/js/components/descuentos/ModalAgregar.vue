<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" persistent small width="800px">
            <card>
                <form @submit.prevent="Submit">
                    <modal-header title="Registrar un descuento">
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
                                <v-flex xs12>
                                    <v-text-field
                                        label="Nombre"
                                        required
                                        filled
                                        shaped
                                        v-model="form.nombre"
                                        :error-messages="errors.nombre"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Descripción"
                                        required
                                        filled
                                        shaped
                                        v-model="form.descripcion"
                                        :error-messages="errors.descripcion"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Descripción simple"
                                        required
                                        filled
                                        shaped
                                        v-model="form.descripcion_simple"
                                        :error-messages="
                                            errors.descripcion_simple
                                        "
                                    ></v-text-field>
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
    data: () => ({
        open: false,
        form: {
            nombre: "",
            tipo: "descuento",
            descripcion: "",
            descripcion_simple: ""
        },
        errors: {}
    }),
    methods: {
        Submit() {
            axios
                .post("/descuentos", this.form)
                .then(res => {
                    this.$parent.getData();
                    this.open = false;
                    this.$swal(
                        "Mensaje de operación",
                        "Datos registrados correctamente",
                        "success"
                    );
                    this.resetInputs();
                })
                .catch(err => {
                    this.errors = err.response.data.errors;
                    if (err.response.status == 403) {
                        this.$router.push("/403");
                    }
                });
        },
        resetInputs() {
            this.form.nombre = "";
            this.form.tipo = "descuento";
            this.form.descripcion = "";
            this.form.descripcion_simple = "";
            this.errors = {};
        },
        show() {
            this.open = true;
            this.resetInputs();
        },
        close() {
            this.resetInputs();
            this.open = false;
        }
    }
};
</script>
