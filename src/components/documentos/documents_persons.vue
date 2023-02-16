<template>
  <div class="container-md mt-2">
    <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>
    <!--<view-docs></view-docs>-->

    <!--DOCS_PERSONS ADD-->
    <!--modal header-->
    <div class="container-sm mt-4">
      <h5 class="title">
        {{ title }}
      </h5>
    </div>
    <!--modal header-->
    <div class="card bg-light">
      <form @submit.prevent="changeDocs_Persons" class="m-2">
        <!--Campo documentid-->
        <div class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Doc:</label>
          <select
            v-model="datos.documentid"
            class="form-select-sm m-2"
            required
          >
            <option value=""></option>
            <option
              v-for="(doc, index) in documents"
              :key="index"
              :value="documents[index].documentid"
              >{{ documents[index].doc_number }}
            </option>
          </select>
          <span>
            <small
              v-if="datos.documentid == '' || datos.documentid == undefined"
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
        <!--Campo fullname-->
        <div class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Personas:</label>
          <select
            v-model="datos.personid"
            class="form-control-sm m-2"
            maxlength="45"
            minlength="2"
            required
          >
            <option value=""></option>
            <option
              v-for="(per, index) in persons"
              :key="index"
              :value="persons[index].personid"
              >{{ persons[index].fullname }}
            </option>
          </select>
          <span>
            <small
              v-if="datos.personid === '' || datos.personid == undefined"
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
        <!--Campo State-->
        <div v-if="id != undefined" class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Estado</label>
          <select v-model="datos.state" class="form-select-sm m-2" required>
            <option value=""></option>
            <option value="Atendido">Atendido</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Rechazado">Rechazado</option>
          </select>
          <span>
            <small
              v-if="datos.state.length > 0"
              class="bi-check-lg text-success"
              style="font-size: 1.3rem;"
            >
            </small>
            <small v-else class="text-danger"> Requerido</small>
          </span>
        </div>
        <!--botones guardar y cancelar-->
        <div class="card-footer-sm mt-2 m-2" style="background: #ccd1d1;">
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
          <a class="btn btn-sm" href="/doc_personas" style="color: white;"
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

    <!--PERSONLIST-->
    <div class="card bg-light mt-4">
      <!--Switch-->
      <div class="container mt-4" style="font-size: 0.9rem;">
        <div class="form-check form-switch">
          <label class="form-check-label" for="swit">Búsqueda estrícta</label>
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
      <div v-if="filter == true" class="col-12 m-2" style="font-size: 0.9rem;">
        <form @keyup="getSearchDocs_Persons" class="mt-2">
          <i class="bi-search"></i>
          <input
            class="border rounded"
            style="width: 93%;"
            v-model="text"
            type="search"
            placeholder="Search"
          />
        </form>
      </div>
      <!--Search estricto-->
      <div v-else class="col-12 m-2" style="font-size: 0.9rem;">
        <form @submit.prevent="getSearchDocs_Persons">
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
              style="width: 73%;"
              v-model="text"
              type="search"
              placeholder="Search"
            />
          </i>
        </form>
      </div>
    </div>

    <!--Table-->
    <table id="datos" class="table table-hover mt-1">
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
            <button @click="sortUser" class="btn btn-default btn-sm">
              Usuario
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
            <button @click="sortFullname" class="btn btn-default btn-sm">
              Persona
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
            <button @click="sortUpdated" class="btn btn-default btn-sm">
              Modificado
            </button>
          </th>
          <th>
            <img src="../../assets/sort.png" alt="" width="9" />
            <button class="btn btn-default btn-sm" @click="sortState">
              Estado
            </button>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="search in searchDocs_Persons"
          :key="search.id"
          style="font-size: 0.9rem;"
        >
          <td>{{ search.id }}</td>
          <td>{{ search.nombre_usuario }}</td>
          <td>{{ search.doc_number }}</td>
          <td>{{ search.fullname }}</td>
          <td>{{ search.created }}</td>
          <td>{{ search.updated }}</td>

          <td>{{ search.state }}</td>
          <td>
            <a :href="'/doc_personas/edit/' + search.id">
              <i
                class="bi-pencil"
                style="font-size: 1.2rem; color: #f7d43a;"
              ></i
            ></a>
          </td>
          <td>
            <a :href="'/doc_personas/delete/' + search.id"
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
            Total: {{ this.docs_persons.length }}
          </button>
        </li>
      </ul>
    </nav>

    <!--Messages-->
    <small v-if="successList" class="text-center text-success">
      {{ successList }}
    </small>
    <small v-if="errList" class="text-center text-danger">
      {{ errList }}
    </small>
    <small v-if="warningList" class="text-center text-warning">
      {{ warningList }}
    </small>
  </div>
