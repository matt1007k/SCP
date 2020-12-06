<template>
  <v-app>
    <!-- <snackbar ref="snackbar"></snackbar> -->
    <sidebar-admin-left :toggle="drawer"></sidebar-admin-left>
    <v-app-bar  color="dark" elevation="0" app>
      <v-app-bar-nav-icon @click.stop="OpenSidebar"></v-app-bar-nav-icon>


      <v-spacer></v-spacer>

      <!-- <v-btn icon @click="snackbar = true">
        <v-icon>$vuetify.icons.search</v-icon>
      </v-btn>-->
      <span class="d-flex align-center">
      <v-menu
        offset-y
        origin="center center"
        class="elevation-1"
        :nudge-bottom="0"
        transition="scale-transition"
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn @click="markAsRead" icon v-on="on">
            <v-badge color="indigo" rigth overlap>
              <template v-slot:badge>{{unreadNotifications.length}}</template>
              <v-icon>$vuetify.icons.bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list style="max-height: 400px" class="scroll-y" dark>
          <v-subheader class="indigo">
            <h2 class="text-white">Notificaciones</h2>
          </v-subheader>
          <template v-if="unreadNotifications.length > 0">
            <v-list-item
              :class="{'white': notification.read_at == null}"
              @click="markAsRead"
              v-for="notification in unreadNotifications"
              :key="notification.id"
              style="padding: 8px 5px"
            >
              <v-list-item-content>
                <v-list-item-title>{{notification.data.message}}</v-list-item-title>
                <v-list-item-sub-title>{{getFormaterDate(notification.created_at)}}</v-list-item-sub-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item style="padding: 8px 5px">
              <v-list-item-content class="px-3">
                <v-list-item-sub-title>No tienes notificaciones</v-list-item-sub-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>

      <!-- <v-btn outlined x-small @click="LogOut" class="ml-3">
        <v-icon>$vuetify.icons.exit</v-icon>
        <span>Salir</span>
      </v-btn> -->
        <v-menu 
        offset-y 
        origin="center center"
        class="elevation-1"
        :nudge-bottom="0"
        transition="scale-transition"
        bottom>
          <template v-slot:activator="{ on }">
            <v-list-item two-line  v-on="on">
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ $auth.user.user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ $auth.user.user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              @click="item.title == 'Salir' ? LogOut() : goTo(item.url)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </span>
    </v-app-bar>

    <v-main :class="`${!$vuetify.theme.dark ? 'grey lighten-4' : ''}`">
      <v-container fluid>
        <transition name="slide-fade">
          <router-view :key="$route.fullPath" />
        </transition>
      </v-container>
    </v-main>
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
    unreadNotifications: [],
    menuItems: [
      {
        title: 'Perfil',
        url: '/admin/perfil',
        icon: 'mdi-account'
      },
      {
        title: 'Salir',
        url: '/outline',
        icon: 'mdi-exit-to-app'
      },
    ]
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
/* .v-list__tile--active {
  border-right: 6px solid #01579b;
} */
</style>
