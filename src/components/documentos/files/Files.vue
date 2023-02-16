<template>
  <div>
    <!--LIST FILES-->
    <div v-if="files.length > 0" class="card mt-2 bg-light">
      <div class="container">
        <div class="card bg-light mt-4">
          <div class="container mt-3 bg-light" style="font-size: 0.9rem;">
            <div class="card-body-sm m-3">
              <!--Switch-->
              <div style="col-12">
                <div class="form-check form-switch">
                  <label class="form-check-label" for="swit"
                    >Búsqueda estrícta</label
                  >
                  <input
                    @click="cambiarFilter"
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switch"
                  />
                </div>
              </div>

              <!--Form-->
              <!--Search libre-->
              <div v-if="filter == true" class="col-12">
                <form @keyup="getSearchFiles" class="mt-2">
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
              <div v-else class="col-12">
                <form @submit.prevent="getSearchFiles" class="mt-4">
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
                    <button type="submit" class="btn btn-primary btn-sm m-1">
                      Buscar
                    </button>
                    <button
                      v-if="success.length > 0 || err.length > 0"
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
                      style="width: 72%;"
                      v-model="text"
                      type="search"
                      placeholder="Search"
                    />
                  </i>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--Table-->
        <table id="datos" class="table table-hover mt-2" style="font-size: 0.9rem;">
          <thead>
            <tr style="background: #ecedef;">
              <th>
                <img src="../../../assets/sort.png" alt="" width="9" />
                <button
                  @click="sortName"
                  class="btn btn-default btn-sm"
                  style="border: 0; font-size: 1.2rem;"
                >
                  Nombre
                </button>
              </th>
              <th>
                <img src="../../../assets/sort.png" alt="" width="9" />
                <button
                  @click="sortUrl"
                  class="btn btn-default btn-sm"
                  style="border: 0; font-size: 1.2rem;"
                >
                  Link
                </button>
              </th>
              <th>Acciones</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in searchFiles" :key="f.name">
              <td>{{ f.name }}</td>
              <td>{{ f.url }}</td>
              <td>
                <a :href="'/files/delete/' + f.name"
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
              <button class="page-link">Total: {{ this.files.length }}</button>
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
    <div v-else class="mt-4">
      <p class="alert alert-warning text-center">
        Aqui se muestran los archivos subidos, aún no ha subido ninguno
      </p>
    </div>
  </div>
</template>
<script>
//import VueyeTable from "vueye-table";
import axios from "axios";
//import headerView from "../../../views/HeaderViewDocs/headerView.vue";
export default {
  name: "files-list",
  data() {
    return {
      files: [],
      //pagination
      currentPage: 1,
      rows: 5,
      pagination: true,
      //search
      filter: true,
      searchFiles: [],
      text: "",
      //Messages
      err: "",
      success: "",
    };
  },
  components: {},

  async mounted() {
    await this.listFiles();
    this.getDataPages(this.currentPage);

    //this.downloadFile()
  },
  methods: {
    //FILES
    async listFiles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:4000/api/files", {
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (result.data.length > 0) this.files = result.data;
        //console.log(this.files);
      } catch (error) {
        this.err = "No hay archivos o no tiene permiso";
        console.log("No hay archivos, o no tiene permiso");
      }
    },

    //DOCUMENTOS

    sortName() {
      const asc = (a, b) => {
        return a.name.localeCompare(b.name);
      };
      const desc = (a, b) => {
        return b.name.localeCompare(a.name);
      };

      if (this.algunValor) {
        console.log(this.getDataPages(1));
        this.algunValor = false;
        return this.searchFiles.sort(asc);
      } else {
        console.log("No estoy");
        this.algunValor = true;
        return this.searchFiles.sort(desc);
      }
    },
    sortUrl() {
      const asc = (a, b) => {
        return a.url.localeCompare(b.url);
      };
      const desc = (a, b) => {
        return b.url.localeCompare(a.url);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchFiles.sort(asc);
      } else {
        this.algunValor = true;
        return this.searchFiles.sort(desc);
      }
    },

    //SEARCH
    getSearchFiles() {
      if (this.text.length == 0) {
        this.getDataPages(1);
      } else {
        const filterItems = (query) => {
          return this.files.filter(
            (search) =>
              (search.name !== null &&
                search.name.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (search.url !== null &&
                search.url.toLowerCase().indexOf(query.toLowerCase()) > -1)
          );
        };
        if (filterItems(this.text).length > 0) {
          this.searchFiles = filterItems(this.text);
          this.pagination = false;
          this.success =
            "Se encontraron" +
            " " +
            this.searchFiles.length +
            " " +
            "registros";
          this.err = false;
        } else {
          this.searchFiles = [];
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
      return Math.ceil(this.files.length / this.rows);
    },
    //obtener el numero de páginas
    getDataPages(numPage) {
      this.text = "";
      this.err = false;
      this.success = false;
      this.searchFiles = [];
      this.pagination = true;
      this.currentPage = numPage;
      if (this.searchFiles.length > 0) {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchFiles.slice(init, end);
      } else {
        let init = numPage * this.rows - this.rows;
        let end = numPage * this.rows;
        this.searchFiles = this.files.slice(init, end);
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
