<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" persistent small width="800px">
            <card>
                <form @submit.prevent="Submit">
                    <modal-header title="Editar usuario">
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
                                        label="Nombre completo"
                                        required
                                        v-model="form.name"
                                        :error-messages="errors.name"
                                        filled
                                        shaped
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="El DNI"
                                        required
                                        maxlength="8"
                                        v-model="form.dni"
                                        :error-messages="errors.dni"
                                        filled
                                        shaped
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-text-field
                                        label="Correo Electrónico"
                                        required
                                        type="email"
                                        v-model="form.email"
                                        :error-messages="errors.email"
                                        filled
                                        shaped
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-btn color="primary" @click="showPassword"
                                        >Cambiar Contraseña</v-btn
                                    >
                                    <div :class="{ 'd-none': hidePassword }">
                                        <v-text-field
                                            label="Contraseña"
                                            v-model="form.password"
                                            type="password"
                                            :error-messages="errors.password"
                                            filled
                                            shaped
                                        ></v-text-field>
                                    </div>
                                </v-flex>

                                <v-flex xs12>
                                    <div class="body-2">Estado del usuario</div>
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
                                            label="Inactivo"
                                            value="inactivo"
                                            color="error"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <h4>Asignar Roles</h4>
                                    <v-select
                                        v-model="form.roles"
                                        :items="items_roles"
                                        item-text="name"
                                        return-object
                                        chips
                                        label="Roles"
                                        multiple
                                        shaped
                                        filled
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12>
                                    <h4>Asignar Permisos</h4>
                                    <v-select
                                        v-model="form.permissions"
                                        :items="items_permissions"
                                        item-text="name"
                                        return-object
                                        chips
                                        label="Permisos"
                                        multiple
                                        shaped
                                        filled
                                    ></v-select>
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
        hidePassword: true,
        form: {
            id: "",
            name: "",
            dni: "",
            email: "",
            password: "",
            estado: "activo",
            roles: [],
            permissions: []
        },
        errors: {},
        items_roles: [],
        items_permissions: []
    }),
    created() {
        this.getRoles();
        this.getPermissions();
    },
    methods: {
        Submit() {
            axios
                .put(`/usuarios/${this.form.id}`, this.form)
                .then(res => {
                    this.$parent.getData();
                    this.close();
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
        getRoles() {
            axios
                .get("/getRoles")
                .then(res => {
                    this.items_roles = res.data.roles;
                })
                .catch(err => console.log(err));
        },
        getPermissions() {
            axios
                .get("/getPermissions")
                .then(res => {
                    this.items_permissions = res.data.permissions;
                })
                .catch(err => console.log(err));
        },
        showPassword() {
            this.hidePassword = !this.hidePassword;
        },
        close() {
            this.open = false;
        }
    }
};
</script>
