<template>
  <div class="container mt-5">
    <div class="row card-header">
      <a href="/usuarios-roles" class="col-auto"><h5>Regresar</h5></a>
    </div>

    <!--Form-->
    <div class="row mt-5 m-auto">
      <!--Add-->
      <div class="col-5">
        <a class="btn btn-info" style="width: 25%" href="/roles/add"
          >Agregar</a
        >
      </div>

      <!--Search-->
      <div class="col-7">
        <form @submit.prevent="getSearchRoles">
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
            Total roles: {{ this.roles.length }}
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
      searchRoles: [],
      text: "",
      //Messages
      err: "",
      success: "",
    };
  },
  async mounted() {
      await this.getRoles();
      this. getDataPages(1);
  },
  methods: {
    //LIST
    async getRoles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/roles", {
          headers: {
            Authorization: JSON.parse(token),
          },
        }); 
        console.log(result.data)      
        if (result.data.roles.length > 0) {
          this.roles = result.data.roles;
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
                rol.idroles.toString().indexOf(query)> - 1) ||
              (rol.nombre_rol !== null &&
                rol.nombre_rol
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1) ||
              (rol.registrado !== null &&
                rol.registrado.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (rol.actualizado !== null &&
                rol.actualizado
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) > -1)
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
    limpiarText() {
      this.text = "";
    },

    //PAGINATION
    isActive(numPage) {
      return numPage == this.currentPage ? "active" : "";
    },
    totalPages() {
      return Math.ceil(this.roles.length / this.rows);
    },
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