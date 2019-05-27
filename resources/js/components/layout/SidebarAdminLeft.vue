<template>
  <v-navigation-drawer
    mobile-break-point="960"
    :value="toggle"
    @input="$emit('input', $event)"
    fixed
    app
  >
    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-layout pa-2 column fill-height class="lightbox white--text">
        <v-spacer></v-spacer>
        <v-flex shrink>
          <div class="subheading">Jonathan Lee</div>
          <div class="body-1">heyfromjonathan@gmail.com</div>
        </v-flex>
      </v-layout>
    </v-img>

    <v-list v-for="(item, index) in itemsMenu" :key="index">
      <v-list-tile
        v-if="!item.group"
        router
        :to="item.url"
        :exact="item.exact"
        active-exact-class="primary"
      >
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{item.title}}</v-list-tile-title>
      </v-list-tile>

      <v-list-group v-if="item.group" :prepend-icon="item.icon" :value="subIsActive([item.url])">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile v-for="(submenu, i) in item.submenu" :key="i" router :to="submenu.url">
          <v-list-tile-action></v-list-tile-action>
          <v-list-tile-title v-text="submenu.title"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>
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
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    }
  }
};
</script>

