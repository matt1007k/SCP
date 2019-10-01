<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Editar permiso</span>
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
                    label="Nombre del rol"
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
      nombre: "",
      identificador: "",
      descripcion: ""
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .put(`/permisos/${this.form.id}`, this.form)
        .then(res => {
          this.$parent.getData();
          this.open = false;
          this.$swal(
            "Mensaje de operación",
            "Datos editados correctamente",
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
