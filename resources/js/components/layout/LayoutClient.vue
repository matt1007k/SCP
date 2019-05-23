<template>
  <v-app>
    <!-- <v-toolbar dark color="secondary">
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">Client</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>$vuetify.icons.search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>$vuetify.icons.apps</v-icon>
      </v-btn>
    </v-toolbar>-->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "LayoutClient"
};
</script>

<style>
</style>
