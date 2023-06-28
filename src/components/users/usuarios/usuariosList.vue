<template>
  <div class="container-fluid mt-4">
    <div class="card card-title">
      Usuarios      
    </div>    
      <!--Add-->
      <a class="btn-form-users new" href="/usuarios/add">Agregar</a>
        
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
          <form v-if="filter == true" @keyup="getSearchUsuarios">
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
          <form v-else @submit.prevent="getSearchUsuarios">
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
    <table id="datos" class="table table-hover">
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
              Ultimo acceso
            </button>
          </th>
          <th><button class="btn btn-sm th-font-size">Action</button></th>          
        </tr>
      </thead>
      <tbody>
        <tr v-for="search in searchUsuarios" :key="search.idusuario" class="tbody-tr">
          <td>{{ search.idusuario }}</td>
          <td>{{ search.nombre_usuario }}</td>
          <td v-if="search.registrado">
            {{ new Date(search.registrado).toLocaleString() }}
          </td>
          <td v-else></td>
          <td v-if="search.ultimo_acceso">
            {{ new Date(search.ultimo_acceso).toLocaleString() }}
          </td>
          <td v-else></td>          
          <td>
            <a
              :href="'/usuarios/edit/' + search.idusuario"
              title="Edit"
            >
              <i class="bi-pencil size-pencil"></i
            ></a>
            |
            <a
              :href="'/usuarios/delete/' + search.idusuario"
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
            Total: {{ this.usuarios.length }}
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
  name: "user-list",
  data() {
    return {
      //list
      usuarios: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchUsuarios: [],
      text: "",
      //Messages
      err: "",
      success: "",
    };
  },
  components: {
    
  },
  async mounted() {
    await this.getUsers();
    this.getDataPages(this.currentPage);
  },
  methods: {
    //LIST USUARIOS
    async getUsers() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/data", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (result.data.users.length > 0) {
          this.usuarios = result.data.users;
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
        return a.idusuario - b.idusuario;
      };
      const desc = (a, b) => {
        return b.idusuario - a.idusuario;
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchUsuarios.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuarios.sort(desc);
      }
    },
    sortNombre() {
      const asc = (a, b) => {
        return a.nombre_usuario.localeCompare(b.nombre_usuario);
      };
      const desc = (a, b) => {
        return b.nombre_usuario.localeCompare(a.nombre_usuario);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchUsuarios.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuarios.sort(desc);
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
        return this.searchUsuarios.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuarios.sort(desc);
      }
    },
    sortModificado() {
      const asc = (a, b) => {
        return (
          new Date(a.ultimo_acceso).valueOf() -
          new Date(b.ultimo_acceso).valueOf()
        );
      };
      const desc = (a, b) => {
        return (
          new Date(b.ultimo_acceso).valueOf() -
          new Date(a.ultimo_acceso).valueOf()
        );
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchUsuarios.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchUsuarios.sort(desc);
      }
    },

    //SEARCH
    getSearchUsuarios() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.usuarios.filter(
            (usuario) =>
              (usuario.idusuario !== null &&
                usuario.idusuario.toString().indexOf(query) > -1) ||
              (usuario.nombre_usuario !== null &&
                usuario.nombre_usuario
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ||
              (usuario.registrado !== null &&
                usuario.registrado.toLowerCase().indexOf(query.toLowerCase()) >
                  -1) ||
              (usuario.ultimo_acceso !== null &&
                usuario.ultimo_acceso
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchUsuarios = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" +
            " " +
            this.searchUsuarios.length +
            " " +
            "registros";
          this.err = false;
        } else {
          this.searchUsuarios = [];
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
      return Math.ceil(this.usuarios.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.err = false;
      this.success = false;
      this.searchUsuarios = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchUsuarios.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchUsuarios.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchUsuarios = this.usuarios.slice(init, end);
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

<style scoped>
.card.card-title{
  background: none ;
  color: black;
  padding: 1%;
  font-size:large;
  text-align: center;
  
}
.btn-form-users {
  color: white;
  border-radius: 0.25rem;
  background-color: default;
  font-size: 0.85rem;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
text-decoration: none;
}
.btn-form-users.new {
  color: white;  
  background-color: #00acc1;
 
}
.btn-form-users.assingRole {
  color: white;  
  background-color: #ab47bc;
 
}

.form-control-sm {
  min-height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  padding-left: 1.5rem;
}

.btn-form-doc {
  color: white;
  border-radius: 0.25rem;
  background-color: #00acc1;
  font-size: 0.85rem;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
}
.btn-form-doc.clean {
  color: white;
  background-color: #ab47bc;
}
.btn-form-doc.cancel {
  color: #ab47bc;
  background-color: transparent;
  text-decoration: none;
}
.card-search {
  position: relative;
  display: flex;
  flex-direction: column;
  border: none;
  background-color: #e0f7fa;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
.btn-form-doc.search-out {
  color: #ab47bc;
  background-color: transparent;
  text-decoration: none;
}
.btn-form-doc.search-out:disabled {
  color: #a29ea2;
  background-color: transparent;
  text-decoration: none;
  cursor: auto;
}
.bi-search {
  color: #626f6f;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.font-size-pagination {
  font-size: 0.8rem;
}
.thead-tr {
  background: #00acc1;
  text-align: center;
}
.th-font-size {
  font-size: 0.9rem;
  color: white;
}
/*Table tbody*/
.tbody-tr {
  font-size: small;
  background-color: none;
  text-align: center;
}

.size-pencil {
  font-size: 1rem;
  color: #f7d43a;
}
.size-trash {
  font-size: 1rem;
  color: #ba68c8;
}
.row-search {
  padding-left: 20px;
  padding-top: 6px;
  align-items: center;
  padding-bottom: 6px;
}
.col-auto {
  flex: 0 0 auto;
  width: auto;
  position: relative;
}
.form-check {
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5em;
  margin-bottom: none;
}

.form-check-input:checked {
  background-color: #ab47bc;
  border-color: #ab47bc;
}
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #ab47bc;
  border-color: #ab47bc;
}
.page-link {
  color: #ba68c8;}
</style>