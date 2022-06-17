<template>
  <div class="container-fluid mt-4">
    <!--Llamamos al componente headerWiev de navegación-->
    <header-view></header-view>
    <div class="mt-4">
      <!--Add-->
      <a class="btn btn-primary" href="/roles/add">Agregar</a>
      <!--Switch-->
      <div style="float: right">
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
      <form @keyup="getSearchRoles" class="mt-2">
        <i class="bi-search"></i>
        <input
          class="border rounded"
          style="width: 100%"
          v-model="text"
          type="search"
          placeholder="Search"
        />
      </form>
    </div>
    <!--Search estricto-->
    <div v-else class="col-12">
      <form @submit.prevent="getSearchRoles" class="mt-4">
        <div
          style="float: right"
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
            style="width: 100%"
            v-model="text"
            type="search"
            placeholder="Search"
          />
        </i>
      </form>
    </div>

    <!--Table-->
    <table class="table table-hover mt-2">
      <thead>
        <tr style="background: #ecedef">
          <th>
            <img src="../../../assets/sort.png" alt="" width="14">
            <button
              @click="sortId"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
            >
              Id
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14">
            <button
              @click="sortNombre"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
            >
              Nombre
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14">
            <button
              @click="sortCreado"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
            >
              Creado
            </button>
          </th>
          <th>
            <img src="../../../assets/sort.png" alt="" width="14">
            <button
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
              @click="sortModificado"
            >
              Modificado
            </button>
          </th>
          <th>Acciones</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="search in searchRoles" :key="search.idroles">
          <td>{{ search.idroles }}</td>
          <td>{{ search.nombre_rol }}</td>
          <td>{{ search.registrado }}</td>
          <td>{{ search.actualizado }}</td>
          <td>
            <a :href="'/roles/edit/' + search.idroles">
              <i class="bi-pencil" style="font-size: 1.5rem; color: #f7d43a"></i
            ></a>
          </td>
          <td>
            <a :href="'/roles/delete/' + search.idroles"
              ><i
                class="bi-trash-fill"
                style="font-size: 1.5rem; color: #f7423a"
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
import headerView from "../../../views/headerView.vue";
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
    headerView,
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

<style>
</style>