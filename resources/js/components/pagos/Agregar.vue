<template>
    <v-layout row justify-center>
        <v-dialog v-model="open" small width="800px" persistent>
            <card>
                <modal-header :title="`Agregar ${this.tipo}`">
                    <template v-slot:close>
                        <btn-secondary
                            :onClick="closeModal"
                            fab
                            class="rounded-circle"
                            small
                        >
                            <v-icon>$vuetify.icons.close</v-icon>
                        </btn-secondary>
                    </template>
                </modal-header>
                <v-container wrap>
                    <v-flex xs12>
                        <v-text-field
                            placeholder="Buscar por nombre"
                            label="nombre"
                            filled
                            shaped
                            v-model="search"
                            @input="searchData($event)"
                            @change="searchData($event)"
                        ></v-text-field>
                        <data-table :headers="headers">
                            <template v-slot:body>
                                <tr v-for="item in items" :key="item.id">
                                    <td>{{ item.nombre }}</td>
                                    <td>{{ item.descripcion }}</td>
                                    <td>{{ item.descripcion_simple }}</td>
                                    <td>
                                        <v-btn
                                            color="primary"
                                            x-small
                                            outlined
                                            @click="$emit('addRow', item, tipo)"
                                            >Agregar</v-btn
                                        >
                                    </td>
                                </tr>
                            </template>
                        </data-table>
                    </v-flex>
                </v-container>
            </card>
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
                text: "Nombre"
            },
            { text: "Descripción" },
            {
                text: "Descripción simple"
            },
            { text: "Acción" }
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
