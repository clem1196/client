<template>
  <div class="container-fluid mt-4">
    <div class="card card-title">
      Roles      
    </div>    
      <!--Add-->
      <a class="btn-form-users new" href="/roles/add">Agregar</a>
        
    <!--Form-->
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
          <form v-if="filter == true" @keyup="getSearchRoles">
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
          <form v-else @submit.prevent="getSearchRoles">
            <div class="row">
              <div class="col-auto">
                <button type="submit" class="btn-form-doc">Buscar</button>
              </div>
              <div class="col-auto">
                <button
                  v-if="success.length > 0 || err.length > 0"
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
    <table class="table table-hover">
      <thead>
        <tr class="thead-tr">
          <th>
            <i class="bi-filter"></i>
            <button
              @click="sortId"
              class="btn btn-sm th-font-size"
            >
              Id
            </button>
          </th>
          <th>
            <i class="bi-filter"></i>
            <button
              @click="sortNombre"
              class="btn btn-sm th-font-size"
            >
              Nombre
            </button>
          </th>
          <th>
            <i class="bi-filter"></i>
            <button
              @click="sortCreado"
              class="btn btn-sm th-font-size"
            >
              Creado
            </button>
          </th>
          <th>
            <i class="bi-filter"></i>
            <button              
              @click="sortModificado"
              class="btn btn-sm th-font-size"
            >
              Modificado
            </button>
          </th>
          <th><button class="btn btn-sm th-font-size">Action</button></th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="search in searchRoles" :key="search.idroles" class="tbody-tr">
          <td>{{ search.idroles }}</td>
          <td>{{ search.nombre_rol }}</td>

           <td v-if="search.registrado">
            {{ new Date(search.registrado).toLocaleString() }}
          </td>
          <td v-else></td>
          <td v-if="search.actualizado">
            {{ new Date(search.actualizado).toLocaleString() }}
          </td>
          <td v-else></td>          
          <td>
            <a
              :href="'/roles/edit/' + search.idroles"
              title="Edit"
            >
              <i class="bi-pencil size-pencil"></i
            ></a>
            |
            <a
              :href="'/roles/delete/' + search.idroles"
              title="Delete"
              ><i class="bi-trash-fill size-trash"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>

    <!--PAGINATION-->   
      <nav aria-label="Page navigation example" class="font-size-pagination">
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
            <button class="page-link">Total: {{ this.roles.length }}</button>
          </li>
        </ul>
      </nav>    
    <!--Messages-->
    <small v-if="success.length > 0" class="text-success">{{ success }} </small>
    <small v-if="err.length > 0" class="text-danger">{{ err }}</small>
  </div>  
</template>

<script>
import axios from "axios";
export default {
  name: "roles-list",
  data() {
    return {
      //list
      roles: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchRoles: [],
      text: "",
      //Messages
      err: "",
      success: "",
    };
  },
  components: {    
    
  },
  async mounted() {
    await this.getRoles();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //LIST ROLES
    async getRoles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/data", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        //console.log(result.data);
        if (result.data.roles.length > 0) {
          this.roles = result.data.roles;
          this.err = false;
        } else {
          console.log("No hay datos que mostrar");
        }
      } catch (error) {
        this.err = error.response.data.Message;
        console.log(error);
      }
    },

    //FILTRO
    sortId() {
      const asc = (a, b) => {
        return a.idroles - b.idroles;
      };
      const desc = (a, b) => {
        return b.idroles - a.idroles;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchRoles.sort(desc);
      }
    },
    sortNombre() {
      const asc = (a, b) => {
        return a.nombre_rol.localeCompare(b.nombre_rol);
      };
      const desc = (a, b) => {
        return b.nombre_rol.localeCompare(a.nombre_rol);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchRoles.sort(desc);
      }
    },
    sortCreado() {
      const asc = (a, b) => {
        return (
          new Date(a.registrado).valueOf() - new Date(b.registrado).valueOf()
        );
      };
      const desc = (a, b) => {
        return (
          new Date(b.registrado).valueOf() - new Date(a.registrado).valueOf()
        );
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchRoles.sort(desc);
      }
    },
    sortModificado() {
      const asc = (a, b) => {
        return (
          new Date(a.actualizado).valueOf() - new Date(b.actualizado).valueOf()
        );
      };
      const desc = (a, b) => {
        return (
          new Date(b.actualizado).valueOf() - new Date(a.actualizado).valueOf()
        );
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchRoles.sort(desc);
      }
    },

    //SEARCH
    getSearchRoles() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.roles.filter(
            (rol) =>
              (rol.idroles !== null &&
                rol.idroles.toString().indexOf(query) > -1) ||
              (rol.nombre_rol !== null &&
                rol.nombre_rol.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (rol.registrado !== null &&
                rol.registrado.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (rol.actualizado !== null &&
                rol.actualizado.toLowerCase().indexOf(query.toLowerCase()) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchRoles = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" + this.searchRoles.length + "registros";
          this.err = false;
        } else {
          this.searchRoles = [];
          this.pagination = false;
          this.success = false;
          this.err = "No se encontraron resultados";
        }
      }
    },
    //limpiar el campo search
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
      return Math.ceil(this.roles.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.err = false;
      this.success = false;
      this.searchRoles = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchRoles.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchRoles.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchRoles = this.roles.slice(init, end);
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

<style >
@import  url("/src/services/style.css");
</style>