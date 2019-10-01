<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Editar persona</span>
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
                    label="Nombre"
                    required
                    v-model="form.nombre"
                    :error-messages="errors.nombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Apellido Paterno"
                    required
                    v-model="form.apellido_paterno"
                    :error-messages="errors.apellido_paterno"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Apellido Materno"
                    required
                    v-model="form.apellido_materno"
                    :error-messages="errors.apellido_materno"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="El DNI"
                    required
                    v-model="form.dni"
                    maxlength="8"
                    :error-messages="errors.dni"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Código Modular"
                    required
                    v-model="getCodigoModular"
                    maxlength="10"
                    :error-messages="errors.codigo_modular"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Cargo"
                    required
                    v-model="form.cargo"
                    :error-messages="errors.cargo"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-radio-group v-model="form.estado" row :error-messages="errors.estado">
                    <v-radio label="Activo" value="activo" color="success"></v-radio>
                    <v-radio label="Sobreviviente" value="sobreviviente" color="info"></v-radio>
                    <v-radio label="Cesante" value="cesante" color="error"></v-radio>
                  </v-radio-group>
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
  props: {
    value: Boolean
  },
  data: () => ({
    open: false,
    form: {
      id: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      dni: "",
      codigo_modular: "10",
      cargo: "",
      estado: "activo"
    },
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .put(`/personas/${this.form.id}`, {
          params: { persona_id: this.form.id }
        })
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
        });
    },
    show() {
      this.open = true;
      this.errors = {};
    }
  },
  computed: {
    getCodigoModular() {
      return (this.form.codigo_modular = "10" + this.form.dni);
    }
  }
};
</script>

