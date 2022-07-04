<template>
  <v-layout row wrap fill-height>
    <v-flex xs12 sm8 md5 class="d-flex">
      <v-container>
        <h1 class="text-xs-center indigo--text">Sistema de Constancia de Pago</h1>
        <v-card>
          <v-container>
            <div class="mt-4 mb-2 title text-xs-center">Iniciar Sesion</div>
            <p class="body-1">Ingresa al sistema para realizar cualquier operacion.</p>
            <form @submit.prevent="Submit">
              <v-text-field
                label="Ingrese su DNI"
                v-model="form.dni"
                :error-messages="errors.dni"
                maxlength="8"
                class="mb-2"
              ></v-text-field>
              <v-text-field
                label="Ingrese su constrasena"
                v-model="form.password"
                :error-messages="errors.password"
                type="password"
              ></v-text-field>
              <v-flex xs12 justify-space-between class="mt-4">
                <v-btn type="submit" color="success" block>Ingresar</v-btn>
              </v-flex>
            </form>
          </v-container>
        </v-card>
      </v-container>
    </v-flex>
    <v-flex
      class="only-sm"
      xs12
      sm4
      md7
      fill-height
      style="background-image: url(https://cdn.vuetifyjs.com/images/parallax/material.jpg)"
    ></v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    form: {
      dni: "",
      password: ""
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .post("/login", this.form)
        .then(res => {
          this.$router.push("/admin");
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>
