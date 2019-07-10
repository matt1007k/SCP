<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 class="d-flex align-items-center">
      <v-container class="text-xs-center">
        <h1 class="mdc-fz-2 info--text no-margin">403</h1>
        <div class="display-2 info--text mb-3">Sin Autorización</div>
        <p class="text-muted m-t-30 m-b-30 info--text">No tienes permisos para esta sección.</p>
        <v-btn color="primary" @click="$router.push('/admin')">Regresar al admin</v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {};
</script>
