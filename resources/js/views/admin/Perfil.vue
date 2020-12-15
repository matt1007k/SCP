<template>
    <v-container>
        <div class="rounded-xl">
            <v-img
                src="/img/local_drea.png"
                gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.8)"
                height="300px"
                class="rounded-xl"
            >
            </v-img>
        </div>
        <v-flex row class="mt-2">
            <v-col xs="12" md="4">
                <v-avatar
                    color="primary"
                    size="80"
                    style="margin-top: -80px; margin-left: 10%;"
                >
                    <span class="white--text headline">{{
                        getInitialName($auth.user.user.name)
                    }}</span>
                </v-avatar>
                <div class="px-6 text-center" style="margin-top: -20px">
                    <v-chip>{{ $auth.user.roles[0].name }}</v-chip>
                    <div class="headline font-weight-bold">
                        {{ $auth.user.user.name }}
                    </div>
                </div>
            </v-col>
            <v-spacer></v-spacer>
            <v-col xs="12" md="6" class="d-flex justify-end">
                <btn-secondary :onClick="modalPassword"
                    >Cambiar contraseña</btn-secondary
                >
                <v-btn
                    color="primary"
                    text
                    outlined
                    class="rounded-lg ml-3"
                    @click="modalEditar($auth.user.user)"
                >
                    <v-icon>$vuetify.icons.edit</v-icon>
                    <span>Editar perfil</span>
                </v-btn>
            </v-col>
        </v-flex>
        <v-divider></v-divider>
        <v-flex row class="mt-4">
            <v-col md="4">
                <div class="body-1 font-weight-bold mb-3">Datos personales</div>
                <v-list subheader two-line transparent class="rounded-xl">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon
                                :class="
                                    `${
                                        $vuetify.theme.dark
                                            ? 'blue darken-1'
                                            : 'grey lighten-1'
                                    }`
                                "
                            >
                                mdi-email
                            </v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title
                                >Correo Electrónico</v-list-item-title
                            >

                            <v-list-item-subtitle
                                v-text="$auth.user.user.email"
                            ></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon
                                :class="
                                    `${
                                        $vuetify.theme.dark
                                            ? 'blue darken-1'
                                            : 'grey lighten-1'
                                    }`
                                "
                            >
                                mdi-credit-card
                            </v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>DNI</v-list-item-title>

                            <v-list-item-subtitle
                                v-text="$auth.user.user.dni"
                            ></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-flex>
        <modal-editar ref="editarAuth"></modal-editar>
        <modal-password ref="passwordAuth"></modal-password>
    </v-container>
</template>

<script>
import ModalEditar from "../../components/perfil/ModalEditar";
import modalPassword from "../../components/perfil/ModalPassword";
export default {
    components: { ModalEditar, modalPassword },
    data() {
        return {
            my_total_constancias: 0
        };
    },
    methods: {
        getMyTotalConstancias() {
            axios
                .get("/get-my-total-constancias")
                .then(res => (this.my_total_constancias = res.data.total))
                .catch(err => console.log(err));
        },
        modalEditar(usuario) {
            this.$root.editarAuth.show();
            this.$root.editarAuth.form.id = usuario.id;
            this.$root.editarAuth.form.dni = usuario.dni;
            this.$root.editarAuth.form.name = usuario.name;
            this.$root.editarAuth.form.email = usuario.email;
        },
        modalPassword() {
            this.$root.passwordAuth.show();
            this.$root.passwordAuth.form.id = this.$auth.user.user.id;
        }
    },
    mounted() {
        this.$root.editarAuth = this.$refs.editarAuth;
        this.$root.passwordAuth = this.$refs.passwordAuth;
    },
    created() {
        document.title = "Perfil del usuario";
        this.getMyTotalConstancias();
    }
};
</script>
