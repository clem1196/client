<template>
  <div class="container">
   <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>
    <!--UPLOAD- MULTIPLE-->
    <h5 class="mt-4">Agregar archivos</h5>
    <div class="card mt-3">
      <div class="card-header m-2">
        <form enctype="multipart/form-data">
          <label
            >Files:
            <input
              type="file"
              name="files"
              id="files"
              ref="files"
              multiple
              v-on:change="handleFilesUpload()"
            />
          </label>
        </form>
      </div>
      <br />
      <div v-if="!files.length" class="container">
        <small class="alert alert-light" role="alert">
          Aún no ha seleccionado!!
        </small>
      </div>
      <div v-else class="container">
        <div v-if="files.length > 12">
          <small class="alert alert-danger out float-right" role="alert">
            {{ uploadErr }}
          </small>
        </div>
        <div v-else>
          <div class="container">
            <button
              class="btn btn-secondary out float-right"
              v-on:click="submitFiles()"
            >
              Aceptar
            </button>
          </div>
        </div>
        <div class="container mt-3 out float-left">
          <li
            v-for="(file, key) in files"
            :key="file.name"
            class="file-listing"
          >
            {{ file.name }} &nbsp;
            <span
              class="remove-file btn btn-sm"
              style="color: red;"
              v-on:click="removeFile(key)"
              >Eliminar</span
            >
          </li>
        </div>
      </div>
      <br />
    </div>
    <div class="mt-4">
      <!--Messages-->
      <div v-if="err.length > 0">
        <small class="alert alert-danger out float-right" role="alert">
          {{ err }}
        </small>
      </div>
      <div v-if="success.length > 0">
        <small class="alert alert-success out float-right" role="alert">
          {{ success }}
        </small>
      </div>
      <div v-if="noFiles.length > 0">
        <div class="container">
          <small class="alert alert-warning out float-right" role="alert">
            {{ uploadWarning }}
          </small>
        </div>

        <div class="container mt-4">
          <li v-for="nofile in noFiles" :key="nofile.name" class="file-listing">
            {{ nofile.name }} &nbsp;
          </li>
        </div>
      </div>
    </div>
    <!--Files-->
    <files></files>
  </div>
</template>
<script>
import Files from "./Files.vue";
import headerView from "../../../views/HeaderViewDocs/headerView.vue";

import axios from "axios";
export default {
  name: "file-upload",
  data() {
    return {
      files: [],
      noFiles: [],
      err: "",
      success: "",
      uploadErr: "",
      uploadSuccess: "",
      uploadWarning: "",
    };
  },
  components: {Files, headerView},
  mounted() {},
  methods: {
    async addFiles() {
      this.$refs.files.click();
    },
    async handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      for (let i = 0; i < uploadedFiles.length; i++) {
        if (
          uploadedFiles[i].type.split("/")[1] == "pdf" ||
          uploadedFiles[i].name.split(".")[1] == "pdf" ||
          uploadedFiles[i].type.split("/")[1] == "jpg" ||
          uploadedFiles[i].name.split(".")[1] == "jpg" ||
          uploadedFiles[i].type.split("/")[1] == "jpeg" ||
          uploadedFiles[i].name.split(".")[1] == "jpeg" ||
          uploadedFiles[i].type.split("/")[1] == "docx" ||
          uploadedFiles[i].name.split(".")[1] == "docx" ||
          uploadedFiles[i].type.split("/")[1] == "doc" ||
          uploadedFiles[i].name.split(".")[1] == "doc"
        ) {
          this.files.push(uploadedFiles[i]);
        } else {
          this.noFiles.push(uploadedFiles[i]);
        }
      }
      if (this.noFiles.length > 0) {
        this.uploadWarning = `${this.noFiles.length} archivos no válidos, solo se admiten extensiones pdf, jpg, jpeg, doc y docx`;
      }
      if (this.files.length > 12) {
        this.uploadErr =
          "La cantidad máxima de carga de archivos es 12, puedes eliminar lo necesario ";
      } else {
        this.uploadErr = false;
      }
      //console.log(this.files);
      //console.log(this.noFiles);
    },

    async submitFiles() {
      const token = localStorage.getItem("token");
      let form = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        form.append("files", this.files[i]);
      }

      try {
        //console.log(this.$refs.files.files);
        const fileResult = await axios({
          method: "POST",
          url: "http://localhost:4000/api/uploads",
          data: form,
          headers: {
            Authorization: JSON.parse(token),
            "Content-type": "multipart/form-data",
          },
        });
        console.log(fileResult);
        if (fileResult.data.Message == "successfull") {
          this.success = fileResult.data.Message;
          this.err = false;
          location.replace("/upload");
        }
      } catch (error) {
        console.log({ error: error.response.data.Message });
        this.err = error.response.data.Message;
      }
    },
    async removeFile(key) {
      this.files.splice(key, 1);
      this.err = false;
    },
  },
};
</script>
<style></style>
