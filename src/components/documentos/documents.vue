<template>
  <div class="container-fluid mt-1">   
    <!--DOCUMENTS UPLOAD, ADD, EDIT-->
    <div class="row">
      <!--Upload singular-->
      <div class="col-md-12">
        <div class="card mt-2">
          <div class="card-header m-2" style="font-size: 0.9rem;">
            <form enctype="multipart/form-data">
              <label>Files: </label>
              <input
                class="m-2"
                type="file"
                name="uploaded_files"
                id="file"
                ref="file"
                accept=".pdf, application/pdf, .image/*, .jpg, .jpeg, .png"
                @change="handleFilesUpload"
              />
              <small v-if="files.length > 0" class="m-2">
                <button class="btn btn-secondary" @click="submitFiles()">
                  Aceptar
                </button>
                <a href="/documentos" class="btn btn-light btn-sm m-1"
                  >Cancelar</a
                >
              </small>
              <small
                v-if="successUpload.length > 0"
                class="alert alert-danger alert-sm m-2"
                role="alert"
                >{{ successUpload }}!
              </small>
              <small
                v-if="errUpload.length > 0"
                class="alert alert-danger alert-sm m-2"
                role="alert"
                >{{ errUpload }}!
              </small>
              <small v-if="errUpload.length > 0">
                <a href="/documentos" class="btn btn-secondary btn-sm m-2"
                  >Cancelar</a
                >
              </small>
            </form>
          </div>
        </div>
      </div>
      <!--Add, Edit-->
      <div class="col">
        <!--form-->
        <div class="card" style="background: #b39ddb; color: #3e2723;">
          <form
            @submit.prevent="changeDocuments"
            class="row g-1 m-2"
            style="font-size: 0.9rem;"
          >
            <!--Campo doc_number-->
            <div class="col-md-5">
              <label for="inputdoc_number" class="form-label-sm">Doc:</label>
              <input
                v-model="datos.doc_number"
                id="inputdoc_number"
                type="text"
                class="form-control form-control-sm"
                maxlength="100"
                minlength="6"
                required
              />
              <span>
                <small
                  v-if="
                    datos.doc_number === '' ||
                    datos.doc_number == undefined ||
                    datos.doc_number.length < 6
                  "
                  class="text-danger"
                  style="font-size: 0.7rem;"
                  >Requerido</small
                >
                <small
                  v-else
                  class="bi-check-lg"
                  style="font-size: 1.2rem; color: #006064;"
                ></small>
              </span>
            </div>
            <!--Campo doc_type-->
            <div class="col-md-2">
              <label for="inputdoc_type" class="form-label-sm">Tipo:</label>
              <select
                v-model="datos.doc_type"
                class="form-select form-select-sm"
                id="inputdoc_type"
              >
                <option selected :value="datos.doc_type">{{
                  datos.doc_type
                }}</option>
                <option value="AJ_Poder_Judicial">AJ_Poder_Judicial</option>
                <option value="AJ_Fiscalía">AJ_Fiscalía</option>
                <option value="AJ_PNP">AJ_PNP</option>
                <option value="AJ_Otras_Autoridades"
                  >AJ_Otras_Autoridades</option
                >
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
                  style="font-size: 0.7rem; color: #ffff66;"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>
            <!--Campo file-->
            <div class="col-md-5">
              <label for="inputfile" class="form-label-sm">File:</label>
             <input
                v-model="datos.file"
                id="inputdoc_number"
                type="text"
                class="form-control form-control-sm"
                maxlength="2083"                
                required
              />
              <span>
                <small
                  v-if="datos.file == '' || datos.file == undefined"
                  style="font-size: 0.7rem; color: #ffff66;"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>
            <!-- <div class="col-md-5">
              <label for="inputfile" class="form-label-sm">File:</label>
              <select
                v-model="datos.file"
                class="form-select form-select-sm"
                id="inputfile"
              >
                <option selected :value="datos.file">{{ datos.file }}</option>
              </select>
              <span>
                <small
                  v-if="datos.file == '' || datos.file == undefined"
                  style="font-size: 0.7rem; color: #ffff66;"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>-->
            <!--Campo firstSurname-->
            <div class="col-md-3">
              <label for="inputfirstSurname" class="form-label-sm"
                >Ap. paterno:</label
              >
              <input
                v-model="datos.firstSurname"
                id="inputfirstSurname"
                type="text"
                class="form-control form-control-sm"
                maxlength="45"
              />
              <span>
                <small
                  v-if="
                    datos.firstSurname === '' || datos.firstSurname == undefined
                  "
                  style="font-size: 0.7rem; color: #ffff66;"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>
            <!--Campo lastSurname-->
            <div class="col-md-3">
              <label for="inputlastSurname" class="form-label-sm"
                >Ap. Materno:</label
              >
              <input
                v-model="datos.lastSurname"
                id="inputlastSurname"
                type="text"
                class="form-control form-control-sm"
                maxlength="45"
              />
              <span>
                <small
                  v-if="
                    datos.lastSurname === '' || datos.lastSurname == undefined
                  "
                  style="font-size: 0.7rem; color: #ffff66;"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>
            <!--Campo name-->
            <div class="col-md-5">
              <label for="inputname" class="form-label-sm">Nombres:</label>
              <input
                v-model="datos.name"
                id="inputname"
                type="text"
                class="form-control form-control-sm"
                required
                minlength="2"
                maxlength="45"
              />
              <span>
                <small
                  v-if="datos.name.length < 2"
                  class="text-danger"
                  style="font-size: 0.7rem;"
                  >Requerido</small
                >
                <small
                  v-if="datos.name.length > 44"
                  class="text-danger"
                  style="font-size: 0.7rem;"
                  >No se acepta mas caracteres</small
                >
                <small
                  v-if="1 < datos.name.length && datos.name.length < 45"
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>
            <!--Campo State-->
            <div v-if="id != undefined" class="col-md-2">
              <label for="inputstate" class="form-label-sm">Estado</label>
              <select
                v-model="datos.state"
                class="form-select form-select-sm"
                id="inputstate"
              >
                <option value=""></option>
                <option value="Pendiente">Activo</option>
                <option value="Atendido">Pasivo</option>
              </select>
              <span>
                <small
                  v-if="datos.state == '' || datos.state == undefined"
                  style="font-size: 0.7rem; color: #ffff66;"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.2rem;"
                ></small>
              </span>
            </div>
            <!--botones guardar y cancelar-->
            <div
              v-if="id != undefined"
              class="card-footer-sm mt-2 m-2"
              style="background: #e1bee7;"
            >
              <button type="submit" class="btn btn-light btn-sm m-3">
                Actualizar
              </button>
              <a class="btn btn-sm" href="/documentos" style="color: white;"
                >Cancelar</a
              >
            </div>
            <div
              v-else
              class="card-footer-sm mt-2 m-2"
              style="background: #e1bee7;"
            >
              <button type="submit" class="btn btn-light btn-sm m-3">
                Guardar
              </button>
              <button
                class="btn btn-sm"
                @click="limpiarCampos"
                style="color: white;"
              >
                Limpiar
              </button>
              <a class="btn btn-sm" href="/documentos" style="color: white;"
                >Cancelar</a
              >
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
      <div class="col">
      <files-list></files-list>
      </div>
    </div>

    <!--DOCUMENTS LIST-->

    <div v-if="documents.length>0">
      <div class="card mt-2" style="background: #ecedef;">
        <div class="row g-0 m-2">
          <!--Switch-->
          <div class="col-md-2">
            <div class="form-check form-switch" style="font-size: 0.9rem;">
              <label
                class="form-check-label"
                for="swit"
                style="font-size: 0.8rem;"
                >Clásico</label
              >
              <input
                @click="cambiarFilter"
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="switch"
              />
            </div>
          </div>

          <!--Form-->
          <!--Search libre-->
          <div v-if="filter == true" class="col-md-10">
            <form @keyup="getSearchDocs">
              <div class="container" style="font-size: 0.9rem;">
                <i class="bi-search"></i>
                <input
                  class="form-control form-control-sm"
                  style="width: 98%; font-size: 0.8rem;"
                  v-model="text"
                  type="search"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <!--Search clásico-->
          <div v-else class="col-md-10">
            <form @submit.prevent="getSearchDocs">
              <div class="row" style="font-size: 0.9rem;">
                <div class="col-md-1">
                  <button type="submit" class="btn btn-primary btn-sm">
                    Buscar
                  </button>
                </div>
                <div class="col-md-1">
                  <i class="bi-search"></i>                  
                </div>
                <div class="col-md-8">                 
                  <input
                    class="form-control form-control-sm"
                    style="font-size: 0.8rem;"
                    v-model="text"
                    type="search"
                    placeholder="Search"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!--Table-->
      <table id="datos" class="table table-hover">
        <thead>
          <tr style="background: #ecedef; font-size: 1.2rem;">
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortId" class="btn btn-default btn-sm">
                Id
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortDoc_number" class="btn btn-default btn-sm">
                Doc
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortDoc_type" class="btn btn-default btn-sm">
                Tipo_doc
              </button>
            </th>
            <!-- <th>
            <img src="../../assets/sort.png" alt="" width="9" />
            <button @click="sortFirstSurname" class="btn btn-default btn-sm">
              A. Paterno
            </button>
          </th>
          <th>
            <img src="../../assets/sort.png" alt="" width="9" />
            <button @click="sortLastSurname" class="btn btn-default btn-sm">
              A. Materno
            </button>
          </th>
          <th>
            <img src="../../assets/sort.png" alt="" width="9" />
            <button @click="sortName" class="btn btn-default btn-sm">
              Nombres
            </button>
          </th>-->
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortFullname" class="btn btn-default btn-sm">
                Nombre completo
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortFile" class="btn btn-default btn-sm">
                File
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortCreated" class="btn btn-default btn-sm">
                Creado
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button class="btn btn-default btn-sm" @click="sortUpdated">
                Modificado
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button @click="sortState" class="btn btn-default btn-sm">
                Estado
              </button>
            </th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="search in searchDocs"
            :key="search.documentid"
            style="font-size: 0.9rem;"
          >
            <td>{{ search.documentid }}</td>
            <td>{{ search.doc_number }}</td>
            <td>{{ search.doc_type }}</td>
            <!--<td>{{ search.firstSurname }}</td>
          <td>{{ search.lastSurname }}</td>
          <td>{{ search.name }}</td>-->
            <td>{{ search.fullname }}</td>
            <td>
            <!--solo ejemplo google drive-->
            <a target="_blank" :href="search.file">Ver/Descargar</a>                       
            </td>
            <td v-if="search.created" >{{new Date(search.created).toLocaleString()}}</td>
            <td v-else></td>
            <td v-if="search.updated" >{{new Date(search.updated).toLocaleString()}}</td> 
            <td v-else></td>           
            <td>{{search.state}}</td>
            <td>
              <a :href="'/documentos/edit/' + search.documentid">
                <i
                  class="bi-pencil"
                  style="font-size: 1.2rem; color: #f7d43a;"
                ></i
              ></a>
            </td>
            <td>
              <a :href="'/documentos/delete/' + search.documentid"
                ><i
                  class="bi-trash-fill"
                  style="font-size: 1.2rem; color: #f7423a;"
                ></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
      <!--PAGINATION-->
      <nav aria-label="Page navigation example" style="font-size: 0.9rem;">
        <ul v-if="pagination" class="pagination justify-content-left">
          <li class="page-item disabled">
            <button class="page-link">Páginas:</button>
          </li>
          <!--Primera página-->
          <li v-if="currentPage >= 2" @click="getFirstPage" class="page-item">
            <button type="button" class="page-link">Primera</button>
          </li>
          <li v-else @click="getFirstPage" class="page-item disabled">
            <button type="button" class="page-link">Primera</button>
          </li>
          <!--Atras-->
          <li v-if="currentPage >= 2" @click="getPrevious" class="page-item">
            <button type="button" class="page-link">
              <i class="bi-chevron-left"></i>
            </button>
          </li>
          <li v-else @click="getPrevious" class="page-item disabled">
            <button type="button" class="page-link">
              <i class="bi-chevron-left"></i>
            </button>
          </li>
          <!--Pages-->
          <li
            v-for="pag in totalPages()"
            :key="pag"
            @click="getDataPages(pag)"
            class="page-item"
            :class="isActive(pag)"
          >
            <button
              v-if="currentPage - 1 < pag && pag < currentPage + 3"
              type="button"
              class="page-link"
            >
              {{ pag }}
            </button>
          </li>
          <!--Siguiente-->
          <li
            v-if="currentPage < totalPages()"
            @click="getNext"
            class="page-item"
          >
            <button
              v-if="currentPage < totalPages()"
              type="button"
              class="page-link"
            >
              <i class="bi-chevron-right"></i>
            </button>
          </li>
          <li v-else @click="getNext" class="page-item disabled">
            <button type="button" class="page-link">
              <i class="bi-chevron-right"></i>
            </button>
          </li>
          <!--Última página-->
          <li
            v-if="currentPage < totalPages()"
            @click="getLastPage"
            class="page-item"
          >
            <button type="button" class="page-link">Última</button>
          </li>
          <li v-else @click="getLastPage" class="page-item disabled">
            <button type="button" class="page-link">Última</button>
          </li>
          <!--Total-->
          <li class="page-item disabled">
            <button class="page-link">
              Total: {{ this.documents.length }}
            </button>
          </li>
        </ul>
      </nav>
      <!--Messages-->
      <small v-if="successSearch" class="text-center text-success">
        {{ successSearch }}
      </small>
      <small v-if="errSearch" class="text-center text-danger">
        {{ errSearch }}
      </small>
    </div>
    <div v-else class="alert alert-warning mt-3 text-center" style="font-size:0.9rem">
    Aún no hay registros que mostrar
    </div>
  </div>
