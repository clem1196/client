<template>
  <div>
    <button
      id="add"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#addModal"
      data-bs-whatever="@mdo"
      hidden
    ></button>
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <!--modal header-->
          <div class="modal-header" style="background: #0097a7;">
            <h5 class="modal-title" id="addModalLabel" style="color: white;">
              {{ title }}
            </h5>

            <a href="/personas" class="btn btn-close"></a>
          </div>
          <!--modal header-->
          <div class="modal-body bg-light">
            <form @submit.prevent="addPersons">
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
              </div>
              <small v-if="datos.dni.length != 8" class="text-danger m-2"
                >8 caracteres</small
              >
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
                  >Mnínimo 2 caracteres</small
                >
              </div>
              <!--botones guardar y cancelar-->
              <div class="modal-footer-sm" style="background: #0097a7;">
                <button type="submit" class="btn btn-light m-3">
                  Guardar
                </button>
                <a class="btn" href="/personas" style="color: white;"
                  >Cancelar</a
                >
              </div>
            </form>
          </div>
        </div>
        <!--Message success-->
        <div
          v-if="message.success"
          class="alert alert-success mt-4 d-flex align-items-center"
          role="alert"
        >
          <i class="bi-check-circle-fill"></i> {{ message.success }}
        </div>
        <!--Message errors-->
        <div v-if="message.err" class="alert alert-danger mt-4">
          {{ message.err }}
        </div>
      </div>
    </div>
    <!--component usuarios-->
    <personsList></personsList>
  </div>
</template>

<script>
import axios from "axios";
import personsList from "./personsList.vue";
export default {
  name: "persons-add",
  props: {
    title: {
      type: String,
      default: "Agregar personas",
    },
  },
  data() {
    return {
      //datos originales que se recibe del servidor
      datos: {
        dni: "",
        firstSurname: "",
        lastSurname: "",
        name: "",
      },
      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
      },

      /*docs: [
        { doc: doc1, person: { person1, person2, person3 } },
        { doc: doc2, person: { person4, person5, person1 } },
      ],*/
    };
  },

  components: { personsList },
  async mounted() {
    this.darclick();
    //this.getFiles();
  },

  methods: {
    darclick() {
      const add = document.getElementById("add");
      add.click();
    },
    async addPersons() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/personas",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result);
        if (result.statusText == "Created") {
          this.message.success = result.data.Message;
          this.message.err = false;
          //location.replace("/personas");
          location.replace("/doc_personas/add");
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
