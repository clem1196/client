<template>
  <div class="container-fluid mt-3">
    <div class="card card-title">Upload files</div>
    <!--UPLOADS-->
    <div class="card-header">
      <form enctype="multipart/form-data">
        <label
          >Files:
          <input
            type="file"
            name="files"
            id="files"
            ref="files"
            multiple
            accept=".pdf, application/pdf, .image/*, .jpg, .jpeg, .png"
            @change="handleFilesUploads"
          />
        </label>
        <small
          v-if="filesUpload.length > 0 || noFilesUpload.length > 0"
          class="small-btn"
        >
          <small v-if="filesUpload.length < 13">
            <button
              class="btn btn-acept btn-sm"
              @click="submitFiles"
              type="button"
            >
              Aceptar
            </button>
            <a href="#" class="btn btn-cancel btn-sm" @click="cancelCharge">
              Cancelar
            </a>
          </small>
          <small v-else class="alert alert-danger">
            Solo se admiten hasta 12 archivos, quite algunos para continuar...
            <a href="#" @click="cancelCharge">Cancelar</a>
          </small>
        </small>
      </form>
    </div>
    <div class="files-container">
      <div>
        <li
          v-for="(file, key) in filesUpload"
          :key="file.name"
          class="file-listing"
        >
          {{ file.name }}
          <span class="remove-file btn btn-sm" @click="removeFile(key)"
            >Eliminar</span
          >
        </li>
      </div>

      <div v-if="noFilesUpload.length > 0">
        <div class="alert alert-warning">
          <i class="bi-exclamation-triangle-fill"></i>
          Los siguientes Archivos no se cargarán, tienen formato no válidos:
        </div>
        <li
          v-for="nofile in noFilesUpload"
          :key="nofile.name"
          class="file-listing"
        >
          {{ nofile.name }}
        </li>
      </div>
    </div>

    <!--LIST FILES-->
    <div v-if="files.length > 0" class="m-2">
      <!--Form-->
      <div class="card-search">
        <div class="row row-search">
          <!--Switch-->
          <div class="col-auto">
            <div class="form-check form-switch" title="search clasic">
              <label class="form-check-label" for="switFilesList"></label>
              <input
                @click="cambiarFilter"
                name="inputNameSwitch"
                class="form-check-input"
                type="checkbox"
                role="roleSwitch"
                id="switFilesList"
              />
            </div>
          </div>

          <!--Form-->
          <div class="col-auto">
            <!--Search libre-->
            <form v-if="filter == true" @keyup="getSearchFiles">
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
            <form v-else @submit.prevent="getSearchFiles">
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
      <table id="datos" class="table table-hover">
        <thead>
          <tr class="thead-tr">
            <th>
              <i class="bi-filter"></i>
              <button @click="sortName" class="btn btn-sm th-font-size">
                Nombre
              </button>
            </th>
            <th>
              <i class="bi-filter"></i>
              <button @click="sortCreated" class="btn btn-sm th-font-size">
                Creado
              </button>
            </th>
            <th>
              <button class="btn btn-sm th-font-size">Action</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="search in searchFiles" :key="search.name" class="tbody-tr">
            <td>{{ search.name }}</td>
            <!-- <td>{{ search.url }}</td>-->
            <td>{{ search.created }}</td>
            <td>
              <a :href="'/files/delete/' + search.name" title="Delete"
                ><i class="bi-trash-fill size-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>

      <!--PAGINATION-->
      <nav aria-label="Page navigation example" class="font-size-pagination">
        <ul v-if="pagination" class="pagination justify-content-center">
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
    <div v-else class="mt-4">
      <p class="alert alert-warning text-center">
        <!-- Aqui se muestran los archivos subidos, aún no ha subido ninguno-->
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "files-list",
  data() {
    return {
      //archivos permitidos,
      files: [],
      //archivos no permitidos,
      noFilesUpload: [],
      filesUpload: [],
      //pagination
      currentPage: 1,
      rows: 8,
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
    //UPLOAD FILES
    //Manejador de carga de archivos
    async handleFilesUploads() {
      const uploadedFiles = this.$refs.files.files;
      for (let i = 0; i < uploadedFiles.length; i++) {
        if (
          uploadedFiles[i].type.split("/")[1] == "pdf" ||
          uploadedFiles[i].name.split(".")[1] == "pdf" ||
          uploadedFiles[i].type.split("/")[1] == "jpg" ||
          uploadedFiles[i].name.split(".")[1] == "jpg" ||
          uploadedFiles[i].type.split("/")[1] == "jpeg" ||
          uploadedFiles[i].name.split(".")[1] == "jpeg" ||
          uploadedFiles[i].type.split("/")[1] == "png" ||
          uploadedFiles[i].name.split(".")[1] == "png"
        ) {
          this.filesUpload.push(uploadedFiles[i]);
        } else {
          this.noFilesUpload.push(uploadedFiles[i]);
        }
      }

      //console.log(this.files);
    },
    async submitFiles() {
      console.log(this.filesUpload);
      const token = localStorage.getItem("token");
      let form = new FormData();
      for (let i = 0; i < this.filesUpload.length; i++) {
        form.append("files", this.filesUpload[i]);
      }
      try {
        //console.log(this.$refs.files.files);
        const fileResult = await axios({
          method: "POST",
          url: "http://localhost:4000/api/uploads",
          data: form,
          headers: {
            Authorization: JSON.parse(token),
            "Content-type": "multipart/form-data",
          },
        });
        console.log(fileResult);
        if (fileResult.data.Message == "successfull") {
          this.successUpload = fileResult.data.Message;
          this.errUpload = false;
          location.replace("/files");
        }
      } catch (error) {
        console.log({ error: error.response.data.Message });
        this.errUpload = error.response.data.Message;
      }
    },
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
        //console.log(result.data);
      } catch (error) {
        this.err = error.response;
        console.log(error.response.data.Message);
      }
    },
    async cancelCharge() {
      this.filesUpload.splice(0, this.filesUpload.length + 1);
      this.noFilesUpload.splice(0, this.noFilesUpload.length + 1);
    },
    async removeFile(key) {
      this.filesUpload.splice(key, 1);
      this.err = false;
    },

    //Sort
    sortName() {
      const asc = (a, b) => {
        return a.name.localeCompare(b.name);
      };
      const desc = (a, b) => {
        return b.name.localeCompare(a.name);
      };

      if (this.algunValor) {
        this.algunValor = false;
        return this.searchFiles.sort(asc);
      } else {
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
    sortCreated() {
      const asc = (a, b) => {
        return new Date(a.created).valueOf() - new Date(b.created).valueOf();
      };
      const desc = (a, b) => {
        return new Date(b.created).valueOf() - new Date(a.created).valueOf();
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
                search.url.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
              (search.created !== null &&
                search.created.toLowerCase().indexOf(query.toLowerCase()) > -1)
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
<style>

</style>