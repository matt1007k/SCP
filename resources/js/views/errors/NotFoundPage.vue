<template>
  <v-layout
    row
    wrap
    fill-height
    style="background-image: url(https://cdn.vuetifyjs.com/images/parallax/material.jpg)"
  >
    <v-flex xs12 class="d-flex align-items-center">
      <v-container class="text-xs-center">
        <h1 class="display-4 error--text">404</h1>
        <div class="mt-2 mb-2 title">Página no encontrada</div>
        <v-btn color="info" @click="$router.push('/admin')">Regresar al admin</v-btn>
      </v-container>
    </v-flex>
    <!-- <v-flex
      class="only-sm"
      xs12
      sm4
      md7
      fill-height
      
    ></v-flex>-->
  </v-layout>
</template>

<script>
export default {};
</script>
