<template>
  <v-navigation-drawer
    mobile-break-point="960"
    :value="toggle"
    @input="$emit('input', $event)"
    fixed
    app
  >
    <v-container>
      <img src="/img/logo-scp.png" />
    </v-container>
    <v-list dense>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-container fluid>
          <v-spacer></v-spacer>
          <v-btn color="info" style="margin-left: 0;" @click="goToPerfil()">
            <v-icon>$vuetify.icons.user</v-icon>Perfil
          </v-btn>
      </v-container>

      <v-divider></v-divider>

      <v-subheader>MANTENIMIENTO</v-subheader>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in itemsMenu"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-for="(item, index) in itemsMenu">
        <template v-if="item.group">
          <v-list-group
            v-if="$auth.can(item.permission) || $auth.isAdmin()"
            :prepend-icon="item.icon"
            :value="subIsActive([item.url])"
            :key="index"
            color="primary"
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
                link
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
    itemsMenu: listItemsSidebar,
    selectedItem: 0,
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

