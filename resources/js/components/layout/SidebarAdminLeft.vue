<template>
  <v-navigation-drawer
    mobile-break-point="960"
    :value="toggle"
    @input="$emit('input', $event)"
    fixed
    app
  >
    <v-img
      src="/img/local_drea.png"
      gradient="to top right, rgba(0,0,0,.5), rgba(25,32,72,.7)"
      style="height: 180px"
    >
      <v-layout pa-2 fill-height column class="lightbox white--text">
        <v-spacer></v-spacer>
        <v-flex shrink pl-2>
          <div class="subheading">{{$auth.user.user.name}}</div>
          <div class="body-1">{{$auth.user.user.dni}}</div>
          <v-btn color="info" style="margin-left: 0;" @click="goToPerfil()">
            <v-icon>$vuetify.icons.user</v-icon>Perfil
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>

    <v-list dense shaped>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Application</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-subheader>MANTENIMIENTO</v-subheader>
      <template v-for="(item, index) in itemsMenu">
        <template v-if="item.group">
          <v-list-group
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            :prepend-icon="item.icon"
            :value="subIsActive([item.url])"
            :key="index"
          >
            <template v-slot:activator>
              <!-- <v-list-item> -->
              <v-list-item-title>{{item.title}}</v-list-item-title>
              <!-- </v-list-item> -->
            </template>

            <template v-for="(submenu, i) in item.submenu">
              <v-list-item
                :key="i"
                router
                :to="submenu.url"
                v-if="$auth.can(submenu.permission) || $auth.isAdmin()"
              >
                <v-list-item-action></v-list-item-action>
                <v-list-item-title v-text="submenu.title"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            router
            :to="item.url"
            :exact="item.exact"
            active-exact-class="primary"
            :key="index"
            :prepend-icon="item.icon"
          >
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { listItemsSidebar } from "../../services/listItemsSidebar";
export default {
  props: {
    toggle: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    drawer: true,
    itemsMenu: listItemsSidebar
  }),
  methods: {
    goTo(url) {
      this.$router.push(url);
    },
    goToPerfil() {
      this.$router.push("/admin/perfil");
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    }
  }
};
</script>

