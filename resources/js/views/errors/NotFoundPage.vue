<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 class="d-flex align-items-center">
      <v-container class="text-xs-center">
        <h1 class="mdc-fz-2 info--text no-margin">404</h1>
        <div class="display-2 info--text mb-3">Página no encontrada</div>
        <v-btn color="primary" @click="$router.push('/admin')">Regresar al admin</v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>
