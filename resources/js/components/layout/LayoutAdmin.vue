<template>
  <v-app>
    <snackbar ref="snackbar"></snackbar>
    <sidebar-admin-left :toggle="drawer"></sidebar-admin-left>
    <v-toolbar dark color="info" app>
      <v-toolbar-side-icon @click.stop="OpenSidebar"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">SISTEMA DE CONSTANCIA DE PAGOS</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon @click="snackbar = true">
        <v-icon>$vuetify.icons.search</v-icon>
      </v-btn>-->

      <v-menu
        offset-y
        origin="center center"
        class="elelvation-1"
        :nudge-bottom="0"
        transition="scale-transition"
        bottom
      >
        <v-btn @click="markAsRead" icon flat slot="activator">
          <v-badge color="indigo" rigth overlap>
            <template v-slot:badge>{{unreadNotifications.length}}</template>
            <v-icon>$vuetify.icons.bell</v-icon>
          </v-badge>
        </v-btn>
        <v-list style="max-height: 400px" class="scroll-y">
          <v-subheader class="indigo">
            <h2 class="text-white">Notificaciones</h2>
          </v-subheader>
          <template v-if="unreadNotifications.length > 0">
            <v-list-tile
              :class="{'white': notification.read_at == null}"
              @click="markAsRead"
              v-for="notification in unreadNotifications"
              :key="notification.id"
              style="padding: 8px 5px"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{notification.data.message}}</v-list-tile-title>
                <v-list-tile-sub-title>{{getFormaterDate(notification.created_at)}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-else>
            <v-list-tile style="padding: 8px 5px">
              <v-list-tile-content>
                <v-list-tile-sub-title>No tienes notificaciones</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-menu>

      <v-btn flat @click="LogOut">
        <v-icon>$vuetify.icons.exit</v-icon>
        <span>Salir</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <transition name="slide-fade">
        <router-view :key="$route.fullPath" />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import moment from "moment";
import SidebarAdminLeft from "./SidebarAdminLeft";
import Snackbar from "../messages/Snackbar";
export default {
  components: { SidebarAdminLeft, Snackbar },
  name: "LayoutAdmin",
  data: () => ({
    drawer: true,
    unreadNotifications: []
  }),
  methods: {
    OpenSidebar() {
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
    },
    getUnReadNotifications() {
      axios
        .get("/unread-notifications")
        .then(res => (this.unreadNotifications = res.data[0]))
        .catch(error => console.log(error));
    },
    markAsRead() {
      axios.get("/mark-all-read").then(res => console.log(res));
    },
    getFormaterDate(date) {
      moment.locale("es");
      return moment(date).fromNow();
    }
  },
  mounted() {
    this.$root.$snackbar = this.$refs.snackbar;
    this.getUnReadNotifications();
  }
  // sockets: {
  //   connect() {
  //     console.log("Socket connect");
  //   },
  //   message(value) {
  //     this.getUnReadNotifications();
  //   }
  // }
};
</script>

<style>
.v-list__tile--active {
  border-right: 6px solid #01579b;
}
</style>
