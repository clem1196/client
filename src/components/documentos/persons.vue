<template>
  <div class="container-md mt-2">
    <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>

    <!--PERSONS ADD EDIT-->
    <!--title-->
    <div class="container-sm mt-4">
      <h5 class="title">
        {{ title }}
      </h5>
    </div>
    <!--form-->
    <div class="card bg-light">
      <form @submit.prevent="changePersons" class="m-2">
        <!--Campo documentid-->
        <div class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Doc:</label>
          <select
            v-model="datos.documentid"
            class="form-select-sm m-2"
            required
          >
            <option ></option>
            <option
              v-for="(doc, index) in documents"
              :key="index"
              :value="documents[index].documentid"
              >{{ documents[index].doc_number }}
            </option>
          </select>
          <span>
            <small
              v-if="datos.documentid === '' || datos.documentid == undefined"
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
        <!--Campo firstSurname-->
        <div class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Ap. paterno:</label>
          <input
            v-model="datos.firstSurname"
            type="text"
            class="form-control-sm m-2"
            style="border-width: 0.1rem;"
            maxlength="45"            
            size="24"
          />
          <span>
          <small
              v-if="datos.firstSurname===''||datos.firstSurname==undefined"
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
        <!--Campo lastSurname-->
        <div class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Ap. Materno:</label>
          <input
            v-model="datos.lastSurname"
            type="text"
            class="form-control-sm m-2"
            style="border-width: 0.1rem;"
            size="24"
            maxlength="45"
          />
          <span>
          <small
              v-if="datos.lastSurname===''||datos.lastSurname==undefined"
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
        <!--Campo name-->
        <div class="container-sm mb-0">
          <label for="" class="col-form-label-sm">Nombres:</label>
          <input
            v-model="datos.name"
            type="text"
            class="form-control-sm m-2"
            style="border-width: 0.1rem;"
            size="45"
            required
            minlength="2"
            maxlength="45"
          />
          <span>
            <small v-if="datos.name.length < 2" class="text-danger"
              >Requerido</small
            >
            <small v-if="datos.name.length > 44" class="text-danger"
              >No se acepta mas caracteres</small
            >
            <small
              v-if="1 < datos.name.length && datos.name.length < 45"
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
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
          <span>
            <small
              v-if="datos.state === '' || datos.state == 'Seleccione'"
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
          <a class="btn btn-sm" href="/personas" style="color: white;"
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
            <form @keyup="getSearchPersons" class="mt-2">
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
            <form @submit.prevent="getSearchPersons" class="mt-4">
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
            <button @click="sortDocumentid" class="btn btn-default btn-sm">
              Doc
            </button>
          </th>
          <th>
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
          v-for="search in searchPersons"
          :key="search.personid"
          style="font-size: 0.9rem;"
        >
          <td>{{ search.personid }}</td>
          <td>{{ search.documentid }}</td>
          <td>{{ search.firstSurname }}</td>
          <td>{{ search.lastSurname }}</td>
          <td>{{ search.name }}</td>
          <td>{{ search.created }}</td>
          <td>{{ search.updated }}</td>
          <td>{{ search.state }}</td>
          <td>
            <a :href="'/personas/edit/' + search.personid">
              <i
                class="bi-pencil"
                style="font-size: 1.2rem; color: #f7d43a;"
              ></i
            ></a>
          </td>
          <td>
            <a :href="'/personas/delete/' + search.personid"
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
          <button class="page-link">Total: {{ this.persons.length }}</button>
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
import axios from "axios";
export default {
  name: "persons-list",
  props: {
    title: {
      type: String,
      default: "Personas",
    },
  },
  data() {
    return {
      //PERSONADD
      //datos originales que se recibe del servidor
      datos: {
        documentid: "",
        firstSurname: "",
        lastSurname: "",
        name: "",
        state: "",
      },
      id: this.$route.params.id,
      documents: [],

      //PERSONLIST
      //list
      persons: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchPersons: [],
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
    await this.getPersons();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //PERSONSLIST
    async getPersons() {
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
        console.log(result.data.lists.documents[0].length);
        if (result.statusText == "OK") {
          //llena campos de personas a editar
          if (result.data.lists.persons_ById[0].length > 0) {
            this.datos.documentid =
              result.data.lists.persons_ById[0][0].documentid;
            this.datos.firstSurname =
              result.data.lists.persons_ById[0][0].firstSurname;
            this.datos.lastSurname =
              result.data.lists.persons_ById[0][0].lastSurname;
            this.datos.name = result.data.lists.persons_ById[0][0].name;
            this.datos.state = result.data.lists.persons_ById[0][0].state;
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
    //PERSONAADD
    async changePersons() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "POST",
          url: "http://localhost:4000/api/personas",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "PUT",
            url: "http://localhost:4000/api/personas/" + this.id,
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
        return a.personsid - b.personsid;
      };
      const desc = (a, b) => {
        return b.personsid - a.personsid;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
      }
    },

    sortDocumentid() {
      const asc = (a, b) => {
        return a.documentid - b.documentid;
      };
      const desc = (a, b) => {
        return b.dni - a.dni;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
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
        return this.searchPersons.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchPersons.sort(desc);
      }
    },

    //SEARCH
    getSearchPersons() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.persons.filter(
            (doc) =>
              (doc.personid !== null &&
                doc.personid.toString().indexOf(query) > -1) ||
              (doc.documentid !== null &&
                doc.documentid.toString().indexOf(query) > -1) ||
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
              (doc.created !== null &&
                doc.created.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.updated !== null &&
                doc.updated.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.state !== null && doc.state.toString().indexOf(query) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchPersons = filterItems(this.text);
          this.pagination = false;
          this.successList =
            "Se encontraron" +
            " " +
            this.searchPersons.length +
            " " +
            "registros";
          this.err = false;
        } else {
          this.searchPersons = [];
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
      return Math.ceil(this.persons.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.errList = false;
      this.successList = false;
      this.searchPersons = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchPersons.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchPersons.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchPersons = this.persons.slice(init, end);
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
