<template>
  <div>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" top right>
      {{ text }}
      <v-btn dark flat @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    timeout: 6000,
    text: "Hello, I'm a snackbardd",
    color: "success"
  }),
  methods: {
    show(message, options) {
      this.text = message;
      this.snackbar = true;
      if (options) {
        this.color = options.color;
      }
    },
    hide() {
      this.snackbar = false;
    }
  }
};
</script>

<style>
</style>
