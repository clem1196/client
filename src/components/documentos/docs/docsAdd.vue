<template>
  <div>
    <button
      id="add"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#addModal"
      data-bs-whatever="@mdo"
      hidden
    ></button>
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!--modal header-->
          <div class="modal-header" style="background: #0097a7;">
            <h5 class="modal-title" id="addModalLabel" style="color: white;">
              {{ title }}
            </h5>

            <a href="/documentos" class="btn btn-close"></a>
          </div>
          <!--modal header-->
          <div class="modal-body bg-light">
            <form @submit.prevent="addDocs">
             
              <!--Campo doc_number-->
              <div class="mb-3">
                <label for="" class="col-form-label"
                  >Num_doc:</label
                >
                <input
                  v-model="datos.doc_number"
                  type="text"
                  class="form-control"
                  minlength="6"
                  required
                />
                <small v-if="datos.doc_number.length < 6" class="text-danger"
                  >Mínimo 6 caracteres</small>
              </div>
               <!--Campo type_doc-->
              <div class="mb-3">
                <label for="" class="col-form-label"
                  >Tipo_doc:</label
                >
                <select
                  v-model="datos.doc_type"
                  class="form-select form-select-sm"                                   
                >                
                  <option
                    v-for="(op, index) in options"
                    :key="index"
                    :value="options[index].value"
                    >{{ options[index].text }}
                  </option>
                </select>
                
              </div>
              <!--Campo file-->
              <div class="mb-3">
                <label for="" class="col-form-label">File:</label>
                <select
                  v-model="datos.file"
                  class="form-select form-select-sm"                  
                >                 
                  <option
                    v-for="(fi, index) in files"
                    :key="index"
                    :value="files[index].name"
                    >{{ files[index].url }}
                  </option>
                </select>              
              </div>
              <!--botones guardar y cancelar-->
              <!--<div class="modal-footer-xl mt-2">                
                <a class="btn btn-sm" href="/personas/add" style="background: #0097a7; color:White;"
                  >Agregar personas</a
                >
              </div>-->
              <div class="modal-footer-sm mt-2" style="background: #0097a7;">                
                <button type="submit" class="btn btn-light m-3">
                  Guardar
                </button>
                <a class="btn" href="/documentos" style="color: white;"
                  >Cancelar</a
                >
              </div>
            </form>
          </div>
        </div>
        <!--Message success-->
        <div
          v-if="message.success"
          class="alert alert-success mt-4 d-flex align-items-center"
          role="alert"
        >
          <i class="bi-check-circle-fill"></i> {{ message.success }}
        </div>
        <!--Message errors-->
        <div v-if="message.err" class="alert alert-danger mt-4">
          {{ message.err }}
        </div>
      </div>
    </div>
    <!--component usuarios-->
    <docsList></docsList>
  </div>
</template>

<script>
import axios from "axios";
import docsList from "./docsList.vue";
export default {
  name: "docs-add",
  props: {
    title: {
      type: String,
      default: "Agregar documentos",
    },
  },
  data() {
    return {
      //datos originales que se recibe del servidor
      datos: {
        doc_type: "",
        doc_number: "",
        file: "",
      },
      //files
      files: [],
      //options
      options: [
        { value: "RESOLUCIONES JUDICIALES", text: "RESOLUCIONES JUDICIALES" },
        { value: "Sentencia", text: "Sentencia" },
        { value: "Anulación", text: "Anulación" },
        { value: "Revocatoria", text: "Revocatoria" },
        { value: "Detención", text: "Detención" },
        { value: "Ingreso", text: "Ingreso" },
        { value: "Egreso", text: "Egreso" },
        { value: "Otros", text: "Otros" },
        {
          value: "ANTECEDENTES JUDICIALES EXTERNAS",
          text: "ANTECEDENTES JUDICIALES EXTERNAS",
        },
        { value: "AJ_Juzgado", text: "AJ_Juzgado" },
        { value: "AJ_Sala_Superior", text: "AJ_Sala_Superior" },
        { value: "AJ_Sala_Suprema", text: "AJ_Sala_Suprema" },
        { value: "AJ_Fiscalía", text: "AJ_Fiscalía" },
        { value: "AJ_PNP", text: "AJ_PNP" },
        { value: "AJ_Otros", text: "AJ_Otros" },
        {
          value: "ANTECEDENTES JUDICIALES INTERNAS y OTROS",
          text: "ANTECEDENTES JUDICIALES INTERNAS y OTROS",
        },
        { value: "AJ_Regional", text: "AJ_Regional" },
        { value: "AJ_EEPP", text: "AJ_EEPP" },
        { value: "AJ_Sede_Central", text: "AJ_Sede_Central" },
        { value: "AJ_Traslado", text: "AJ_Traslado" },
        { value: "Oficio", text: "Oficio" },
        { value: "Solicitud", text: "Solicitud" },
        { value: "Memorándum", text: "Memorándum" },
        { value: "Resolución_Inpe", text: "Resolución_Inpe" },
      ],

      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
      },
    };
  },

  components: { docsList },
  async mounted() {
    this.darclick();
    this.getFiles();
  },

  methods: {
    darclick() {
      const add = document.getElementById("add");
      add.click();
    },
    async getFiles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "get",
          url: "http://localhost:4000/api/files",

          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result);
        if (result.data.length > 0) {
          this.files = result.data;
        }
        console.log(this.files);
      } catch (error) {
        this.error =
          "El documento ya existe, o que no llenó los campos correctamente";
        this.success = false;
      }
    },

    async addDocs() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/documentos",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result);
        if (result.statusText=="Created") {
          this.message.success = result.data.Message;
          this.message.err = false;
          //location.replace("/documentos");
          location.replace("/personas/add");
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
