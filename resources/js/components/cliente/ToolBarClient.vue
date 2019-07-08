<template>
  <v-toolbar app flat>
    <v-toolbar-title>Consulta de Boletas de Pago</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn icon>
      <v-badge color="accent" rigth overlap>
        <template v-slot:badge>0</template>
        <v-icon>$vuetify.icons.bell</v-icon>
      </v-badge>
    </v-btn>-->
    <v-btn color="secondary" @click="LogOut">
      <v-icon>$vuetify.icons.exit</v-icon>
      <span>Salir</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    LogOut() {
      axios
        .post("/logout")
        .then(res => {
          location.href = "/users/sign_in";
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
