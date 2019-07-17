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
    <v-list dense>
      <template v-for="(item, index) in itemsMenu">
        <template v-if="item.group">
          <v-list-group
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            :prepend-icon="item.icon"
            :value="subIsActive([item.url])"
            :key="index"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile>
            </template>

            <template v-for="(submenu, i) in item.submenu">
              <v-list-tile
                :key="i"
                router
                :to="submenu.url"
                v-if="$auth.can(submenu.permission) || $auth.isAdmin()"
              >
                <v-list-tile-action></v-list-tile-action>
                <v-list-tile-title v-text="submenu.title"></v-list-tile-title>
              </v-list-tile>
            </template>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-tile
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            router
            :to="item.url"
            :exact="item.exact"
            active-exact-class="primary"
            :key="index"
          >
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
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

