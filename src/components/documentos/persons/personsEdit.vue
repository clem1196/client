<template>
  <div>
    <button
      id="edit"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#editarModal"
      data-bs-whatever="@mdo"
      hidden
    ></button>
    <div
      class="modal fade"
      id="editarModal"
      tabindex="-1"
      aria-labelledby="editarModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="background: #0097a7;">
            <h5 class="modal-title" id="editarModalLabel" style="color: white;">
              {{ title }}
            </h5>
            <a href="/personas" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="editPersons">
              <!--Campo dni-->
              <div class="mb-2">
                <label for="dni-text" class="col-form-label">Dni:</label>
                <input
                  v-model="datos.dni"
                  class="form-control"
                  style="font-size: 0.9rem;"
                  required
                  minlength="8"
                  maxlength="8"
                />
                <small v-if="datos.dni.length != 8" class="text-danger m-2"
                  >8 caracteres</small
                >
              </div>

              <!--Campo firstSurname-->
              <div class="mb-2">
                <label for="firstSurname-text" class="col-form-label"
                  >Ap. paterno:</label
                >
                <input
                  v-model="datos.firstSurname"
                  type="text"
                  class="form-control"
                />
              </div>
              <!--Campo lastSurname-->
              <div class="mb-2">
                <label for="lastSurname-text" class="col-form-label"
                  >Ap. Materno:</label
                >
                <input
                  v-model="datos.lastSurname"
                  type="text"
                  class="form-control"
                />
              </div>
              <!--Campo Nombres-->
              <div class="mb-2">
                <label for="name-text" class="col-form-label">Nombres:</label>
                <input
                  v-model="datos.name"
                  type="text"
                  class="form-control"
                  required
                  minlength="2"
                />
                <small v-if="datos.name.length < 2" class="text-danger m-2"
                  >Mínimo 2 caracteres</small
                >
              </div>
              <!--Campo state-->
              <div class="mb-2">
                <label for="name-text" class="col-form-label">Estado:</label>
                <input
                  v-model="datos.state"
                  type="text"
                  class="form-control"
                  required
                  maxlength="1"
                />
                <small v-if="datos.state.length < 1" class="text-danger m-2"
                  >1 carácter</small
                >
              </div>
              <!--Si los campos estan llenos se habilita el boton "Guardar" de lo
            contrario se deshabilita-->
              <div class="modal-footer-sm" style="background: #0097a7;">
                <button type="submit" class="btn btn-light m-3">
                  Actualizar
                </button>
                <a class="btn" href="/personas" style="color: white;"
                  >Cancelar</a
                >
              </div>
            </form>
          </div>
        </div>
        <div
          v-if="message.success"
          class="alert alert-success mt-4 d-flex align-items-center"
          role="alert"
        >
          <i class="bi-check-circle-fill"></i> {{ message.success }}
        </div>
        <div v-if="message.err" class="alert alert-danger mt-4">
          {{ message.err }}
        </div>
      </div>
    </div>
    <personsList></personsList>
  </div>
</template>

<script>
import axios from "axios";
import personsList from "./personsList.vue";
export default {
  name: "persons-edit",
  props: {
    title: {
      type: String,
      default: "Editar personas",
    },
  },
  data() {
    return {
      datos: {
        dni: "",
        firstSurname: "",
        lastSurname: "",
        name: "",
        state: "",
      },
      //copia de datos para comparar.
      datos_copy: {
        dni: "",
        firstSurname: "",
        lastSurname: "",
        name: "",
        state: "",
      },
      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
      },
    };
  },

  components: { personsList },
  async mounted() {
    this.getPersons();
    this.darclick();
  },

  methods: {
    darclick() {
      const edit = document.getElementById("edit");
      edit.click();
    },
    //obtener una persona
    async getPersons() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          "http://localhost:4000/api/docs/data/" + this.$route.params.id,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        console.log(result.data.lists);

        if (result.data.lists.persons_ById.length > 0) {
          this.datos.dni = result.data.lists.persons_ById[0][0].dni;
          this.datos.firstSurname =
            result.data.lists.persons_ById[0][0].firstSurname;
          this.datos.lastSurname =
            result.data.lists.persons_ById[0][0].lastSurname;
          this.datos.name = result.data.lists.persons_ById[0][0].name;
          this.datos.state = result.data.lists.persons_ById[0][0].state;
          //copy
          this.datos_copy.dni = result.data.lists.persons_ById[0][0].dni;
          this.datos_copy.firstSurname =
            result.data.lists.persons_ById[0][0].firstSurname;
          this.datos_copy.lastSurname =
            result.data.lists.persons_ById[0][0].lastSurname;
          this.datos_copy.name = result.data.lists.persons_ById[0][0].name;
          this.datos_copy.state = result.data.lists.persons_ById[0][0].state;
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async editPersons() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.put(
          "http://localhost:4000/api/personas/" + this.$route.params.id,
          {
            dni: this.datos.dni,
            firstSurname: this.datos.firstSurname,
            lastSurname: this.datos.lastSurname,
            name: this.datos.name,
            state: this.datos.state,
          },
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        //console.log(result)
        if (result.statusText == "Created") {
          this.message.err = false;
          this.message.success = result.data.Message;
          location.replace("/personas");
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
