<template>
  <div class="container-fluid mt-3">
    <button
      id="form"
      type="button"
      class="btn-form-doc icon-add"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      data-bs-whatever="@mdo"
      title=" Add document"
      hidden
    >
      <i class="bi-file-earmark-plus-fill"></i>
    </button>
    <!--DOCUMENTS ADD EDIT-->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1
              v-if="id != undefined"
              class="modal-title fs-5"
              id="exampleModalLabel"
            >
              Updating document
            </h1>
            <h1 v-else class="modal-title fs-5" id="exampleModalLabel">
              Adding document
            </h1>
            <a type="button" class="btn-close" href="/documentos"></a>
          </div>
          <div class="modal-body">
            <form @submit.prevent="changeDocuments">
              <div class="mb-1">
                <label for="doc_number" class="col-form-label col-form-label-sm"
                  >Doc_number:</label
                >
                <input
                  v-model="datos.doc_number"
                  type="text"
                  class="form-control form-control-sm"
                  id="doc_number"
                  maxlength="100"
                  minlength="6"
                  required
                />
                <small
                  v-if="
                    datos.doc_number === '' ||
                    datos.doc_number == undefined ||
                    datos.doc_number.length < 6
                  "
                  class="check-field-false"
                  >Mínimo 06 caracteres</small
                >
                <small v-else
                  ><i class="bi-check-lg check-field-true"></i
                ></small>
              </div>
              <div class="mb-1">
                <label for="doc_type" class="col-form-label col-form-label-sm"
                  >Doc_type:</label
                >
                <select
                  v-model="datos.doc_type"
                  class="form-select form-select-sm"
                  name="inputNameDoc_type"
                  id="doc_type"
                >
                  <option selected :value="datos.doc_type">
                    {{ datos.doc_type }}
                  </option>
                  <option value=""></option>
                  <option value="AJ_Poder_Judicial">AJ_Poder_Judicial</option>
                  <option value="AJ_Fiscalía">AJ_Fiscalía</option>
                  <option value="AJ_PNP">AJ_PNP</option>
                  <option value="AJ_Otras_Autoridades">
                    AJ_Otras_Autoridades
                  </option>
                  <option value="AJ_Beneficio">AJ_Beneficio</option>
                  <option value="AJ_Pena_Cumplida">AJ_Pena_Cumplida</option>
                  <option value="AJ_otros">AJ_otros</option>
                  <option value="Anulacion">Anulacion</option>
                  <option value="Sentencia">Sentencia</option>
                  <option value="Detención">Detención</option>
                  <option value="Revocatoria">Revocatoria</option>
                  <option value="Traslado">Traslado</option>
                  <option value="Resolución">Resolución</option>
                  <option value="Otros">Otros</option>
                </select>
                <span>
                  <small
                    v-if="datos.doc_type === '' || datos.doc_type == undefined"
                    class="check-field-false"
                    >Opcional</small
                  >
                  <small v-else class="bi-check-lg check-field-true"></small>
                </span>
              </div>
              <div class="mb-1">
                <label for="file" class="col-form-label col-form-label-sm"
                  >File:</label
                >
                <input
                  v-model="datos.file"
                  name="inputNameFile"
                  id="file"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="2083"
                  required
                />
                <span>
                  <small
                    v-if="datos.file == '' || datos.file == undefined"
                    class="check-field-false"
                    >Requerido</small
                  >
                  <small v-else class="bi-check-lg check-field-true"></small>
                </span>
              </div>
              <div class="mb-1">
                <label for="paterno" class="col-form-label col-form-label-sm"
                  >A.paterno:
                </label>
                <input
                  v-model="datos.firstSurname"
                  id="paterno"
                  name="inputNameFirstSurname"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="45"
                />

                <span>
                  <small
                    v-if="
                      datos.firstSurname === '' ||
                      datos.firstSurname == undefined
                    "
                    class="check-field-false"
                    >Opcional</small
                  >
                  <small v-else class="bi-check-lg check-field-true"></small>
                </span>
              </div>
              <div class="mb-1">
                <label for="materno" class="col-form-label col-form-label-sm"
                  >A.materno:</label
                >
                <input
                  v-model="datos.lastSurname"
                  name="inputNameLastSurName"
                  id="materno"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="45"
                />
                <span>
                  <small
                    v-if="
                      datos.lastSurname === '' || datos.lastSurname == undefined
                    "
                    class="check-field-false"
                    >Opcional</small
                  >
                  <small v-else class="bi-check-lg check-field-true"></small>
                </span>
              </div>
              <div class="mb-1">
                <label for="names" class="col-form-label col-form-label-sm"
                  >Names:</label
                >
                <input
                  v-model="datos.name"
                  id="names"
                  name="inputNameName"
                  type="text"
                  class="form-control form-control-sm"
                  required
                  minlength="2"
                  maxlength="45"
                />
                <span>
                  <small v-if="datos.name.length < 2" class="check-field-false"
                    >Requerido</small
                  >
                  <small v-if="datos.name.length > 44" class="check-field-false"
                    >No se acepta mas caracteres</small
                  >
                  <small
                    v-if="1 < datos.name.length && datos.name.length < 45"
                    class="bi-check-lg check-field-true"
                  ></small>
                </span>
              </div>
              <div class="mb-1" v-if="id != undefined">
                <label for="state" class="col-form-label col-form-label-sm"
                  >State:</label
                >

                <select
                  v-model="datos.state"
                  class="form-select form-select-sm"
                  name="inputNameState"
                  id="state"
                >
                  <option value=""></option>
                  <option value="Activo">Activo</option>
                  <option value="Pasivo">Pasivo</option>
                </select>
                <span>
                  <small
                    v-if="datos.state == 'Activo' || datos.state == 'Pasivo'"
                    class="bi-check-lg check-field-true"
                  ></small>
                  <small v-else class="check-field-false">Opcional</small>
                </span>
              </div>
              <div v-if="id != undefined" class="modal-footer">
                <button
                  type="submit"
                  class="btn-form-doc"
                  data-bs-dismiss="modal"
                >
                  Actualizar
                </button>
                <a class="btn-form-doc cancel" href="/documentos">Cancelar</a>
              </div>
              <div v-else class="modal-footer">
                <button
                  type="submit"
                  class="btn-form-doc"
                  data-bs-dismiss="modal"
                >
                  Guardar
                </button>
                <button class="btn-form-doc clean" @click="limpiarCampos">
                  Limpiar
                </button>
                <a class="btn-form-doc cancel" href="/documentos">Cancelar</a>
              </div>
            </form>
            <!--Message success-->
            <div
              v-if="successChange"
              class="alert alert-success mt-4 d-flex align-items-center"
              role="alert"
            >
              <i class="bi-check-circle-fill"></i> {{ successChange }}
            </div>
            <!--Message errors-->
            <div v-if="errChange" class="alert alert-danger mt-4">
              {{ errChange }}
            </div>
            <div v-if="warningChange" class="alert alert-warning mt-4">
              {{ warningChange }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "document-form",
  props: {
    title: {
      type: String,
      default: "Add Document",
    },
  },
  data() {
    return {
      //DOCUMENTS ADD EDIT
      //datos originales que se recibe del servidor
      datos: {
        doc_number: "",
        doc_type: "",
        firstSurname: "",
        lastSurname: "",
        name: "",
        file: "",
        state: "",
      },
      id: this.$route.params.id,
      //archivos para llenar el campo file
      fileSelect: [],

      //DOCUMENTS LIST
      //list
      documents: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchDocs: [],
      text: "",
      //MESSAGES
      //add y edit
      errChange: "",
      successChange: "",
      warningChange: "",
      //error de busqueda
      errList: "",
      successList: "",
      //error de busqueda
      errSearch: "",
      successSearch: "",
    };
  },
  components: {},
  async mounted() {
    await this.getDocuments();
    this.darclick();
  },
  methods: {
    darclick() {
      const del = document.getElementById("form");
      del.click();
    },
    //DOCUMENTS LIST
    async getDocuments() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "GET",
          url: "http://localhost:4000/api/documentos",

          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "GET",
            url: "http://localhost:4000/api/documentos/" + this.id,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
        }
        const result = await axios(myObject);
        //console.log(result.data.Documentos);
        if (result.statusText == "OK") {
          //se obtiene la lista de documentos
          this.documents = result.data.Documentos;
          //llena campos de documentos a editar
          if (this.id != undefined) {
            this.datos.doc_number = result.data.Documentos[0].doc_number;
            this.datos.doc_type = result.data.Documentos[0].doc_type;
            this.datos.firstSurname = result.data.Documentos[0].firstSurname;
            this.datos.lastSurname = result.data.Documentos[0].lastSurname;
            this.datos.name = result.data.Documentos[0].name;
            this.datos.file = result.data.Documentos[0].file;
            this.datos.state = result.data.Documentos[0].state;
          } else {
            //llena campos del ultimo documento
            this.datos.doc_number = result.data.Ultimo_documento[0].doc_number;
            this.datos.doc_type = result.data.Ultimo_documento[0].doc_type;
            //this.datos.file = result.data.Ultimo_documento[0].file;
            this.errList = false;
            //console.log(this.lastDocument);
          }
        }
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },
    //DOCUMENTOS ADD EDIT
    async changeDocuments() {
      try {
        const token = localStorage.getItem("token");
        if (this.id != undefined) {
          const resultPut = await axios({
            method: "PUT",
            url: "http://localhost:4000/api/documentos/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          });
          if (resultPut.statusText == "Created") {
            this.successChange = resultPut.data.Message;
            this.errChange = false;
            location.replace("/documentos");
          }
        } else {
          const resultPost = await axios({
            method: "POST",
            url: "http://localhost:4000/api/documentos",
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          });
          if (resultPost.statusText == "Created") {
            this.successChange = resultPost.data.Message;
            this.errChange = false;
            console.log(this.lastDocument);
            location.replace("/documentos/add");
          }
        }
      } catch (error) {
        this.errChange = error.response.data.Message;
        console.log(error.response);
      }
    },
    //activar desactivar llenado de campos del ultimo documento
    limpiarCampos() {
      this.datos.doc_number = "";
      this.datos.doc_type = "";
      this.datos.firstSurname = "";
      this.datos.lastSurname = "";
      this.datos.name = "";
      this.datos.file = "";
      this.datos.state = "";
    },
  },
};
</script>

<style>

</style>
