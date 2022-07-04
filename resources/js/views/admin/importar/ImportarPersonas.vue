<template>
    <v-container>
        <page-header
            title="Importar Personas y los Pagos"
            subtitle="Subir datos de las personas y los pagos."
            img="/img/delesign-payment-processed.png"
        />
        <v-layout wrap class="d-flex" justify-center>
            <v-flex xs12 sm8 md6>
                <card>
                    <div class="dropzone">
                        <input
                            type="file"
                            ref="file"
                            class="input-file"
                            @change="sendFile"
                        />
                        <p v-if="!uploading" class="call-to-action">
                            <i class="mdi mdi-upload"></i>
                            Seleccione un archivo Excel
                        </p>
                        <div
                            class="progress-bar d-flex justify-center"
                            v-if="uploading"
                        >
                            <v-progress-circular
                                :rotate="360"
                                :size="100"
                                :width="15"
                                :value="progress"
                                color="primary"
                                >{{ progress }}</v-progress-circular
                            >
                        </div>
                    </div>
                    <div v-if="progress === 100">
                        <p
                            class="text--secondary subheading font-weight-semibold mt-2"
                        >
                            Subiendo los datos espere:
                        </p>
                        <div class="spinner">
                            <div class="rect1"></div>
                            <div class="rect2"></div>
                            <div class="rect3"></div>
                            <div class="rect4"></div>
                            <div class="rect5"></div>
                        </div>
                    </div>
                    <v-alert v-if="error" :value="true" type="error">{{
                        errors.archivo[0]
                    }}</v-alert>

                    <v-alert :value="true" type="success" v-if="uploadFile[0]">
                        <ul class="no-margin">
                            <li v-for="file in uploadFile" :key="file.name">
                                El archivo {{ file.name }} se subio con exito.
                            </li>
                        </ul>
                    </v-alert>
                </card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            error: false,
            uploading: false,
            uploadFile: [],
            progress: 0,
            errors: {}
        };
    },
    created() {
        if (this.$auth.can("importar.personas") || this.$auth.isAdmin()) {
            document.title = "Importar datos de personas y pagos";
        } else {
            this.$router.push("/admin/403");
        }
    },
    methods: {
        async sendFile() {
            let file = this.$refs.file.files[0];
            const formData = new FormData();
            formData.append("archivo", file);

            try {
                this.uploading = true;
                const res = await axios.post("/importar/personas", formData, {
                    onUploadProgress: e =>
                        (this.progress = Math.round((e.loaded * 100) / e.total))
                });
                if (res.data.import == true) {
                    Push.create("Mensaje del sistema", {
                        body: `Archivo: ${file.name} importado con éxito`,
                        icon: "/img/LogoDREA.png",
                        timeout: 4000,
                        onClick: function() {
                            window.focus();
                            this.close();
                        }
                    });
                }
                this.error = false;
                this.uploadFile.push(file);
                this.uploading = false;
                this.progress = 0;

                var message = res.data.msg;
                if (message) {
                    this.resetInputFile();
                    // this.$root.$snackbar.show(message, { color: "warning" });
                    this.$swal("Mensaje de operación", message, "info");
                }
            } catch (error) {
                this.errors = error.response.data.errors;
                this.progress = 0;
                this.error = true;
                this.uploading = false;
                this.uploadFile = [];
            }
        },
        resetInputFile() {
            this.error = false;
            this.uploading = false;
            this.uploadFile = [];
            this.progress = 0;
            this.errors = {};
        }
    }
};
</script>
