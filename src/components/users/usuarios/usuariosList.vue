<template>
  <div class="container mt-5">
    <div class="row card-header">
      <a href="/usuarios-roles" class="col-auto"><h5>Regresar</h5></a>
    </div>

    <!--Form-->
    <div class="row mt-5 m-auto">
      <!--Add-->
      <div class="col-5">
        <a class="btn btn-info" style="width: 25%" href="/usuarios/add"
          >Agregar</a
        >
      </div>

      <!--Search-->
      <div class="col-7">
        <form @submit.prevent="getSearchUsuarios">
          <button
            v-if="text.length > 0"
            class="btn btn-light"
            style="width: 50%"
            type="button"
            @click="limpiarText"
          >
            Limpiar
          </button>
          
          <button
            v-if="success.length > 0 || err.length > 0"
            class="btn btn-warning"
            style="width: 25%"
            type="button"
            @click="getDataPages(1)"
          >
            Salir
          </button>
         
          <button v-if="text.length>0" type="submit" style="width: 25%" class="btn btn-primary">
            Buscar
          </button>

          <div class="mt-2">
            <i class="bi-search"></i>
            <input
              class="border rounded"
              style="width: 100%"
              v-model="text"
              type="search"
              placeholder=""
            />
          </div>
        </form>
      </div>
    </div>

    <!--Table-->
    <table class="table table-hover mt-2">
      <thead>
        <tr style="background: #ecedef">
          <th>
            <i class="bi-caret-down-fill" style="font-size: 1rem"></i>
            <button
              @click="sortId"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
            >
              Id
            </button>
          </th>
          <th>
            <i class="bi-caret-down-fill" style="font-size: 1rem"></i>
            <button
              @click="sortNombre"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
            >
              Nombre
            </button>
          </th>
          <th>
            <i class="bi-caret-down-fill" style="font-size: 1rem"></i>
            <button
              @click="sortCreado"
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
            >
              Creado
            </button>
          </th>
          <th>
            <i class="bi-caret-down-fill" style="font-size: 1rem"></i>
            <button
              class="btn btn-default btn-sm"
              style="border: 0; font-size: 1.2rem"
              @click="sortModificado"
            >
              Modificado
            </button>
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="search in searchUsuarios" :key="search.idusuario">
          <td>{{ search.idusuario }}</td>
          <td>{{ search.nombre_usuario }}</td>
          <td>{{ search.registrado }}</td>
          <td>{{ search.ultimo_acceso }}</td>
          <td>
            <a :href="'/usuarios/edit/' + search.idusuario">
              <i class="bi-pencil" style="font-size: 1.5rem; color: #f7d43a"></i
            ></a>
          </td>
          <td>
            <a :href="'/usuarios/delete/' + search.idusuario"
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
        <!--Previous-->
        <li @click="getPrevious" class="page-item">
          <button type="button" class="page-link">Previous</button>
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
        <!--Next-->
        <li @click="getNext" class="page-item">
          <button type="button" class="page-link">Next</button>
        </li>
        <!--Total-->
        <li class="page-item disabled">
          <button class="page-link">
            Total usuarios: {{ this.usuarios.length }}
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
      searchUsuarios: [],
      text: "",
      //Messages
      err: "",
      success: "",
    };
  },
  async mounted() {
      await this.getUsuarios();
      this. getDataPages(1);
  },
  methods: {
    //LIST
    async getUsuarios() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/usuarios", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (result.data.usuarios.length > 0) {
          this.usuarios = result.data.usuarios;
        } else {
          console.log("No hay datos que mostrar");
        }
      } catch (error) {
        console.log(error);
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
                usuario.idusuario.toString().indexOf(query)> - 1) ||
              (usuario.nombre_usuario !== null &&
                usuario.nombre_usuario
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ||
              (usuario.registrado !== null &&
                usuario.registrado.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
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
            "Se encontraron" + this.searchUsuarios.length + "registros";
          this.err = false;
        } else {
          this.searchUsuarios = [];
          this.pagination = false;
          this.success = false;
          this.err = "No se encontraron resultados";
        }
      }
    },
    limpiarText() {
      this.text = "";
    },

    //PAGINATION
    isActive(numPage) {
      return numPage == this.currentPage ? "active" : "";
    },
    totalPages() {
      return Math.ceil(this.usuarios.length / this.rows);
    },
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
    getPrevious() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getDataPages(this.currentPage);
    },
    getNext() {
      if (this.currentPage < this.totalPages()) {
        this.currentPage++;
      }
      this.getDataPages(this.currentPage);
    },
  },
};
</script>

<style>
</style>