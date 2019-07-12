<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="headline">Lista de {{title}}</div>
      </v-flex>
      <v-flex xs12>
        <template v-if="items.length > 0">
          <v-card v-for="(item, index) in items" :key="index">
            <v-card-text class="p-2" grid-list-lg>
              <v-layout row wrap>
                <v-flex xs12 sm6 md7>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-container fluid>
                        <v-list-tile-title class="font-weight-bold">Nombre</v-list-tile-title>
                        <v-list-tile-sub-title>
                          <span class="text--primary">{{item.descripcion_simple}}</span>
                          &mdash;
                          <span
                            class="caption text--secondary"
                          >{{item.nombre}}</span>
                        </v-list-tile-sub-title>
                      </v-container>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex xs12 sm4 md3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-sub-title>
                        <v-text-field label="Monto S/." v-model="item.monto" type="number"></v-text-field>
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
                <v-flex xs12 sm2 md2>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-tooltip bottom>
                        <v-btn
                          slot="activator"
                          small
                          icon
                          color="error"
                          @click="$emit('remove', index, item.tipo)"
                        >
                          <v-icon>$vuetify.icons.close</v-icon>
                        </v-btn>
                        <span>Eliminar fila</span>
                      </v-tooltip>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </template>
        <template v-else>
          <v-card>
            <v-card-text class="p-2">No hay {{title}}</v-card-text>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

