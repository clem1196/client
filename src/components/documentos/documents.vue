<template>
  <div class="container-fluid">
    <!--DOCUMENTS ADD, EDIT-->
    <div class="row">
      <!--Add, Edit-->
      <div class="col-12">
        <!--form-->
        <div class="card-form">
          <form @submit.prevent="changeDocuments" class="form-document">
            <!--Campo doc_number-->
            <div class="row">
              <div class="label-form-size">
                <label for="inputdoc_number" class="form-label-sm">
                  Doc:
                </label>
              </div>
              <div class="input-form-size">
                <input
                  v-model="datos.doc_number"
                  name="inputNameDoc_number"
                  id="inputdoc_number"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="100"
                  minlength="6"
                  required
                />
              </div>
              <div class="validation-form-size">
                <small
                  v-if="
                    datos.doc_number === '' ||
                    datos.doc_number == undefined ||
                    datos.doc_number.length < 6
                  "
                  class="check-field-false"
                  >Mínimo 06 caracteres</small
                >
                <small v-else class="bi-check-lg check-field-true"></small>
              </div>
            </div>
            <!--Campo doc_type-->
            <div class="row">
              <div class="label-form-size">
                <label for="inputdoc_type" class="form-label-sm">Tipo: </label>
              </div>
              <div class="input-form-size">
                <select
                  v-model="datos.doc_type"
                  class="form-select form-select-sm"
                  name="inputNameDoc_type"
                  id="inputdoc_type"
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
              </div>
              <div class="validation-form-size">
                <span>
                  <small
                    v-if="datos.doc_type === '' || datos.doc_type == undefined"
                    class="check-field-false"
                    >Opcional</small
                  >
                  <small v-else class="bi-check-lg check-field-true"></small>
                </span>
              </div>
            </div>
            <!--Campo file-->
            <div class="row">
              <div class="label-form-size">
                <label for="inputfile" class="form-label-sm">File:</label>
              </div>
              <div class="input-form-size">
                <input
                  v-model="datos.file"
                  name="inputNameFile"
                  id="inputfile"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="2083"
                  required
                />
              </div>
              <div class="validation-form-size">
                <span>
                  <small
                    v-if="datos.file == '' || datos.file == undefined"
                    class="check-field-false"
                    >Opcional</small
                  >
                  <small v-else class="bi-check-lg check-field-true"></small>
                </span>
              </div>
            </div>
            <!--Campo firstSurname-->
            <div class="row">
              <div class="label-form-size">
                <label for="inputfirstSurname" class="form-label-sm"
                  >Ap. paterno:</label
                >
              </div>
              <div class="input-form-size">
                <input
                  v-model="datos.firstSurname"
                  id="inputfirstSurname"
                  name="inputNameFirstSurname"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="45"
                />
              </div>
              <div class="validation-form-size">
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
            </div>
            <!--Campo lastSurname-->
            <div class="row">
              <div class="label-form-size">
                <label for="inputlastSurname" class="form-label-sm"
                  >Ap. Materno:</label
                >
              </div>
              <div class="input-form-size">
                <input
                  v-model="datos.lastSurname"
                  name="inputNameLastSurName"
                  id="inputlastSurname"
                  type="text"
                  class="form-control form-control-sm"
                  maxlength="45"
                />
              </div>
              <div class="validation-form-size">
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
            </div>
            <!--Campo name-->
            <div class="row">
              <div class="label-form-size">
                <label for="inputname" class="form-label-sm">Nombres:</label>
              </div>
              <div class="input-form-size">
                <input
                  v-model="datos.name"
                  id="inputname"
                  name="inputNameName"
                  type="text"
                  class="form-control form-control-sm"
                  required
                  minlength="2"
                  maxlength="45"
                />
              </div>
              <div class="validation-form-size">
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
            </div>
            <!--Campo State-->
            <div v-if="id != undefined" class="row">
              <div class="label-form-size">
                <label for="inputstate" class="form-label-sm">Estado</label>
              </div>
              <div class="input-form-size">
                <select
                  v-model="datos.state"
                  class="form-select form-select-sm"
                  name="inputNameState"
                  id="inputstate"
                >
                  <option value=""></option>
                  <option value="Activo">Activo</option>
                  <option value="Pasivo">Pasivo</option>
                </select>
              </div>
              <div class="validation-form-size">
                <span>
                  <small
                    v-if="datos.state == 'Activo' || datos.state == 'Pasivo'"
                    class="bi-check-lg check-field-true"
                  ></small>
                  <small v-else class="check-field-false">Opcional</small>
                </span>
              </div>
            </div>
            <!--botones guardar y cancelar-->
            <div v-if="id != undefined" class="m-4">
              <div class="row">
                <div class="col-auto">
                  <button type="submit" class="btn-form-doc">Actualizar</button>
                </div>
                <div class="col-auto">
                  <a class="btn-form-doc cancel" href="/documentos">Cancelar</a>
                </div>
              </div>
            </div>
            <div v-else class="m-4">
              <div class="row">
                <div class="col-auto">
                  <button type="submit" class="btn-form-doc">Guardar</button>
                </div>
                <div class="col-auto">
                  <button class="btn-form-doc clean" @click="limpiarCampos">
                    Limpiar
                  </button>
                </div>
                <div class="col-auto">
                  <a class="btn-form-doc cancel" href="/documentos">Cancelar</a>
                </div>
              </div>
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
        <!--DOCUMENTS LIST-->
        <div v-if="documents.length > 0" class="mt-3">
          <div class="card-search">
            <div class="row row-search">
              <!--Switch-->
              <div class="col-auto">
                <div class="form-check form-switch">
                  <label class="form-check-label" for="swit">Clásica</label>
                  <input
                    @click="cambiarFilter"
                    name="inputNameSwitch"
                    class="form-check-input"
                    type="checkbox"
                    role="roleSwitch"
                    id="swit"
                  />
                </div>
              </div>

              <!--Form-->
              <div class="col-auto">
                <!--Search libre-->
                <form v-if="filter == true" @keyup="getSearchDocs">
                  <div class="row m-2">
                    <div class="col-auto">
                      <i class="bi-search"></i>
                      <input
                        v-model="text"
                        id="inputFreeId"
                        name="inputFree"
                        class="form-control form-control-sm"
                        type="search"
                        placeholder=""
                      />
                    </div>
                  </div>
                </form>

                <!--Search Clasic-->
                <form v-else @submit.prevent="getSearchDocs">
                  <div class="row">
                    <div class="col-auto">
                      <button type="submit" class="btn-form-doc">Buscar</button>
                    </div>
                    <div class="col-auto">
                      <button
                        v-if="successSearch.length > 0 || errSearch.length > 0"
                        @click="getDataPages(1)"
                        type="button"
                        class="btn-form-doc cancel"
                      >
                        Salir
                      </button>
                      <button
                        v-else
                        disabled
                        type="button"
                        class="btn-form-doc search-out"
                      >
                        Salir
                      </button>
                    </div>
                    <div class="col-auto mt-1">
                      <i class="bi-search"></i>
                      <input
                        v-model="text"
                        id="inputSearchDocs"
                        name="inputClasicDocs"
                        class="form-control form-control-sm"
                        type="search"
                        placeholder=""
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
              <tr class="thead-tr">
                <th>
                  <i class="bi-filter"></i>
                  <button @click="sortId" class="btn btn-sm th-font-size">
                    Id
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button
                    @click="sortDoc_number"
                    class="btn btn-sm th-font-size"
                  >
                    Doc
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button @click="sortDoc_type" class="btn btn-sm th-font-size">
                    Tipo
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button @click="sortFullname" class="btn btn-sm th-font-size">
                    Nombre
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button @click="sortFile" class="btn btn-sm th-font-size">
                    File
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button @click="sortCreated" class="btn btn-sm th-font-size">
                    Creado
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button class="btn btn-sm th-font-size" @click="sortUpdated">
                    Modificado
                  </button>
                </th>
                <th>
                  <i class="bi-filter"></i>
                  <button @click="sortState" class="btn btn-sm th-font-size">
                    Estado
                  </button>
                </th>
                <th>
                  <button class="btn btn-sm th-font-size">Action</button>
                </th>                
              </tr>
            </thead>
            <tbody>
              <tr
                class="tbody-tr"
                v-for="search in searchDocs"
                :key="search.documentid"
              >
                <td>{{ search.documentid }}</td>
                <td>{{ search.doc_number }}</td>
                <td>{{ search.doc_type }}</td>
                <!--<td>{{ search.firstSurname }}</td>
                <td>{{ search.lastSurname }}</td>
                <td>{{ search.name }}</td>-->
                <td>{{ search.fullname }}</td>
                <td class="text-center">
                  <!--solo ejemplo google drive-->
                  <a target="_blank" :href="search.file"
                    ><i class="bi-link size-link" title="Ver/Descargar"></i
                  ></a>
                </td>
                <td v-if="search.created">
                  {{ new Date(search.created).toLocaleString() }}
                </td>
                <td v-else></td>
                <td v-if="search.updated">
                  {{ new Date(search.updated).toLocaleString() }}
                </td>
                <td v-else></td>
                <td class="text-center">{{ search.state }}</td>
                <td>
                  <a
                    :href="'/documentos/edit/' + search.documentid"
                    title="Edit"
                  >
                    <i class="bi-pencil size-pencil"></i
                  ></a>
                  |
                  <a
                    :href="'/documentos/delete/' + search.documentid"
                    title="Delete"
                    ><i class="bi-trash-fill size-trash"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
          <!--PAGINATION-->
          <nav
            aria-label="Page navigation example"
            class="font-size-pagination"
          >
            <ul v-if="pagination" class="pagination justify-content-left">
              <li class="page-item disabled">
                <button class="page-link">Páginas:</button>
              </li>
              <!--Primera página-->
              <li
                v-if="currentPage >= 2"
                @click="getFirstPage"
                class="page-item"
              >
                <button type="button" class="page-link">Primera</button>
              </li>
              <li v-else @click="getFirstPage" class="page-item disabled">
                <button type="button" class="page-link">Primera</button>
              </li>
              <!--Atras-->
              <li
                v-if="currentPage >= 2"
                @click="getPrevious"
                class="page-item"
              >
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
        <div v-else class="alert alert-warning mt-3 text-center">
          Aún no hay registros que mostrar
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      //archivos para llenar el campo file
      fileSelect: [],

      //DOCUMENTS LIST
      //list
      documents: [],
      //pagination
      currentPage: 1,
      rows: 3,
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
    //await this.getFiles();
    this.getDataPages(this.currentPage);
    //let myTextInput = document.getElementById("myFiles");
  },
  methods: {
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

<style scoped>
.card-form {
  position: relative;
  border: 0.01px solid #eae4eb;
  border-radius: 0.25rem;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  flex-direction: column;
  align-items: center;
}
.form-document {
  
  margin-bottom: 0%;
  margin-top: 1%;
  margin-left: 2%;
  font-size: 0.8rem;
}
.form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  padding-left: 1.5rem;
}
.form-select-sm {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.2rem;
}
.label-form-size {
  flex: 0 0 auto;
  width: 10%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  padding-left: 1%;
  padding-right: 0.5%;
}
.input-form-size {
  flex: 0 0 auto;
  width: 78%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  padding-left: 0.5%;
  padding-right: 0.5%;
}
.validation-form-size {
  flex: 0 0 auto;
  width: 11%;
  padding-left: 0%;
}
.check-field-true {
  font-size: 1.2rem;
  color: #00acc1;
}
.check-field-false {
  color: #ab47bc;
  font-size: 0.73rem;
}

