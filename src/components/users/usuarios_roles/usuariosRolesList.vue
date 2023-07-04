<template>
  <div class="container-fluid mt-4">
    <div class="card card-title">
      Roles de Usuarios      
    </div>    
      <!--Add-->
      <a class="btn-form-users new" href="/usuarios/add">Crear nuevo</a>
      <a class="btn-form-users assingRole m-3" href="/usuarios-roles/add">Asignar rol </a>
        
    <!--Form-->
    <div class="card-search">
      <div class="row row-search">
        <!--Switch-->
        <div class="col-auto">
          <div class="form-check form-switch">
            <label class="form-check-label" for="switUserRolesList">Clásica</label>
            <input
              @click="cambiarFilter"
              name="inputNameSwitch"
              class="form-check-input"
              type="checkbox"
              role="roleSwitch"
              id="switUserRolesList"
            />
          </div>
        </div>

        <!--Form-->
        <div class="col-auto">
          <!--Search libre-->
          <form v-if="filter == true" @keyup="getSearchUsuariosRoles">
            <div class="row m-2">
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
          <form v-else @submit.prevent="getSearchUsuariosRoles">
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
              @click="sortUsuario"
              class="btn btn-sm th-font-size"
            >
              Usuario
            </button>
          </th>
          <th>
            <i class="bi-filter"></i>
            <button
              @click="sortRol"
              class="btn btn-sm th-font-size"
            >
              Rol
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
        <tr class="tbody-tr"
          v-for="search in searchUsuariosRoles"
          :key="search.idusuarios_roles"
        >
          <!--<td>{{ search.idusuarios_roles }}</td>-->
          <td>{{ search.idusuarios_roles }}</td>
          <td>{{ search.nombre_usuario }}</td>
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
              :href="'/usuarios-roles/edit/' + search.idusuarios_roles"
              title="Edit"
            >
              <i class="bi-pencil size-pencil"></i
            ></a>
            |
            <a
              :href="'/usuarios-roles/delete/' + search.idusuarios_roles"
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
          <button class="page-link">
            Total: {{ this.usuariosRoles.length }}
          </button>
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
  name: "usuariosRoles-list",
  data() {
    return {
      //list
      usuariosRoles: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchUsuariosRoles: [],
      text: "",
      //Messages
      success: "",
      err: "",
    };
  },
  components: {
    
  },
  async mounted() {
    await this.getUsuarios_roles();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //LISTAR USUARIOS_ROLES POR NOMBRES Y ROLES
    async getUsuarios_roles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/data", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        //console.log(result.data)
        if (result.data.usersNames_rolesNames.length > 0) {
          this.usuariosRoles = result.data.usersNames_rolesNames;
          this.errSearch = false;
        } else {
          console.log("No hay datos que mostrar");
        }
      } catch (error) {
        this.errSearch = error.response.data.Message;
        console.log(error.response);
      }
    },

    //SORT ORDENAR COLUMNAS ASCENDENTE Y DESCENDENTE 
    sortId() {
      const asc = (a, b) => {
        return a.idusuarios_roles - b.idusuarios_roles;
      };
      const desc = (a, b) => {
        return b.idusuarios_roles - a.idusuarios_roles;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchUsuariosRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuariosRoles.sort(desc);
      }
    },
    sortUsuario() {
      const asc = (a, b) => {
        return a.nombre_usuario.localeCompare(b.nombre_usuario);
      };
      const desc = (a, b) => {
        return b.nombre_usuario.localeCompare(a.nombre_usuario);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchUsuariosRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuariosRoles.sort(desc);
      }
    },
    sortRol() {
      const asc = (a, b) => {
        return a.nombre_rol.localeCompare(b.nombre_rol);
      };
      const desc = (a, b) => {
        return b.nombre_rol.localeCompare(a.nombre_rol);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchUsuariosRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuariosRoles.sort(desc);
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
        return this.searchUsuariosRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuariosRoles.sort(desc);
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
        return this.searchUsuariosRoles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuariosRoles.sort(desc);
      }
    },

    //FILTER O SEARCH     
    getSearchUsuariosRoles() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.usuariosRoles.filter(
            (usuario) =>
              (usuario.idusuarios_roles !== null &&
                usuario.idusuarios_roles.toString().indexOf(query) > -1) ||
              (usuario.nombre_usuario !== null &&
                usuario.nombre_usuario
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ||
              (usuario.nombre_rol !== null &&
                usuario.nombre_rol.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (usuario.registrado !== null &&
                usuario.registrado.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (usuario.actualizado !== null &&
                usuario.actualizado.toLowerCase().indexOf(query.toLowerCase()) >
                  -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchUsuariosRoles = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" + " " + this.searchUsuariosRoles.length + " "  +"registros";
          this.err = false;
        } else {
          this.searchUsuariosRoles = [];
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
      return Math.ceil(this.usuariosRoles.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.err = false;
      this.success = false;
      this.searchUsuariosRoles = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchUsuariosRoles.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchUsuariosRoles.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchUsuariosRoles = this.usuariosRoles.slice(init, end);
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
@import  url("/src/services/style.css");
</style>