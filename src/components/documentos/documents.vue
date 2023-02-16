<template>
  <div class="container-md mt-2">
    <!--Llamamos al componente headerWiev de navegación-->
    <div class="container"><header-view></header-view></div>
    <!--DOCUMENTSADD-->
    <div class="container">
      <div class="card-header-sm mt-2">
        <h5 class="modal-title" id="addModalLabel">
          {{ title }}
        </h5>
      </div>
      <!--card header-->
      <div class="card mt-2 bg-light">
        <div class="card-body-sm m-3">
          <form @submit.prevent="changeDocs" class="mt-2">
            <!--Campo doc_number-->
            <div class="container-sm mb-0">
              <label class="col-form-label-sm">Num_doc:</label>
              <input
                v-model="datos.doc_number"
                type="text"
                size="60"
                class="form-control-sm m-2"
                style="border-width: thin;"
                minlength="6"
                maxlength="60"
                required
                autofocus
              />
              <span>
                <small
                  v-if="
                    6 > datos.doc_number.length || datos.doc_number.length > 200
                  "
                  class="text-danger"
                  style="font-size: 0.7rem;"
                  >Mínimo 6 caracteres y máximo 60</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.3rem;"
                ></small>
              </span>
            </div>
            <!--Campo typeid-->
            <div class="container-sm mb-0">
              <label class="col-form-label-sm">Tipo_doc:</label>
              <select
                v-model="datos.typeid"
                class="form-select-sm m-2"
                required
              >
                <option value=""></option>
                <option
                  v-for="(typ, index) in types"
                  :key="index"
                  :value="types[index].typeid"
                  >{{ types[index].name_type }}
                </option>
              </select>
              <span>
                <small
                  v-if="datos.typeid === '' || datos.typeid == undefined"
                  class="text-danger"
                  >Requerido</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.3rem;"
                ></small>
              </span>
            </div>
            <!--Campo file-->
            <div class="container-sm mb-0">
              <label class="col-form-label-sm">File:</label>
              <select v-model="datos.file" class="form-select-sm m-2">
                <option value=""></option>
                <option
                  v-for="(fil, index) in files"
                  :key="index"
                  :value="files[index].name"
                  >{{ files[index].url }}
                </option>
              </select>
              <span>
                <small
                  v-if="datos.file === '' || datos.file == undefined"
                  class="text-warning"
                  >Opcional</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.3rem;"
                ></small>
              </span>
            </div>
            <!--Campo State-->
            <div v-if="id != undefined" class="container-sm mb-0">
              <label for="" class="col-form-label">Estado</label>
              <select v-model="datos.state" class="form-select-sm m-2" required>
                <option value=""></option>
                <option value="0">0</option>
                <option value="1">1</option>
              </select>
              <span>
                <small
                  v-if="datos.state === '' || datos.state == undefined"
                  class="text-danger"
                  >Requerido</small
                >
                <small
                  v-else
                  class="bi-check-lg text-success"
                  style="font-size: 1.3rem;"
                ></small>
              </span>
            </div>
            <div class="card-footer-sm mt-1" style="background: #ccd1d1;">
              <button
                v-if="id != undefined"
                type="submit"
                class="btn btn-light btn-sm m-3"
              >
                Actualizar
              </button>
              <button v-else type="submit" class="btn btn-light btn-sm m-3">
                Guardar
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
        </div>
      </div>
    </div>
    <!--DOCUMENTS LIST-->
    <div class="container">
      <div class="card mt-3 bg-light" style="font-size: 0.9rem;">
        <div class="card-body-sm m-3">
          <!--Switch-->
          <div style="col-12">
            <div class="form-check form-switch">
              <label class="form-check-label" for="swit"
                >Búsqueda estrícta</label
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
          <div v-if="filter == true" class="col-12">
            <form @keyup="getSearchDocs" class="mt-2">
              <div class="container m-2">
                <i class="bi-search"></i>
                <input
                  class="border rounded"
                  style="width: 93%;"
                  v-model="text"
                  type="search"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <!--Search estricto-->
          <div v-else class="col-12">
            <form @submit.prevent="getSearchDocs" class="mt-4">
              <div
                class="btn-group center"
                role="group"
                aria-label="Basic mixed styles example"
              >
                <button
                  v-if="text"
                  type="button"
                  class="btn btn-secondary btn-sm m-1"
                  @click="limpiarText"
                >
                  Limpiar
                </button>
                <button type="submit" class="btn btn-primary btn-sm m-1">
                  Buscar
                </button>
                <button
                  v-if="successList.length > 0 || errList.length > 0"
                  @click="getDataPages(1)"
                  type="button"
                  class="btn btn-warning btn-sm m-1"
                >
                  Salir
                </button>
              </div>
              <i class="bi-search m-2">
                <input
                  class="border rounded"
                  style="width: 72%;"
                  v-model="text"
                  type="search"
                  placeholder="Search"
                />
              </i>
            </form>
          </div>
        </div>
      </div>

      <!--Table-->
      <div class="col-12 mt-2">
        <table
          id="datos"
          class="table table-hover table-bordered table-responsive"
        >
          <thead>
            <tr style="font-size: 0.8rem; background: #ecedef;">
              <th>
                <img src="../../assets/sort.png" alt="" width="9" />
                <button @click="sortId" class="btn btn-default btn-sm">
                  Id
                </button>
              </th>
              <th>
                <img src="../../assets/sort.png" alt="" width="9" />
                <button @click="sortTypeid" class="btn btn-default btn-sm">
                  Tipo_doc
                </button>
              </th>
              <th>
                <img src="../../assets/sort.png" alt="" width="9" />
                <button @click="sortDoc_number" class="btn btn-default btn-sm">
                  NumDoc
                </button>
              </th>
              <th>
                <img src="../../assets/sort.png" alt="" width="9" />
                <button @click="sortFile" class="btn btn-default btn-sm">
                  Archivo
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="search in searchDocs"
              :key="search.documentid"
              style="font-size: 0.8rem;"
            >
              <td>{{ search.documentid }}</td>
              <td>{{ search.typeid }}</td>
              <td>{{ search.doc_number }}</td>
              <td>
                <a :href="'/files/download/' + search.file">{{
                  search.file
                }}</a>
              </td>
              <td>{{ search.created }}</td>
              <td>{{ search.updated }}</td>
              <td>{{ search.state }}</td>
              <td>
                <a class="m-2" :href="'/documentos/edit/' + search.documentid">
                  <i
                    class="bi-pencil"
                    style="font-size: 1.1rem; color: #f7d43a;"
                  ></i
                ></a>
                <a class="m-2" :href="'/documentos/delete/' + search.documentid"
                  ><i
                    class="bi-trash-fill"
                    style="font-size: 1.1rem; color: #f7423a;"
                  ></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--PAGINATION-->
      <div class="col-12">
        <nav aria-label="Page navigation" style="font-size: 0.9rem;">
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
              <button class="page-link">Total: {{ this.docs.length }}</button>
            </li>
          </ul>
        </nav>
      </div>
      <!--Messages-->
      <small v-if="successList" class="text-success">{{ successList }} </small>
      <small v-if="errList" class="text-danger">{{ errList }}</small>
    </div>
  </div>