.btn-form-doc {
  color: white;
  border-radius: 0.25rem;
  background-color: #00acc1;
  font-size: 0.85rem;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
}
.btn-form-doc.clean {
  color: white;
  background-color: #ab47bc;
}
.btn-form-doc.cancel {
  color: #ab47bc;
  background-color: transparent;
  text-decoration: none;
}
.card-search {
  position: relative;
  display: flex;
  flex-direction: column;
  border: none;
  background-color: #e0f7fa;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
.btn-form-doc.search-out {
  color: #ab47bc;
  background-color: transparent;
  text-decoration: none;
}
.btn-form-doc.search-out:disabled {
  color: #a29ea2;
  background-color: transparent;
  text-decoration: none;
  cursor: auto;
}
.bi-search {
  color: #626f6f;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.font-size-pagination {
  font-size: 0.8rem;
}
.thead-tr {
  background: #00acc1;
  text-align: center;
}
.th-font-size {
  font-size: 0.9rem;
  color: white;
}
/*Table tbody*/
.tbody-tr {
  font-size: small;
  background-color: none;
  text-align: center;
}
.size-link {
  font-size: 1.3rem;
  color: #ab47bc;
}
.size-pencil {
  font-size: 1rem;
  color: #f7d43a;
}
.size-trash {
  font-size: 1rem;
  color: #ba68c8;
}
.row-search {
  padding-left: 20px;
  padding-top: 6px;
  align-items: center;
  padding-bottom: 6px;
}
.col-auto {
  flex: 0 0 auto;
  width: auto;
  position: relative;
}
.form-check {
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: none;
}

.form-check-input:checked {
  background-color: #ab47bc;
  border-color: #ab47bc;
}
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #ab47bc;
  border-color: #ab47bc;
}
.page-link {
  color: #ba68c8;
}
</style>
