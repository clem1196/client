<template>
  <div class="container-md mt-2" >
    <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>
    <!--ADD EDIT-->
    <!--title-->
    <div class="container-sm mt-4">
      <h5 class="title">
        {{ title }}
      </h5>
    </div>
    <!--form-->
    <div class="card mt-2 bg-light">
      <div class="card-body-sm m-3">
        <form @submit.prevent="changeTypes">
          <!--Campo name_type-->
          <div class="mb-2">
            <label for="" class="col-form-label-sm">Tipo Doc:</label>
            <input
              v-model="datos.name_type"
              type="text"
              class="form-control-sm m-2"
              style="font-size: 0.9rem; border-width: 0.1rem;"
              size="24"
              required
              minlength="4"
              maxlength="60"
              autofocus
            />
            <span>
            <small v-if="datos.name_type.length < 4 || datos.name_type.length>59" class="text-danger m-2" style="font-size: 0.8rem"
              >Mínimo 4 máximo 60 caracteres</small
            >
            <small v-else class="bi-check-lg text-success m-2" style="font-size: 1.5rem"
              ></small
            >
            </span>
          </div>

          <!--Campo state-->
          <div v-if="id != undefined" class="mb-2">
            <label for="" class="col-form-label">Estado:</label>
            <select v-model="datos.state" class="form-select-sm m-2">
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
            <small v-if="datos.state.length == ''" class="text-danger m-2"
              >Mínimo 1 caracter</small
            >
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
            <a class="btn btn-sm" href="/types" style="color: white;">Cancelar</a>
          </div>
        </form>
        <div
          v-if="successChange"
          class="alert alert-success mt-4 d-flex align-items-center"
          role="alert"
        >
          <i class="bi-check-circle-fill"></i> {{ successChange }}
        </div>
        <div v-if="errChange" class="alert alert-danger mt-4">
          {{ errChange }}
        </div>
      </div>
    </div>
    <!--TYPELIST-->
    <div class="card mt-2">
    <!--Switch-->
     <div class="m-2 mt-2" style="font-size: 0.9rem;">        
        <div class="container">
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
      </div>
      <!--Form-->
      <!--Search libre-->
      <div v-if="filter == true" class="col-12" style="font-size: 0.9rem;">
        <form @keyup="getSearchTypes" class="mt-2">
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
      <div v-else class="col-12 m-2" style="font-size: 0.9rem;">
        <form @submit.prevent="getSearchTypes" class="mt-4">
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
            <button type="submit" class="btn btn-primary btn-sm m-1">Buscar</button>
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
              style="width: 75%;"
              v-model="text"
              type="search"
              placeholder="Search"
            />
          </i>
        </form>
      </div>
    </div>
    <div class="card mt-1" >
      <!--Table-->
      <table id="datos" class="table table-hover table-bordered table-responsive">
        <thead>
          <tr style="font-size: 0.8rem; background: #ecedef;">
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button
                @click="sortId"
                class="btn btn-default btn-sm"
               
              >
                Id
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button
                @click="sortName_type"
                class="btn btn-default btn-sm"
               
              >
                Tipo doc
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button
                @click="sortCreated"
                class="btn btn-default btn-sm"
               
              >
                Creado
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button
                class="btn btn-default btn-sm"
                
                @click="sortUpdated"
              >
                Modificado
              </button>
            </th>
            <th>
              <img src="../../assets/sort.png" alt="" width="9" />
              <button
                @click="sortState"
                class="btn btn-default btn-sm"
               
              >
                Estado
              </button>
            </th>
            <th>Acciones</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="search in searchTypes" :key="search.typeid" style="font-size: 0.8rem;">
            <td>{{ search.typeid }}</td>
            <td>{{ search.name_type }}</td>
            <td>{{ search.created }}</td>
            <td>{{ search.updated }}</td>
            <td>{{ search.state }}</td>
            <td>
              <a :href="'/types/edit/' + search.typeid">
                <i
                  class="bi-pencil"
                  style="font-size: 1.2rem; color: #f7d43a;"
                ></i
              ></a>
            </td>
            <td>
              <a :href="'/types/delete/' + search.typeid"
                ><i
                  class="bi-trash-fill"
                  style="font-size: 1.2rem; color: #f7423a;"
                ></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

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
          <button class="page-link">Total: {{ this.types.length }}</button>
        </li>
      </ul>
    </nav>

    <!--Messages-->
    <small v-if="successList" class="text-success">{{ successList }} </small>
    <small v-if="errList" class="text-danger">{{ errList }}</small>
  </div>
