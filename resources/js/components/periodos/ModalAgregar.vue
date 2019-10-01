<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="500px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Registrar un nuevo año</span>
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
                    label="Ingrese el nuevo año"
                    required
                    v-model="form.anio"
                    :error-messages="errors.anio"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>Ingrese el campo obligatorio.</small>
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
    form: {
      anio: ""
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .post("/periodos", this.form)
        .then(res => {
          this.$parent.getYears();
          this.open = false;
          this.$swal(
            "Mensaje de operación",
            "Año registrado correctamente",
            "success"
          );
          this.resetInputs();
        })
        .catch(err => {
          this.errors = err.response.data.errors;
          if (err.response.status == 403) {
            this.$router.push("/403");
          }
        });
    },
    resetInputs() {
      this.form.anio = "";
      this.errors = {};
    },
    show() {
      this.open = true;
      this.resetInputs();
    }
  }
};
</script>
