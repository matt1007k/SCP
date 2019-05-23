<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" persistent small width="800px">
      <v-card>
        <form @submit.prevent="Submit">
          <v-card-title wrap>
            <v-flex xs11>
              <span class="headline">Registrar un Haber o Descuento</span>
            </v-flex>
            <v-flex xs1 class="d-flex justify-end">
              <v-btn flat color="error" @click="open = false">
                <v-icon>$vuetify.icons.close</v-icon>
              </v-btn>
            </v-flex>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field label="Código" required disabled v-model="form.codigo"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Nombre"
                    required
                    v-model="form.nombre"
                    :error-messages="errors.nombre"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-combobox v-model="form.tipo" :items="items" chips label="Seleccionar tipo">
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        :selected="data.selected"
                        :disabled="data.disabled"
                        class="v-chip--select-multi"
                        :error-messages="errors.tipo"
                        @click.stop="data.parent.selectedIndex = data.index"
                        @input="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                        >{{ data.item.slice(0, 1).toUpperCase() }}</v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-textarea
                    label="Descripción"
                    required
                    v-model="form.descripcion"
                    :error-messages="errors.descripcion"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-textarea
                    label="Descripción simple"
                    required
                    v-model="form.descripcion_simple"
                    :error-messages="errors.descripcion_simple"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicado todos los campos son obligatorios.</small>
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
      codigo: "",
      nombre: "",
      tipo: "haber",
      descripcion: "",
      descripcion_simple: ""
    },
    items: ["haber", "descuento"],
    errors: {}
  }),
  methods: {
    Submit() {
      axios
        .put(`/descuentos/${this.form.id}`, this.form)
        .then(res => {
          this.$parent.getData();
          this.open = false;
          this.$root.$snackbar.show("Datos editados correctamente.");
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    },
    show() {
      this.open = true;
    }
  }
};
</script>

<style>
</style>
