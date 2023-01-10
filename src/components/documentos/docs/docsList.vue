<template>
  <div class="container-fluid mt-4">
    <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>
    <div class="mt-4">
      <!--Add-->
      <a class="btn btn-primary btn-block" type="button" href="/documentos/add"
        >Agregar doc
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
      <form @keyup="getSearchDocs" class="mt-2">
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
      <form @submit.prevent="getSearchDocs" class="mt-4">
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
              @click="sortUserId"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
            IdUsuario
            </button>
          </th>
           <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortDoc_type"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              Tipo
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortDoc_number"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              NumDoc
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14" />
            <button
              @click="sortFile"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem;"
            >
              Archivo
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
        <tr v-for="search in searchDocs" :key="search.documentid">
          <td>{{ search.documentid }}</td>
          <td>{{ search.userid }}</td>
          <td>{{ search.doc_type }}</td>
          <td>{{ search.doc_number }}</td>
          <td><a :href="'/files/download/'+ search.file">{{search.file}}</a></td>       
          <td>{{ search.created }}</td>
          <td>{{ search.updated }}</td>
          <td>{{ search.state }}</td>
          <td>
            <a :href="'/documentos/edit/' + search.documentid">
              <i
                class="bi-pencil"
                style="font-size: 1.5rem; color: #f7d43a;"
              ></i
            ></a>
          </td>
          <td>
            <a :href="'/documentos/delete/' + search.documentid"
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
          <button class="page-link">Total: {{ this.docs.length }}</button>
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
  name: "docs-list",
  data() {
    return {
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
      err: "",
      success: "",
    };
  },
  components: {
    headerView
  },
  async mounted() {
    await this.getDocs();
    this.getDataPages(this.currentPage);
     
  },
  methods: {    
    
    //LIST DOCS
    async getDocs() {      
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/docs/data", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });

        
        //console.log(result.data.lists.documents[0])        
        if (result.data.lists.documents[0].length > 0) {         
          this.docs = result.data.lists.documents[0];       

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

    sortUserId() {
      const asc = (a, b) => {
        return a.userid - b.userid;
      };
      const desc = (a, b) => {
        return b.userid - a.userid;
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
              (doc.userid !== null &&
                doc.userid.toString().indexOf(query) > -1) ||
              (doc.doc_type !== null &&
                doc.doc_type.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.doc_number !== null &&
                doc.doc_number.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.file !== null &&
                doc.file.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
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
          this.searchDocs = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" +
            " " +
            this.searchDocs.length +
            " " +
            "registros";
          this.err = false;
        } else {
          this.searchDocs = [];
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
      return Math.ceil(this.docs.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.err = false;
      this.success = false;
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
  }
};
</script>

<style></style>
