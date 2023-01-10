<template>
  <div class="container-fluid mt-4">
    <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>
    <div class="mt-4">
      <!--Add-->
      <a class="btn btn-primary btn-block" type="button" href="/personas/add"
        >Agregar personas
      </a>
      <!--Switch-->
      <div style="float: right;">
        <div class="form-check form-switch" @click="cambiarFilter">
          <label class="form-check-label" for="swit">Búsqueda estrícta</label>
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="switch"
          />
        </div>
      </div>
    </div>
    <!--Form-->
    <!--Search libre-->
    <div v-if="filter == true" class="col-12">
      <form @keyup="getSearchPersons" class="mt-2">
        <i class="bi-search"></i>
        <input
          class="border rounded"
          style="width: 100%;"
          v-model="text"
          type="search"
          placeholder="Search"
        />
      </form>
    </div>
    <!--Search estricto-->
    <div v-else class="col-12">
      <form @submit.prevent="getSearchPersons" class="mt-4">
        <div
          style="float: right;"
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button
            v-if="success.length > 0 || err.length > 0"
            @click="getDataPages(1)"
            type="button"
            class="btn btn-light"
          >
            Salir
          </button>
          <button
            v-if="text"
            type="button"
            class="btn btn-secondary"
            @click="limpiarText"
          >
            Limpiar
          </button>
          <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
        <i class="bi-search">
          <input
            class="border rounded"
            style="width: 100%;"
            v-model="text"
            type="search"
            placeholder="Search"
          />
        </i>
      </form>
    </div>

    <!--Table-->
    <table id="datos" class="table table-hover mt-2">
      <thead>
        <tr style="background: #ecedef;">
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortId"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              Id
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortDni"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
            DNI
            </button>
          </th>
           <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortFirstSurname"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              A. Paterno
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortLastSurname"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              A. Materno
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortName"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              Nombres
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortCreated"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              Creado
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
              @click="sortUpdated"
            >
              Modificado
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortState"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              Estado
            </button>
          </th>
          <th>Acciones</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="search in searchPersons" :key="search.personid">
          <td>{{ search.personid }}</td>
          <td>{{ search.dni }}</td>
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
                style="font-size: 1.5rem; color: #f7d43a;"
              ></i
            ></a>
          </td>
          <td>
            <a :href="'/personas/delete/' + search.personid"
              ><i
                class="bi-trash-fill"
                style="font-size: 1.5rem; color: #f7423a;"
              ></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>

    <!--PAGINATION-->
    <nav aria-label="Page navigation example">
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
    <small v-if="success.length > 0" class="text-success">{{ success }} </small>
    <small v-if="err.length > 0" class="text-danger">{{ err }}</small>
  </div>
</template>

<script>
import headerView from "../../../views/HeaderViewDocs/headerView.vue";
import axios from "axios";
export default {
  name: "persons-list",
  data() {
    return {
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
      err: "",
      success: "",
    };
  },
  components: {
    headerView
  },
  async mounted() {
    await this.getPersons();
    this.getDataPages(this.currentPage);
     
  },
  methods: {    
    
    //LIST PERSONS
    async getPersons() {      
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/docs/data", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });

        
        //console.log(result.data.lists.persons[0])        
        if (result.data.lists.persons[0].length > 0) {         
          this.persons = result.data.lists.persons[0];       

          this.err = false;
        } else {
          console.log("No hay datos que mostrar");
        }
      } catch (error) {
        this.err = error.response.data.Message;
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

    sortDni() {
      const asc = (a, b) => {
        return a.dni - b.dni;
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
              (doc.dni !== null &&
                doc.dni.toString().indexOf(query) > -1) ||
              (doc.firstSurname !== null &&
                doc.firstSurname.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.lastSurname !== null &&
                doc.lastSurname.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.name !== null &&
                doc.name.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.created !== null &&
                doc.created.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.updated !== null &&
                doc.updated.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.state !== null &&
                doc.state.toString().indexOf(query) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchPersons = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" +
            " " +
            this.searchPersons.length +
            " " +
            "registros";
          this.err = false;
        } else {
          this.searchPersons = [];
          this.pagination = false;
          this.success = false;
          this.err = "No se encontraron resultados";
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
      this.err = false;
      this.success = false;
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
  }
};
</script>

<style></style>
