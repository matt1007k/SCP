<template>
    <v-container fluid grid-list-lg>
        <v-layout row wrap>
            <v-flex xs12>
                <div class="headline">Lista de {{ title }}</div>
            </v-flex>
            <v-flex xs12>
                <template v-if="items.length > 0">
                    <v-card
                        v-for="(item, index) in items"
                        :key="index"
                        class="mb-3 rounded-xl"
                    >
                        <v-card-text class="p-2" grid-list-lg>
                            <v-layout row wrap>
                                <v-flex xs12 sm6 md7>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-container fluid>
                                                <v-list-item-title
                                                    class="font-weight-bold"
                                                    >Nombre</v-list-item-title
                                                >
                                                <v-list-item-subtitle>
                                                    <span
                                                        class="text--primary"
                                                        >{{
                                                            item.descripcion_simple
                                                        }}</span
                                                    >
                                                    &mdash;
                                                    <span
                                                        class="caption text--secondary"
                                                        >{{ item.nombre }}</span
                                                    >
                                                </v-list-item-subtitle>
                                            </v-container>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-flex>
                                <v-flex xs12 sm4 md3>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle>
                                                <v-text-field
                                                    label="Monto S/."
                                                    v-model="item.monto"
                                                    type="number"
                                                    filled
                                                    shaped
                                                    step="any"
                                                    min="0"
                                                ></v-text-field>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-flex>
                                <v-flex xs12 sm2 md2>
                                    <v-btn
                                        small
                                        color="error"
                                        outlined
                                        class="rounded-xl mt-4"
                                        @click="
                                            $emit('remove', index, item.tipo)
                                        "
                                    >
                                        <v-icon>$vuetify.icons.close</v-icon>
                                        <span>Eliminar fila</span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </template>
                <template v-else>
                    <card>
                        <v-card-text class="p-2"
                            >No hay {{ title }}</v-card-text
                        >
                    </card>
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
