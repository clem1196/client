<template>
  <div class="container-fluid mt-3">
    <div class="card card-title">Documents</div>
    <a
      href="/documentos/add"
      type="button"
      class="btn-form-doc icon-add"
      title=" Add document"
      ><i class="bi-file-earmark-plus-fill"></i
    ></a>
    <!--DOCUMENTS LIST-->
    <div class="row">
      <div v-if="documents.length > 0" class="col-12">
        <div class="card-search">
          <div class="row row-search">
            <!--Switch-->
            <div class="col-auto">
              <div class="form-check form-switch" title="Classic mode">
                <label class="form-check-label" for="switDocList"></label>
                <input
                  @click="cambiarFilter"
                  name="inputNameSwitch"
                  class="form-check-input"
                  type="checkbox"
                  role="roleSwitch"
                  id="switDocList"
                />
              </div>
            </div>

            <!--Form-->
            <div class="col-auto">
              <!--Search libre-->
              <form v-if="filter == true" @keyup="getSearchDocs">
                <div class="row m-1">
                  <div class="col-auto">
                    <i class="bi-search"></i>
                    <input
                      v-model="text"
                      id="inputFreeId"
                      name="inputFree"
                      class="form-control form-control-sm search"
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
                      class="form-control form-control-sm search"
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
                <button @click="sortDocumentid" class="btn btn-sm th-font-size">
                  Id
                </button>
              </th>
              <th>
                <i class="bi-filter"></i>
                <button @click="sortDoc_number" class="btn btn-sm th-font-size">
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
                <a :href="'/documentos/edit/' + search.documentid" title="Edit">
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
        <nav aria-label="Page navigation example" >
          <ul v-if="pagination" class="pagination justify-content-center">
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
              <button class="page-link">Última</button>
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
        const result = await axios(myObject);
        //console.log(result.data.Documentos);
        if (result.statusText == "OK") {
          //se obtiene la lista de documentos
          this.documents = result.data.Documentos;
          //llena campos de documentos a editar
        }
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },
    //filter
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
    //sort
    sortDocumentid() {
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
