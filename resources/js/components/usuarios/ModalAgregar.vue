<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap class="blue-grey darken-2 white--text">
            <v-flex xs11>
              <span class="headline">Registrar usuario</span>
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
                    label="Nombre completo"
                    required
                    v-model="form.name"
                    :error-messages="errors.name"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="El DNI"
                    required
                    maxlength="8"
                    v-model="form.dni"
                    :error-messages="errors.dni"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Correo Electrónico"
                    required
                    v-model="form.email"
                    :error-messages="errors.email"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Contraseña"
                    required
                    v-model="form.password"
                    type="password"
                    :error-messages="errors.password"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <div class="body-2">Estado del usuario</div>
                  <v-radio-group v-model="form.estado" row :error-messages="errors.estado">
                    <v-radio label="Activo" value="activo" color="success"></v-radio>
                    <v-radio label="Inactivo" value="inactivo" color="error"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-layout wrap>
                <v-flex xs12>
                  <h4>Asignar Roles</h4>
                  <v-select
                    v-model="form.roles"
                    :items="items_roles"
                    item-text="name"
                    return-object
                    chips
                    label="Roles"
                    multiple
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <h4>Asignar Permisos Especiales</h4>
                  <v-select
                    v-model="form.permissions"
                    :items="items_permissions"
                    item-text="name"
                    return-object
                    chips
                    label="Permisos"
                    multiple
                  ></v-select>
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
      name: "",
      dni: "",
      email: "",
      password: "",
      estado: "activo",
      roles: [],
      permissions: []
    },
    errors: {},
    items_roles: [],
    items_permissions: []
  }),
  created() {
    this.getRoles();
    this.getPermissions();
  },
  methods: {
    Submit() {
      axios
        .post("/usuarios", this.form)
        .then(res => {
          this.$parent.getData();
          this.open = false;
          this.$swal(
            "Mensaje de operación",
            "Datos registrados correctamente.",
            "success"
          );
          this.resetInputs();
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    },
    getRoles() {
      axios
        .get("/getRoles")
        .then(res => {
          this.items_roles = res.data.roles;
        })
        .catch(err => console.log(err));
    },
    getPermissions() {
      axios
        .get("/getPermissions")
        .then(res => {
          this.items_permissions = res.data.permissions;
        })
        .catch(err => console.log(err));
    },
    resetInputs() {
      this.form.name = "";
      this.form.dni = "";
      this.form.email = "";
      this.form.password = "";
      this.form.estado = "activo";
      this.form.roles = [];
      this.form.permissions = [];
      this.errors = {};
    },
    show() {
      this.open = true;
    },
    close() {
      this.open = false;
      this.resetInputs();
    }
  }
};
</script>

