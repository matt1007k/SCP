<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs12>
        <v-card>
          <v-container fill-height fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <span class="headline">Importar Haberes y Descuentos</span>
                <div class="body-1">Subir datos de los haberes y descuentos.</div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout wrap class="d-flex" justify-center>
      <v-flex xs12 sm8 md6>
        <v-card>
          <div class="dropzone">
            <input type="file" ref="file" class="input-file" @change="sendFile" />
            <p v-if="!uploading" class="call-to-action">
              <i class="mdi mdi-upload"></i>
              Seleccione un archivo Excel
            </p>
            <div class="progress-bar d-flex justify-center" v-if="uploading">
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="progress"
                color="teal"
              >{{ progress }}</v-progress-circular>
            </div>
          </div>
          <div v-if="progress === 100">
            <p class="text-info">Subiendo los datos espere:</p>
            <div class="spinner">
              <div class="rect1"></div>
              <div class="rect2"></div>
              <div class="rect3"></div>
              <div class="rect4"></div>
              <div class="rect5"></div>
            </div>
          </div>
          <v-alert v-if="error" :value="true" type="error">{{errors.archivo[0]}}</v-alert>

          <v-alert :value="true" type="success" v-if="uploadFile[0]">
            <ul class="no-margin">
              <li
                v-for="file in uploadFile"
                :key="file.name"
              >El archivo {{file.name}} se subio con exito.</li>
            </ul>
          </v-alert>
        </v-card>
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
    if (this.$auth.can("importar.descuentos") || this.$auth.isAdmin()) {
      document.title = "Importar Haberes y Descuentos";
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
        const res = await axios.post("/importar/descuentos", formData, {
          onUploadProgress: e =>
            (this.progress = Math.round((e.loaded * 100) / e.total))
        });
        this.error = false;
        this.uploadFile.push(file);
        this.uploading = false;
        this.progress = 0;

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

        var message = res.data.msg;
        if (message) {
          this.resetInputFile();
          this.$swal("Mensaje de operación", message, "info");
        }
      } catch (error) {
        this.errors = error.response.data.errors;
        this.progress = 0;
        this.error = true;
        this.uploading = false;
        this.uploadFile = [];

        var error = error.response.data.message;

        if (
          error == "Undefined index: HABERES" ||
          error == "Undefined index: DESCUENTOS"
        ) {
          this.$swal(
            "Mensaje de operación",
            "Las hojas HABERES y DESCUENTOS no exiten en el archivo.",
            "info"
          );
          this.resetInputFile();
        }
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

