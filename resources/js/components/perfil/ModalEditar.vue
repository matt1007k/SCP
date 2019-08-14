<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="500px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Editar mis datos</span>
            </v-flex>
            <v-flex xs1 class="d-flex justify-end">
              <v-btn color="error" @click="open = false">
                <v-icon>$vuetify.icons.close</v-icon>
              </v-btn>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Nombre completo"
                    required
                    v-model="form.name"
                    :error-messages="errors.name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="El DNI"
                    required
                    maxlength="8"
                    v-model="form.dni"
                    :error-messages="errors.dni"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Correo Electrónico"
                    required
                    type="email"
                    v-model="form.email"
                    :error-messages="errors.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-btn color="primary" @click="showPassword">Cambiar Contraseña</v-btn>
                  <div :class="{'d-none': hidePassword}">
                    <v-text-field
                      label="Contraseña"
                      v-model="form.password"
                      type="password"
                      :error-messages="errors.password"
                    ></v-text-field>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="open = false">Cancelar</v-btn>
            <v-btn color="success" type="submit">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    open: false,
    hidePassword: true,
    form: {
      id: "",
      name: "",
      dni: "",
      email: "",
      password: ""
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .put(`/usuario/${this.form.id}`, this.form)
        .then(res => {
          this.resetInput();
          this.$swal(
            "Mensaje de operación",
            "Datos editados correctamente.",
            "success"
          );
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    },
    show() {
      this.open = true;
      this.errors = {};
    },
    showPassword() {
      this.hidePassword = !this.hidePassword;
    },
    resetInput() {
      this.open = false;
      this.hidePassword = true;
      this.form.password = "";
    }
  }
};
</script>

