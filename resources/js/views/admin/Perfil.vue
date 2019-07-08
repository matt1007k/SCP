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

                <v-btn dark icon class="mr-3">
                  <v-icon>$vuetify.icons.edit</v-icon>
                </v-btn>
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">{{$auth.user.user.name}}</div>
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
  </v-container>
</template>

<script>
export default {
  created() {
    document.title = "Perfil del usuario";
  }
};
</script>