</template>

<script>
import headerView from "../../views/HeaderViewDocs/headerView.vue";
//import ViewDocs from "../../views/viewDocs.vue";
import axios from "axios";
export default {
  name: "documents-persons-list",
  props: {
    title: {
      type: String,
      default: "Doc_Personas",
    },
  },
  data() {
    return {
      //DOCS_PERSONS ADD EDIT
      //datos originales que se recibe del servidor
      datos: {
        documentid: "",
        personid: "",
        state: "",
      },
      id: this.$route.params.id,
      documents: [],
      persons: [],

      //DOCS_PERSONS LIST
      //list
      docs_persons: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchDocs_Persons: [],
      text: "",
      //Messages
      errChange: "",
      successChange: "",
      warningChange: "",
      errList: "",
      successList: "",
      warningList: "",
    };
  },
  components: {
    headerView,
  },
  async mounted() {
    await this.getDocs_Persons();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //PERSONSLIST

    async getDocs_Persons() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "GET",
          url: "http://localhost:4000/api/docs/data",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "GET",
            url: "http://localhost:4000/api/docs/data/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
        }
        const result = await axios(myObject);
        console.log(result.data.lists);
        console.log(result.data.lists.doc_persons[0].length);
        if (result.statusText == "OK") {
          //llena campos de doc_persons a editar
          if (result.data.lists.doc_persons_ById[0].length > 0) {
            this.datos.documentid =
              result.data.lists.doc_persons_ById[0][0].documentid;
            this.datos.personid =
              result.data.lists.doc_persons_ById[0][0].personid;
            this.datos.state = result.data.lists.doc_persons_ById[0][0].state;
          }
          //llena el array docs_persons
          if (
            result.data.lists.doc_persons_ByDocNumber_and_PersonFullname[0]
              .length > 0
          ) {
            this.docs_persons =
              result.data.lists.doc_persons_ByDocNumber_and_PersonFullname[0];
            this.errList = false;
          } else {
            this.warningList = "No hay docs_persons";
          }
          //llena el array persons
          if (result.data.lists.persons[0].length > 0) {
            this.persons = result.data.lists.persons[0];
          } else {
            this.warningList = "No hay personas";
          }
          //llena el array documents
          if (result.data.lists.documents[0].length) {
            this.documents = result.data.lists.documents[0];
          } else {
            this.warningList = "No hay documents";
          }
          this.errList = false;
        }
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },

    //DOCUMENTS_PERSONS ADD EDIT
    async changeDocs_Persons() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "POST",
          url: "http://localhost:4000/api/doc-person",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "PUT",
            url: "http://localhost:4000/api/doc-person/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
        }
        const result = await axios(myObject);
        console.log(result);
        if (result.statusText == "Created") {
          this.successChange = result.data.Message;
          this.errChange = false;
          //location.replace("/personas");
          //location.replace("/doc_personas/add");
        }
      } catch (error) {
        this.errChange = error.response.data.Message;
        console.log(error.response);
      }
    },

    //FILTRO
    sortId() {
      const asc = (a, b) => {
        return a.id - b.id;
      };
      const desc = (a, b) => {
        return b.id - a.id;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
      }
    },
    sortUser() {
      const asc = (a, b) => {
        return a.userid.localeCompare(b.userid);
      };
      const desc = (a, b) => {
        return b.userid.localeCompare(a.userid);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
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
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
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
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
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
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
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
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
      }
    },
    sortState() {
      const asc = (a, b) => {
        return a.state - b.state;
      };
      const desc = (a, b) => {
        return b.state - a.state;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchDocs_Persons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchDocs_Persons.sort(desc);
      }
    },

    //SEARCH
    getSearchDocs_Persons() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.docs_persons.filter(
            (doc) =>
              (doc.id !== null && doc.id.toString().indexOf(query) > -1) ||
              (doc.doc_number !== null &&
                doc.doc_number.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.userid !== null &&
                doc.userid.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.fullname !== null &&
                doc.fullname.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.created !== null &&
                doc.created.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.updated !== null &&
                doc.updated.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.state !== null && doc.state.toString().indexOf(query) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchDocs_Persons = filterItems(this.text);
          this.pagination = false;
          this.successList =
            "Se encontraron" +
            " " +
            this.searchDocs_Persons.length +
            " " +
            "registros";
          this.errList = false;
        } else {
          this.searchDocs_Persons = [];
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
      return Math.ceil(this.docs_persons.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.errList = false;
      this.successList = false;
      this.searchDocs_Persons = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchDocs_Persons.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchDocs_Persons.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchDocs_Persons = this.docs_persons.slice(init, end);
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
