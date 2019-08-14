<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <span class="headline">Perfil del usuario</span>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="/img/local_drea.png"
            gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.8)"
            height="300px"
          >
            <v-layout column fill-height>
              <v-card-title>
                <v-spacer></v-spacer>

                <v-tooltip bottom>
                  <v-btn
                    dark
                    icon
                    class="mr-3"
                    slot="activator"
                    @click="modalEditar($auth.user.user)"
                  >
                    <v-icon>$vuetify.icons.edit</v-icon>
                  </v-btn>
                  <span>Editar mis datos</span>
                </v-tooltip>
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-title class="white--text pl-2 pt-5">
                <div class="display-1 pl-2 pt-5">{{$auth.user.user.name}}</div>
              </v-card-title>
            </v-layout>
          </v-img>

          <v-list two-line>
            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">$vuetify.icons.card_id</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{$auth.user.user.dni}}</v-list-tile-title>
                <v-list-tile-sub-title>DNI</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="$auth.can('pagos.consultar') || $auth.isAdmin()">
                <h3>Constancias de pago entregadas</h3>
                <v-chip color="teal" text-color="white">
                  <h2>{{my_total_constancias}}</h2>
                  <v-icon right>$vuetify.icons.file</v-icon>
                </v-chip>
              </v-list-tile-action>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-action>
                <v-icon color="indigo">$vuetify.icons.email</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{$auth.user.user.email}}</v-list-tile-title>
                <v-list-tile-sub-title>Correo Electrónico</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <modal-editar ref="editarAuth"></modal-editar>
  </v-container>
</template>

<script>
import ModalEditar from "../../components/perfil/ModalEditar";
export default {
  components: { ModalEditar },
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
      console.log(usuario);
      this.$root.editarAuth.show();
      this.$root.editarAuth.form.id = usuario.id;
      this.$root.editarAuth.form.dni = usuario.dni;
      this.$root.editarAuth.form.name = usuario.name;
      this.$root.editarAuth.form.email = usuario.email;
    }
  },
  mounted() {
    this.$root.editarAuth = this.$refs.editarAuth;
  },
  created() {
    document.title = "Perfil del usuario";
    this.getMyTotalConstancias();
  }
};
</script>

