<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" small width="800px" persistent>
      <v-card>
        <v-card-title wrap class="blue-grey darken-2 white--text">
          <v-flex xs11>
            <span class="headline">Agregar {{this.tipo}}</span>
          </v-flex>
          <v-flex xs1 class="d-flex justify-end">
            <v-btn color="error" @click="closeModal">
              <v-icon>$vuetify.icons.close</v-icon>
            </v-btn>
          </v-flex>
        </v-card-title>
        <v-container wrap>
          <v-flex xs12>
            <v-text-field
              placeholder="Buscar por nombre"
              label="nombre"
              v-model="search"
              @input="searchData($event)"
              @change="searchData($event)"
            ></v-text-field>
            <v-data-table
              no-data-text="No hay resultados"
              :headers="headers"
              :items="items"
              hide-actions
              :loading="isLoadingD"
            >
              <template v-slot:items="props">
                <td>{{props.item.nombre}}</td>
                <td>{{props.item.descripcion}}</td>
                <td>{{props.item.descripcion_simple}}</td>
                <td>
                  <v-btn color="success" @click="$emit('addRow', props.item, tipo)">Agregar</v-btn>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: ["addRow"],
  data: () => ({
    open: false,
    items: [],
    search: "",
    isLoadingD: false,
    tipo: "",
    headers: [
      {
        text: "Nombre",
        align: "left",
        sortable: false,
        value: "nombre"
      },
      { text: "Descripción", value: "descripcion", sortable: false },
      {
        text: "Descripción simple",
        value: "descripcion_simple",
        sortable: false
      },
      { text: "Acción", value: "action", sortable: false }
    ]
  }),
  methods: {
    showModal() {
      this.open = true;
      this.items = [];
      this.search = "";
      this.tipo = "";
    },
    closeModal() {
      this.open = false;
      this.tipo = "";
      this.items = [];
      this.search = "";
    },
    searchData(ev) {
      if (this.isLoadingD) return;
      this.isLoadingD = true;
      const params = { q: ev };
      axios
        .get(`/search-descuentos?tipo=${this.tipo}`, { params })
        .then(res => {
          this.isLoadingD = false;

          this.items = res.data.descuentos;
        })
        .catch(err => console.log(err))
        .finally(() => (this.isLoadingD = false));
    }
  }
};
</script>