</template>

<script>
import headerView from "../../views/HeaderViewDocs/headerView.vue";
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
      //DOCUMENTS ADD, DOCUMENTS EDIT
      //datos originales que se recibe del servidor
      datos: {
        doc_number: "",
        typeid: "",
        file: "",
        state: "",
      },
      id: this.$route.params.id,
      //files
      files: [],
      types: [],

      //DOCUMENTSLIST
      //list
      docs: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchDocs: [],
      text: "",
      //Messages
      errChange: "",
      successChange: "",
      errList: "",
      successList: "",
    };
  },
  components: {
    headerView,
  },
  async mounted() {
    await this.getDocs();
    await this.listFiles();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //list documents and types
    async getDocs() {
      try {
        const token = localStorage.getItem("token");
        let url = "http://localhost:4000/api/docs/data/";
        if (this.id != undefined) {
          url = url + this.id;
        }
        const result = await axios({
          method: "GET",
          url: url,
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result.data.lists);
        if (result.statusText == "OK") {
          if (result.data.lists.documents_ById[0].length > 0) {
            //llena los campos a editar
            this.datos.typeid = result.data.lists.documents_ById[0][0].typeid;
            this.datos.doc_number =
              result.data.lists.documents_ById[0][0].doc_number;
            this.datos.file = result.data.lists.documents_ById[0][0].file;
            this.datos.state = result.data.lists.documents_ById[0][0].state;
          } else {
            //limplia los campos
            this.datos.typeid = "";
            this.datos.doc_number = "";
            this.datos.file = "";
            this.datos.state = "";
          }
          //llena los array de documents y types
          this.docs = result.data.lists.documents[0];
          this.types = result.data.lists.types[0];
        }
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error.response);
      }
    },
    //list files
    async listFiles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/files", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        //console.log(result);
        if (result.statusText == "OK") {
          this.files = result.data;
          this.errList = false;
        } else {
          console.log("No hay files que mostrar");
        }
        //console.log(this.files);
      } catch (error) {
        this.errList = error.response;
        console.log(error.response);
      }
    },
    //add an edit documents
    async changeDocs() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          url: "http://localhost:4000/api/documentos/",
          method: "POST",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        //console.log(myObject);
        if (this.id != undefined) {
          myObject = {
            url: "http://localhost:4000/api/documentos/" + this.id,
            method: "PUT",
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
          //console.log(myObject);
        }
        const result = await axios(myObject);
        if (result.statusText == "Created") {
          this.successChange = result.data.Message;
          this.errChange = false;
          location.replace("/documentos");
        }
      } catch (error) {
        this.errChange = error.response.data.Message;
        console.log(error.response);
      }
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

    sortTypeid() {
      const asc = (a, b) => {
        return a.typeid - b.typeid;
      };
      const desc = (a, b) => {
        return b.typeid - a.typeid;
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
          return this.docs.filter(
            (doc) =>
              (doc.documentid !== null &&
                doc.documentid.toString().indexOf(query) > -1) ||
              (doc.typeid !== null &&
                doc.typeid.toString().indexOf(query) > -1) ||
              (doc.doc_number !== null &&
                doc.doc_number.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
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
          this.successList =
            "Se encontraron" + " " + this.searchDocs.length + " " + "registros";
          this.errList = false;
        } else {
          this.searchDocs = [];
          this.pagination = false;
          this.successList = false;
          this.errList = "No se encontraron resultados";
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
      return Math.ceil(this.docs.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.errList = false;
      this.successList = false;
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
        this.searchDocs = this.docs.slice(init, end);
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