</template>

<script>
import FilesList from "./files/Files.vue";
import axios from "axios";
export default {
  name: "documents-list",
  props: {
    title: {
      type: String,
      default: "Documentos",
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
      //archivos permitidos,
      files: [],
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
      //error de carga de archivos
      errUpload: "",
      successUpload: "",
    };
  },
  components: {
    FilesList
  },
  async mounted() {
    await this.getDocuments();
    //await this.getFiles();
    this.getDataPages(this.currentPage);
    //let myTextInput = document.getElementById("myFiles");
  },
  methods: {
    //UPLOAD FILES
    //Manejador de carga de archivos
    async handleFilesUpload() {
      const uploadedFiles = this.$refs.file.files;
      console.log(uploadedFiles);
      if (
        uploadedFiles[0].type.split("/")[1] == "pdf" ||
        uploadedFiles[0].name.split(".")[1] == "pdf" ||
        uploadedFiles[0].type.split("/")[1] == "jpg" ||
        uploadedFiles[0].name.split(".")[1] == "jpg" ||
        uploadedFiles[0].type.split("/")[1] == "jpeg" ||
        uploadedFiles[0].name.split(".")[1] == "jpeg" ||
        uploadedFiles[0].type.split("/")[1] == "png" ||
        uploadedFiles[0].name.split(".")[1] == "png"
      ) {
        console.log(uploadedFiles);
        this.files.push(uploadedFiles[0]);
        this.successUpload = "OK";
      } else {
        this.errUpload = "Formato no válido";
      }
      console.log(this.files);
    },

    async submitFiles() {
      console.log(this.files);
      const token = localStorage.getItem("token");
      let form = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        form.append("uploaded_files", this.files[i]);
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
          this.successUpload = fileResult.data.Message;
          this.errUpload = false;
          location.replace("/documentos");
        }
      } catch (error) {
        console.log({ error: error.response.data.Message });
        this.errUpload = error.response.data.Message;
      }
    },
    //Files
    /*async getFiles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/files", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result.data);
        if (result.statusText == "OK") {
          this.fileSelect = result.data.sort(
            (a, b) =>
              new Date(b.created).valueOf() - new Date(a.created).valueOf()
          );
          this.datos.file = this.fileSelect[0].url;
          this.errList = false;
        }
        //console.log(this.fileSelect[0].url);
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },*/

    //DOCUMENTS LIST
    async getDocuments() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "GET",
          url: "http://localhost:4000/api/documentos",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "GET",
            url: "http://localhost:4000/api/documentos/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
        }
        const result = await axios(myObject);
        if (result.statusText == "OK") {
          //llena campos de documentos a editar
          if (this.id != undefined) {
            this.datos.doc_number = result.data.Documentos[0].doc_number;
            this.datos.doc_type = result.data.Documentos[0].doc_type;
            this.datos.firstSurname = result.data.Documentos[0].firstSurname;
            this.datos.lastSurname = result.data.Documentos[0].lastSurname;
            this.datos.name = result.data.Documentos[0].name;
            this.datos.file = result.data.Documentos[0].file;
            this.datos.state = result.data.Documentos[0].state;
          }
          //se obtiene la lista de documentos
          this.documents = result.data.Documentos;
          //llena campos del ultimo documento
          this.datos.doc_number = result.data.Ultimo_documento[0].doc_number;
          this.datos.doc_type = result.data.Ultimo_documento[0].doc_type;
          //this.datos.file = result.data.Ultimo_documento[0].file;

          this.errList = false;
          console.log(this.documents.length);
          //console.log(this.lastDocument);
        }
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },
    //DOCUEMENTOS ADD EDIT
    async changeDocuments() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "POST",
          url: "http://localhost:4000/api/documentos",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "PUT",
            url: "http://localhost:4000/api/documentos/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
        }
        const result = await axios(myObject);
        //console.log(result);
        if (result.statusText == "Created") {
          if (this.id != undefined) {
            this.successChange = result.data.Message;
            this.errChange = false;
            location.replace("/documentos");
          }
          this.successChange = result.data.Message;
          this.errChange = false;
          console.log(this.lastDocument);
          location.replace("/documentos");
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

    //FILTRO
    sortId() {
      const asc = (a, b) => {
        return a.documentid - b.documentid;
      };
      const desc = (a, b) => {
        return b.documentid - a.documentid;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },

    sortDoc_number() {
      const asc = (a, b) => {
        return a.doc_number.localeCompare(b.doc_number);
      };
      const desc = (a, b) => {
        return b.doc_number.localeCompare(a.doc_number);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortDoc_type() {
      const asc = (a, b) => {
        return a.doc_type.localeCompare(b.doc_type);
      };
      const desc = (a, b) => {
        return b.doc_type.localeCompare(a.doc_type);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortFirstName() {
      const asc = (a, b) => {
        return a.firstSurname.localeCompare(b.firstSurname);
      };
      const desc = (a, b) => {
        return b.firstSurname.localeCompare(a.firstSurname);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortLastSurname() {
      const asc = (a, b) => {
        return a.lastSurname.localeCompare(b.lastSurname);
      };
      const desc = (a, b) => {
        return b.lastSurname.localeCompare(a.lastSurname);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortName() {
      const asc = (a, b) => {
        return a.name.localeCompare(b.name);
      };
      const desc = (a, b) => {
        return b.name.localeCompare(a.name);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortFullname() {
      const asc = (a, b) => {
        return a.fullname.localeCompare(b.fullname);
      };
      const desc = (a, b) => {
        return b.fullname.localeCompare(a.fullname);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortFile() {
      const asc = (a, b) => {
        return a.file.localeCompare(b.file);
      };
      const desc = (a, b) => {
        return b.file.localeCompare(a.file);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortCreated() {
      const asc = (a, b) => {
        return new Date(a.created).valueOf() - new Date(b.created).valueOf();
      };
      const desc = (a, b) => {
        return new Date(b.created).valueOf() - new Date(a.created).valueOf();
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortUpdated() {
      const asc = (a, b) => {
        return new Date(a.updated).valueOf() - new Date(b.updated).valueOf();
      };
      const desc = (a, b) => {
        return new Date(b.updated).valueOf() - new Date(a.updated).valueOf();
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },
    sortState() {
      const asc = (a, b) => {
        return a.state.localeCompare(b.state);
      };
      const desc = (a, b) => {
        return b.state.localeCompare(a.state);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs.sort(desc);
      }
    },

    //SEARCH
    getSearchDocs() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.documents.filter(
            (doc) =>
              (doc.documentid !== null &&
                doc.documentid.toString().indexOf(query) > -1) ||
              (doc.doc_number !== null &&
                doc.doc_number.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.doc_type !== null &&
                doc.doc_type.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.firstSurname !== null &&
                doc.firstSurname.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.lastSurname !== null &&
                doc.lastSurname.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.name !== null &&
                doc.name.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.fullname !== null &&
                doc.fullname.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.file !== null &&
                doc.file.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.created !== null &&
                doc.created.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.updated !== null &&
                doc.updated.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.state !== null && doc.state.toString().indexOf(query) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchDocs = filterItems(this.text);
          this.pagination = false;
          this.successSearch =
            "Se encontraron" + " " + this.searchDocs.length + " " + "registros";
          this.errSearch = false;
        } else {
          this.searchDocs = [];
          this.pagination = false;
          this.successSearch = false;
          this.errSearch = "No se encontraron resultados";
        }
      }
    },
    //limpiar el campo del search
    limpiarText() {
      this.text = "";
    },
    //cabiar switch a modo avanzado
    cambiarFilter() {
      if (this.filter == true) {
        this.filter = false;
      } else {
        this.filter = true;
      }
    },

    //PAGINATION
    isActive(numPage) {
      return numPage == this.currentPage ? "active" : "";
    },
    //Total de páginas
    totalPages() {
      return Math.ceil(this.documents.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.errSearch = false;
      this.successSearch = false;
      this.searchDocs = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchDocs.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchDocs.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchDocs = this.documents.slice(init, end);
      }
    },
    //primera
    getFirstPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getDataPages(1);
    },
    //Atrás
    getPrevious() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getDataPages(this.currentPage);
    },
    //Siguiente
    getNext() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
      this.getDataPages(this.currentPage);
    },
    //Último
    getLastPage() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
      this.getDataPages(this.totalPages());
    },
  },
};
</script>

<style></style>
