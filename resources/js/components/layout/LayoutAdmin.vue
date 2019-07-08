<template>
  <v-app>
    <snackbar ref="snackbar"></snackbar>
    <sidebar-admin-left :toggle="drawer"></sidebar-admin-left>
    <v-toolbar dark color="info" app>
      <v-toolbar-side-icon @click.stop="OpenSidebar"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">SISTEMA DE CONSTANCIA DE PAGOS</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="snackbar = true">
        <v-icon>$vuetify.icons.search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-badge color="accent" rigth overlap>
          <template v-slot:badge>0</template>
          <v-icon>$vuetify.icons.bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn flat @click="LogOut">
        <v-icon>$vuetify.icons.exit</v-icon>
        <span>Salir</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <transition name="slide-fade">
        <router-view :key="$route.fullPath"/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import SidebarAdminLeft from "./SidebarAdminLeft";
import Snackbar from "../messages/Snackbar";
export default {
  components: { SidebarAdminLeft, Snackbar },
  name: "LayoutAdmin",
  data: () => ({
    drawer: true
  }),
  methods: {
    OpenSidebar() {
      // this.$children[0].$children[0].drawer = !this.$children[0].$children[0]
      // .drawer;
      // console.log(event.target);

      this.drawer = !this.drawer;
    },
    goTo(url) {
      this.$router.push(url);
    },
    LogOut() {
      axios
        .post("/logout")
        .then(res => {
          location.href = "/";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$root.$snackbar = this.$refs.snackbar;
  }
};
</script>

<style>
.v-list__tile--active {
  border-right: 6px solid #01579b;
}
</style>
