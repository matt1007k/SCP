<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Registrar permiso</span>
            </v-flex>
            <v-flex xs1 class="d-flex justify-end">
              <v-btn color="error" @click="close()">
                <v-icon>$vuetify.icons.close</v-icon>
              </v-btn>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="El Identificador"
                    required
                    v-model="form.identificador"
                    :error-messages="errors.identificador"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Nombre del permiso"
                    required
                    v-model="form.nombre"
                    :error-messages="errors.nombre"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-textarea
                    label="Descripción"
                    required
                    v-model="form.descripcion"
                    :error-messages="errors.descripcion"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <small>Ingrese los campos obligatorios.</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="close()">Cancelar</v-btn>
            <v-btn color="success" type="submit">Guardar</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  data: () => ({
    open: false,
    form: {
      nombre: "",
      identificador: "",
      descripcion: ""
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .post("/permisos", this.form)
        .then(res => {
          this.$parent.getData();
          this.open = false;
          this.$swal(
            "Mensaje de operación",
            "Datos registrados correctamente",
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
      this.form.nombre = "";
      this.form.identificador = "";
      this.form.descripcion = "";
      this.errors = {};
    },
    show() {
      this.open = true;
    },
    close() {
      this.resetInputs();
      this.open = false;
    }
  }
};
</script>

<style>
</style>
