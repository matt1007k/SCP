<template>
  <v-layout
    row
    wrap
    fill-height
    style="background-image: url(https://cdn.vuetifyjs.com/images/parallax/material.jpg)"
  >
    <v-flex xs12 class="d-flex align-items-center">
      <v-container class="text-xs-center">
        <h1 class="display-4 error--text">403</h1>
        <div class="mt-2 mb-2 title">Sin Autorización</div>
        <p class="text-muted m-t-30 m-b-30">No tienes permisos para esta sección.</p>
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
