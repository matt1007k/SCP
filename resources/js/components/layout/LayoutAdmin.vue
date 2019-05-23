<template>
  <v-app>
    <v-snackbar model="snackbar" color="success" :timeout="timeout" bottom>
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <sidebar-admin-left :toggle="drawer"></sidebar-admin-left>
    <v-toolbar dark color="primary" app>
      <v-toolbar-side-icon @click.stop="OpenSidebar"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">Admin</v-toolbar-title>

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
      <transition name="router-animate">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import SidebarAdminLeft from "./SidebarAdminLeft";
export default {
  components: { SidebarAdminLeft },
  name: "LayoutAdmin",
  data: () => ({
    drawer: true,
    snackbar: false,
    timeout: 6000,
    text: "Hello, I'm a snackbar"
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
  }
};
</script>

<style>
.v-list__tile--active {
  border-right: 6px solid #3f51b5;
}
</style>
