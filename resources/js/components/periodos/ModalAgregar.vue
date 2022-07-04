<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" persistent small width="500px">
            <card>
                <form @submit.prevent="Submit">
                    <modal-header title="Registrar nuevo año">
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
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Ingrese el nuevo año"
                                        required
                                        filled
                                        shaped
                                        v-model="form.anio"
                                        :error-messages="errors.anio"
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>Ingrese el campo obligatorio.</small>
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
            anio: ""
        },
        errors: {}
    }),
    methods: {
        Submit() {
            axios
                .post("/periodos", this.form)
                .then(res => {
                    this.$parent.getYears();
                    this.open = false;
                    this.$swal(
                        "Mensaje de operación",
                        "Año registrado correctamente",
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
            this.form.anio = "";
            this.errors = {};
        },
        show() {
            this.open = true;
            this.resetInputs();
        },
        close() {
            this.open = false;
            this.resetInputs();
        }
    }
};
</script>
