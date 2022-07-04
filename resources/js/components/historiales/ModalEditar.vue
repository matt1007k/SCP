<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Editar el certificado</span>
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
                    label="Núm. de Certificado"
                    required
                    v-model="form.certificado"
                    :error-messages="errors.certificado"
                  ></v-text-field>
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
    form: {
      id: "",
      certificado: ""
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .put(`/historiales/${this.form.id}`, this.form)
        .then(res => {
          this.$parent.getData();
          this.open = false;
          this.$swal(
            "Mensaje de operación",
            "El núm. de certificado se edito correctamente",
            "success"
          );
        })
        .catch(err => {
          this.errors = err.response.data.errors;
          if (err.response.status == 403) {
            this.$router.push("/403");
          }
        });
    },
    show() {
      this.open = true;
      this.errors = {};
    }
  }
};
</script>
