<template>
  <div class="container mt-4">
    <div class="row card-header p-3">
      <a href="/usuarios" class="col-auto">Usuarios</a> |
      <a href="/roles" class="col-auto">Roles</a> |
      <a href="/" class="col-auto">Salir</a>
    </div>

    <div class="card-body bg-light mt-4">
      <div class="row mt-2">
        <div class="col-2">
          <a class="btn btn-primary" href="/usuarios/add">Crear nuevo</a>
        </div>
        <div class="col-2">
          <a class="btn btn-primary" href="/usuarios-roles/add">Asignar rol </a>
        </div>

        <div class="col-7">
          <form @submit.prevent="getSearchUsuariosRoles">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <i class="bi-search"></i>
              <input
                class="form-control border rounded"
                v-model="text"
                type="search"
                placeholder=""
              />
              <button
                v-if="success.length > 0 || err.length > 0"
                class="btn btn-secondary"
                type="button"
                @click="getDataPages(1)"
              >
                Salir
              </button>
              <button id="buscar" class="btn btn-primary" type="submit">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      <table class="table table-hover mt-4">
        <thead>
          <tr style="background: #ecedef">
            <th>
              <i class="bi-funnel-fill" style="font-size: 0.6rem"></i>
              <button
                @click="sortUsuario"
                class="btn btn-default btn-sm"
                style="border: 0; font-size: 1.1rem"
              >
                <b>Usuario</b>
              </button>
            </th>
            <th>
              <i class="bi-funnel-fill" style="font-size: 0.6rem"></i>
              <button
                @click="sortRol"
                class="btn btn-default btn-sm"
                style="border: 0; font-size: 1.1rem"
              >
                <b>Rol</b>
              </button>
            </th>
            <th>
              <i class="bi-funnel-fill" style="font-size: 0.6rem"></i>
              <button
                @click="sortCreado"
                class="btn btn-default btn-sm"
                style="border: 0; font-size: 1.1rem"
              >
                <b>Creado</b>
              </button>
            </th>
            <th>
              <i class="bi-funnel-fill" style="font-size: 0.6rem"></i>
              <button
                class="btn btn-default btn-sm"
                style="border: 0; font-size: 1.1rem"
                @click="sortModificado"
              >
                <b>Modificado</b>
              </button>
            </th>
            <th style="font-size: 1.1rem"><b>Acciones</b></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="search in searchUsuariosRoles"
            :key="search.idusuarios_roles"
          >
            <!--<td>{{ search.idusuarios_roles }}</td>-->
            <td>{{ search.nombre_usuario }}</td>
            <td>{{ search.nombre_rol }}</td>
            <td>{{ search.registrado }}</td>
            <td>{{ search.actualizado }}</td>
            <td>
              <a :href="'/usuarios-roles/edit/' + search.idusuarios_roles">
                <i
                  class="bi-pencil"
                  style="font-size: 1.5rem; color: #f7d43a"
                ></i
              ></a>
            </td>
            <td>
              <a :href="'/usuarios-roles/delete/' + search.idusuarios_roles"
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
              Total usuarios: {{ this.usuariosRoles.length }}
            </button>
          </li>
        </ul>
      </nav>
      <!--Messages-->
      <small v-if="success.length > 0" class="text-success"
        >{{ success }}
      </small>
      <small v-if="err.length > 0" class="text-danger">{{ err }}</small>
    </div>
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
      searchUsuariosRoles: [],
      text: "",
      //Messages
      err: "",
      success: "",
    };
  },
  async mounted() {
      await this.getUsuariosRoles();
      this. getDataPages(1);
  },
  methods: {
    //LIST
    async getUsuariosRoles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/u_roles", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (result.data.usuarios_roles.length > 0) {
          this.usuariosRoles = result.data.usuarios_roles;
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
          new Date(a.actualizado).valueOf() -
          new Date(b.actualizado).valueOf()
        );
      };
      const desc = (a, b) => {
        return (
          new Date(b.actualizado).valueOf() -
          new Date(a.actualizado).valueOf()
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

    //SEARCH
    getSearchUsuariosRoles() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.usuariosRoles.filter(
            (usuario) =>
              (usuario.idusuarios_roles !== null &&
                usuario.idusuarios_roles.toString().indexOf(query)> - 1) ||
              (usuario.nombre_usuario !== null &&
                usuario.nombre_usuario
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ||
                  (usuario.nombre_rol !== null &&
                usuario.nombre_rol
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ||
              (usuario.registrado !== null &&
                usuario.registrado.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (usuario.actualizado !== null &&
                usuario.actualizado
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchUsuariosRoles = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" + this.searchUsuariosRoles.length + "registros";
          this.err = false;
        } else {
          this.searchUsuariosRoles = [];
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
      return Math.ceil(this.usuariosRoles.length / this.rows);
    },
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