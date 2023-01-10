<template>
  <div class="mt-4">
    <small v-if="datos.message.err.length>0" class="alert alert-danger">
      {{ datos.message.err }}
      <a
        class="out float-right"
        href="/documentos"
        b-tooltip.hover
        title="Salir"
        >Regresar</a
      >
    </small>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "download-file",
  data() {
    return {
      datos: {
        message: {
          success: "",
          err: "",
        },
      },
    };
  },
  async mounted() {
    await this.downloadFile();
  },
  components: {},
  methods: {
    //DOWNLOAD
    async downloadFile() {
      try {
        const token = localStorage.getItem("token");
        const name = this.$route.params.name;
        //console.log(name)
        const result = await axios({
          url: "http://localhost:4000/api/files/download/" + name,
          method: "GET",
          responseType: "blob",
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result);
        if (result.statusText == "OK") {
          const fileURL = window.URL.createObjectURL(new Blob([result.data]));
          const fileLink = document.createElement("a");
          fileLink.href = fileURL;
          fileLink.setAttribute("download", "file.pdf");
          document.body.appendChild(fileLink);
          fileLink.click();
          location.replace("/documentos");
        }       
      } catch (error) {
        this.datos.message.err = "Error interno del Servidor";
        console.log(error.response);
      }
    },
  },
};
</script>
