<template>
  <div>
    <button
      id="edit"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#editarModal"
      data-bs-whatever="@mdo"
      hidden
    ></button>
    <div
      class="modal fade"
      id="editarModal"
      tabindex="-1"
      aria-labelledby="editarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background: #0097a7;">
            <h5 class="modal-title" id="editarModalLabel" style="color: white;">
              {{ title }}
            </h5>
            <a href="/documentos" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="editDocs">
              <!--Campo userId-->
              <div class="mb-2">
                <label for="" class="col-form-label">Usuario:</label>
                <select
                  v-model="datos.userid"
                  style="font-size: 0.9rem;"
                  class="form-select form-select-sm"
                  required
                >
                  <option selected :value="datos.userid">{{
                    datos.userid
                  }}</option>
                  <option
                    v-for="(us, index) in users"
                    :key="index"
                    :value="users[index].idusuario"
                    >{{ users[index].nombre_usuario }}
                  </option>
                </select>
                <small v-if="datos.userid.length < 1" class="text-danger m-2"
                  >Mínimo 1 carácter</small
                >
              </div>
              <!--Campo type_doc-->
              <div class="mb-2">
                <label for="doc_type" class="col-form-label">Tipo_doc:</label>
                <select
                  v-model="datos.doc_type"
                  style="font-size: 0.9rem;"
                  class="form-select form-select-sm"
                  focus
                >
                  <option selected :value="datos.doc_type">{{
                    datos.doc_type
                  }}</option>
                  <option
                    v-for="(doc, index) in docs"
                    :key="index"
                    :value="docs[index].value"
                    >{{ docs[index].text }}
                  </option>
                </select>
              </div>
              <!--Campo doc_number-->
              <div class="mb-2">
                <label for="" class="col-form-label">doc_number</label>
                <input
                  v-model="datos.doc_number"
                  id="doc_number"
                  class="form-control"
                  style="font-size: 0.9rem;"
                  required
                  minlength="6"
                />
              </div>
              <small v-if="datos.doc_number.length < 6" class="text-danger m-2"
                >Mínimo 6 caracteres</small
              >
              <!--file-->
              <div class="mb-2">
                <label for="" class="col-form-label">File</label>
                <select
                  v-model="datos.file"
                  class="form-select form-select-sm"
                  id="file"
                  style="font-size: 0.9rem;"
                >
                  <option selected :value="datos.file">{{ datos.file }}</option>
                  <option
                    v-for="(fi, index) in files"
                    :key="index"
                    :value="files[index].name"
                    >{{ files[index].url }}
                  </option>
                </select>                
              </div>
              <!--Campo State-->
              <div class="mb-2">
                <label for="" class="col-form-label">Estado</label>
                <input
                  v-model="datos.state"
                  id="location"
                  class="form-control"
                  style="font-size: 0.9rem;"
                  required
                  minlength="1"
                />
                <small v-if="datos.state.length < 1" class="text-danger m-2"
                  >Mínimo 1 carácter</small
                >
              </div>
              <!--Si los campos estan llenos se habilita el boton "Guardar" de lo
            contrario se deshabilita-->
              <div class="modal-footer-sm" style="background: #0097a7;">
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
        <div
          v-if="message.success"
          class="alert alert-success mt-4 d-flex align-items-center"
          role="alert"
        >
          <i class="bi-check-circle-fill"></i> {{ message.success }}
        </div>
        <div v-if="message.err" class="alert alert-danger mt-4">
          {{ message.err }}
        </div>
      </div>
    </div>
    <docsList></docsList>
  </div>
</template>

<script>
import axios from "axios";
import docsList from "./docsList.vue";
export default {
  name: "docs-edit",
  props: {
    title: {
      type: String,
      default: "Editar documento",
    },
  },
  data() {
    return {
      datos: {
        userid: Number,
        doc_type: "",
        doc_number: "",
        file: "",
        state: "",
      },
      //copia de datos para comparar.
      datos_copy: {
        userid: Number,
        doc_type: "",
        doc_number: "",
        file: "",
        state: "",
      },
      users: [],
      //files
      files: [],
      //options
      docs: [
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
    this.getUsuarios();
    this.getDocs();
    this.getFiles();
    this.darclick();
  },

  methods: {
    darclick() {
      const edit = document.getElementById("edit");
      edit.click();
    },
    //Usuarios
    async getUsuarios() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/data", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result.data);
        if (result.data.usersid_and_usersnames.length > 0) {
          this.users = result.data.usersid_and_usersnames;
          this.err = false;
        } else {
          console.log("No hay datos que mostrar");
        }
      } catch (error) {
        this.err = error.response.data.Message;
        console.log(error.response);
      }
      console.log(this.users[1].idusuario);
    },
    //files
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
        //console.log(result.data);
        if (result.data.length > 0) {
          this.files = result.data;
        }
        //console.log(this.files[0]);
      } catch (error) {
        console.log(error.response);
        this.success = false;
      }
    },
    //obtener un documento
    async getDocs() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          "http://localhost:4000/api/docs/data/" + this.$route.params.id,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        //console.log(result.data.lists);

        if (result.data.lists.documents_ById.length > 0) {
          this.datos.userid = result.data.lists.documents_ById[0][0].userid;
          this.datos.doc_type = result.data.lists.documents_ById[0][0].doc_type;
          this.datos.doc_number =
            result.data.lists.documents_ById[0][0].doc_number;
          this.datos.file = result.data.lists.documents_ById[0][0].file;
          this.datos.state = result.data.lists.documents_ById[0][0].state;
          //copy
          this.datos_copy.userid =
            result.data.lists.documents_ById[0][0].userid;
          this.datos_copy.doc_type =
            result.data.lists.documents_ById[0][0].doc_type;
          this.datos_copy.doc_number =
            result.data.lists.documents_ById[0][0].doc_number;
          this.datos_copy.file = result.data.lists.documents_ById[0][0].file;
          this.datos_copy.state = result.data.lists.documents_ById[0][0].state;
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async editDocs() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.put(
          "http://localhost:4000/api/documentos/" + this.$route.params.id,
          {
            userid: this.datos.userid,
            doc_type: this.datos.doc_type,
            doc_number: this.datos.doc_number,
            file: this.datos.file,
            state: this.datos.state,
          },
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        if (result.statusText == "Created") {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace("/documentos");
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
