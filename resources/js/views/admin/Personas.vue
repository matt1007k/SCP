<template>
    <v-container>
        <page-header
            title="Personas"
            subtitle="Administra las personas que reciban sus pagos."
            img="/img/bermuda-profitable-growth.png"
        >
            <template v-slot:action>
                <div v-if="$auth.can('personas.create') || $auth.isAdmin()">
                    <v-btn
                        color="dark"
                        large
                        class="rounded-lg"
                        @click.stop="modalAgregar"
                    >
                        <v-icon>$vuetify.icons.add</v-icon>Agregar Persona
                    </v-btn>
                </div>
            </template>
        </page-header>

        <card class="mt-6">
            <v-flex row>
                <v-col sm="12" md="5" flex>
                    <span class="font-weight-bold text--secondary"
                        >Filtrar por:</span
                    >
                    <v-chip
                        class="ma-2"
                        :color="`${estado == 'activo' ? 'primary' : ''}`"
                        @click="filterBy('activo')"
                    >
                        Activo
                    </v-chip>
                    <v-chip
                        class="ma-2"
                        :color="`${estado == 'sobreviviente' ? 'primary' : ''}`"
                        @click="filterBy('sobreviviente')"
                    >
                        Sobreviviente
                    </v-chip>
                    <v-chip
                        class="ma-2"
                        :color="`${estado == 'cesante' ? 'primary' : ''}`"
                        @click="filterBy('cesante')"
                    >
                        Cesante
                    </v-chip>
                </v-col>
            </v-flex>
            <v-flex row>
                <v-col sm="12" md="5">
                    <v-text-field
                        shaped
                        filled
                        label="Buscar"
                        prepend-inner-icon="mdi-magnify"
                        v-model="search"
                    ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col sm="12" md="2">
                    <v-select
                        :items="RowsPerPageItems"
                        filled
                        label="Mostrar"
                        v-model="perPage"
                        dense
                        shaped
                    ></v-select>
                </v-col>
            </v-flex>
            <v-fade-transition leave-absolute>
                <v-progress-linear
                    v-if="loadingData"
                    size="24"
                    color="primary"
                    indeterminate
                ></v-progress-linear>
            </v-fade-transition>
            <data-table :headers="headers">
                <template v-slot:body>
                    <template v-if="personas.length">
                        <tr v-for="person in personas" :key="person.id">
                            <td class="text-xs-center">
                                {{ person.codigo_modular }}
                            </td>
                            <td class="d-flex flex-column justify-center">
                                <p class="mb-0">
                                    {{ person.apellido_paterno }}
                                    {{ person.apellido_materno }},
                                    {{ person.nombre }}
                                </p>
                                <p class="text--secondary mb-0">
                                    DNI {{ person.dni }}
                                </p>
                            </td>
                            <td class="text-xs-center">{{ person.cargo }}</td>
                            <td class="text-xs-center">
                                <EstadoChip :estado="person.estado" />
                            </td>
                            <td>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('personas.edit') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="info"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="modalEditar(person)"
                                        >
                                            <v-icon>$vuetify.icons.edit</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Editar registro</span>
                                </v-tooltip>
                                <v-tooltip
                                    bottom
                                    v-if="
                                        $auth.can('personas.destroy') ||
                                            $auth.isAdmin()
                                    "
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            color="error"
                                            fab
                                            x-small
                                            v-on="on"
                                            @click="deleteData(person)"
                                        >
                                            <v-icon
                                                >$vuetify.icons.delete</v-icon
                                            >
                                        </v-btn>
                                    </template>
                                    <span>Eliminar registro</span>
                                </v-tooltip>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td :colspan="headers.length">No hay registros.</td>
                        </tr>
                    </template>
                </template>
            </data-table>

            <div
                class="d-flex justify-between align-center flex-column flex-md-row"
            >
                <p class="caption mb-0">
                    Mostrando {{ pagination.from }} al {{ pagination.to }} de
                    {{ pagination.total }} registros
                </p>
                <v-pagination
                    v-model="page"
                    :length="pagination.last_page"
                    :total-visible="7"
                    color="primary"
                ></v-pagination>
            </div>
        </card>
        <modal-agregar ref="agregarPersona"></modal-agregar>
        <modal-editar ref="editarPersona"></modal-editar>
    </v-container>
</template>

<script>
import ModalAgregar from "../../components/personas/ModalAgregar";
import ModalEditar from "../../components/personas/ModalEditar";
import EstadoChip from "../../components/personas/EstadoChip";
export default {
    components: { ModalAgregar, ModalEditar, EstadoChip },
    data() {
        return {
            search: "",
            estado: "activo",
            loadingData: false,
            pagination: {},
            page: 1,
            RowsPerPageItems: [10, 15, 25],
            perPage: 10,
            headers: [
                {
                    text: "Codigo Modular"
                },
                {
                    text: "Nombre completo"
                },
                { text: "Cargo" },
                { text: "Estado" },
                { text: "Acciones" }
            ],
            personas: []
        };
    },
    created() {
        if (this.$auth.can("personas.index") || this.$auth.isAdmin()) {
            document.title = "Lista de Personas";
            this.getData();
        } else {
            this.$router.push("/admin/403");
        }
    },
    mounted() {
        this.$root.agregarPersona = this.$refs.agregarPersona;
        this.$root.editarPersona = this.$refs.editarPersona;
    },
    methods: {
        getData(
            url = `/personas?perPage=${this.perPage}&search=${this.search}&page=${this.page}&estado=${this.estado}`
        ) {
            this.loadingData = true;
            axios
                .get(url, { params: { estado: this.estado } })
                .then(res => {
                    this.personas = res.data.data;
                    this.pagination = this.getPaginateElement(res.data);
                    this.loadingData = false;
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status == 403) {
                        this.$router.push("/admin/403");
                    }
                });
        },
        filterBy(status) {
            this.estado = status;
            this.getData();
            this.resetPage();
        },
        modalAgregar() {
            this.$root.agregarPersona.show();
        },
        modalEditar(persona) {
            this.$root.editarPersona.show();
            this.$root.editarPersona.form.id = persona.id;
            this.$root.editarPersona.form.nombre = persona.nombre;
            this.$root.editarPersona.form.apellido_paterno =
                persona.apellido_paterno;
            this.$root.editarPersona.form.apellido_materno =
                persona.apellido_materno;
            this.$root.editarPersona.form.dni = persona.dni;
            this.$root.editarPersona.form.codigo_modular =
                persona.codigo_modular;
            this.$root.editarPersona.form.cargo = persona.cargo;
            this.$root.editarPersona.form.estado = persona.estado;
        },
        deleteData(persona) {
            this.$swal({
                title: "¿Está seguro de eliminar el registro?",
                text: "Esta operación va a eliminar el registro",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Sí, eliminar"
            }).then(result => {
                if (result.value) {
                    axios
                        .delete(`/personas/${persona.id}`)
                        .then(res => {
                            this.$swal(
                                "Mensaje de operación",
                                "La persona se eliminó correctamente",
                                "success"
                            );
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                            if (err.response.status == 403) {
                                this.$router.push("/403");
                            }
                        });
                }
            });
        },
        resetPage() {
            this.page = 1;
        }
    },
    watch: {
        search(value) {
            this.resetPage();
            this.getData();
        },
        perPage(value) {
            this.resetPage();
            this.getData();
        },
        page(value) {
            this.getData();
        }
    }
};
</script>
