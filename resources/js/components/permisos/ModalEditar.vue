<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" persistent small width="800px">
            <card>
                <form @submit.prevent="Submit">
                    <modal-header title="Editar permiso">
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
                                        label="El Identificador"
                                        required
                                        filled
                                        shaped
                                        v-model="form.identificador"
                                        :error-messages="errors.identificador"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Nombre del rol"
                                        required
                                        filled
                                        shaped
                                        v-model="form.nombre"
                                        :error-messages="errors.nombre"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-textarea
                                        label="Descripción"
                                        required
                                        filled
                                        shaped
                                        v-model="form.descripcion"
                                        :error-messages="errors.descripcion"
                                    ></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <small>Ingrese los campos obligatorios.</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <btn-secondary :onClick="close">Cancelar</btn-secondary>
                        <v-btn class="rounded-lg" color="primary" type="submit"
                            >Editar</v-btn
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
            nombre: "",
            identificador: "",
            descripcion: ""
        },
        errors: {}
    }),
    methods: {
        Submit() {
            axios
                .put(`/permisos/${this.form.id}`, this.form)
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
                    if (err.response.status == 403) {
                        this.$router.push("/403");
                    }
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
    }
};
</script>
