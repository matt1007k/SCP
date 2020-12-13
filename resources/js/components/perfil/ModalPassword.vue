<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" persistent small width="500px">
            <card>
                <form @submit.prevent="Submit">
                    <modal-header title="Cambiar contraseña">
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
                                        label="Nueva contraseña"
                                        filled
                                        shaped
                                        required
                                        type="password"
                                        v-model="form.password"
                                        :error-messages="errors.password"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        label="Repetir contraseña"
                                        filled
                                        shaped
                                        type="password"
                                        v-model="form.password_confirmation"
                                        :error-messages="
                                            errors.password_confirmation
                                        "
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <btn-secondary :onClick="close">Cancelar</btn-secondary>
                        <v-btn class="rounded-lg" color="primary" type="submit"
                            >Cambiar</v-btn
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
            id: "",
            password: "",
            password_confirmation: ""
        },
        errors: {}
    }),
    methods: {
        Submit() {
            axios
                .put(`/password-reset/${this.form.id}`, this.form)
                .then(res => {
                    this.resetInput();
                    this.$swal(
                        "Mensaje de operación",
                        "Datos editados correctamente.",
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
        },
        resetInput() {
            this.open = false;
            this.form.new_password = "";
            this.form.password = "";
        }
    }
};
</script>
