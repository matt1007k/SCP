<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Registrar un Haber</span>
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
                <v-flex xs12>
                  <v-text-field
                    label="Nombre"
                    required
                    v-model="form.nombre"
                    :error-messages="errors.nombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Descripción"
                    required
                    v-model="form.descripcion"
                    :error-messages="errors.descripcion"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Descripción simple"
                    required
                    v-model="form.descripcion_simple"
                    :error-messages="errors.descripcion_simple"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <div class="body-2">Si es asegurable</div>
                  <v-radio-group
                    v-model="form.es_imponible"
                    row
                    :error-messages="errors.es_imponible"
                  >
                    <v-radio label="No" value="0" color="error"></v-radio>
                    <v-radio label="Si" value="1" color="success"></v-radio>
                  </v-radio-group>
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
  data: () => ({
    open: false,
    form: {
      nombre: "",
      tipo: "haber",
      descripcion: "",
      descripcion_simple: "",
      es_imponible: "0"
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .post("/haberes", this.form)
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
      this.form.tipo = "haber";
      this.form.descripcion = "";
      this.form.descripcion_simple = "";
      this.form.es_imponible = "0";
      this.errors = {};
    },
    show() {
      this.open = true;
      this.resetInputs();
    },
    close() {
      this.open = false;
      this.resetInputs();
    }
  }
};
</script>