</template>

<script>
import headerView from "../../views/HeaderViewDocs/headerView.vue";
//import typesAdd from "./typesAdd.vue";
import axios from "axios";
export default {
  name: "types-list",
  props:{
    title:{
      type:String,
      default: "Tipo de documento"
    }
  },
  data() {
    return {
      //ADD EDIT
      datos: {
        name_type: "",
        state: "",
      },
      id: this.$route.params.id,
      //LIST
      types: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchTypes: [],
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
    await this.getTypes();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //LIST PERSONS
    async getTypes() {
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
          if (result.data.lists.types_ById[0].length > 0) {
            this.datos.name_type = result.data.lists.types_ById[0][0].name_type;
            this.datos.state = result.data.lists.types_ById[0][0].state;
          } else {
            this.datos.name_type = "";
            this.datos.state = "";
          }
          this.types = result.data.lists.types[0];
          this.errList = false;
        } else {
          this.errList = "No hay datos que mostrar";
        }
      } catch (error) {
        this.errList = error.response.data.Message;
        console.log(error);
      }
    },

    async changeTypes() {
      try {
        const token = localStorage.getItem("token");
        let myObject = {
          method: "POST",
          url: "http://localhost:4000/api/types/",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        };
        if (this.id != undefined) {
          myObject = {
            method: "PUT",
            url: "http://localhost:4000/api/types/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          };
        }
        const result = await axios(myObject);
        console.log(result);
        if (result.statusText == "Created") {
          this.errChange = false;
          this.successChange = result.data.Message;
          location.replace("/types");
        }
      } catch (error) {
        this.errChange = error.response.data.Message;
        console.log(error.response);
      }
    },

    //FILTRO
    sortId() {
      const asc = (a, b) => {
        return a.typeid - b.typeid;
      };
      const desc = (a, b) => {
        return b.typeid - a.typeid;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchTypes.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchTypes.sort(desc);
      }
    },

    sortName_type() {
      const asc = (a, b) => {
        return a.name_type.localeCompare(b.name_type);
      };
      const desc = (a, b) => {
        return b.name_type.localeCompare(a.name_type);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchTypes.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchTypes.sort(desc);
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
        return this.searchTypes.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchTypes.sort(desc);
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
        return this.searchTypes.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchTypes.sort(desc);
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
        return this.searchTypes.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchTypes.sort(desc);
      }
    },

    //SEARCH
    getSearchTypes() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.types.filter(
            (doc) =>
              (doc.typeid !== null &&
                doc.typeid.toString().indexOf(query) > -1) ||
              (doc.name_type !== null &&
                doc.name_type.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (doc.created !== null &&
                doc.created.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.updated !== null &&
                doc.updated.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (doc.state !== null && doc.state.toString().indexOf(query) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchTypes = filterItems(this.text);
          this.pagination = false;
          this.successList =
            "Se encontraron" +
            " " +
            this.searchTypes.length +
            " " +
            "registros";
          this.errList = false;
        } else {
          this.searchTypes = [];
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
      return Math.ceil(this.types.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.errList = false;
      this.successList = false;
      this.searchTypes = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchTypes.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchTypes.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchTypes = this.types.slice(init, end);
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
