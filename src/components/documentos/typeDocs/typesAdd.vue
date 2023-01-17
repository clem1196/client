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

            <a href="/types" class="btn btn-close"></a>
          </div>
          <!--modal header-->
          <div class="modal-body bg-light">
            <form @submit.prevent="addTypes">
              <!--Campo name_type-->
              <div class="mb-2">
                <label for="dni-text" class="col-form-label">Tipo Doc:</label>
                <input
                  v-model="datos.name_type"
                  class="form-control"
                  style="font-size: 0.9rem;"
                  required
                  minlength="4"
                  autofocus
                />
              </div>
              <small v-if="datos.name_type.length < 4" class="text-danger m-2"
                >Mínimo 4 caracteres</small
              >
              <!--botones guardar y cancelar-->
              <div class="modal-footer-sm" style="background: #0097a7;">
                <button
                  @click="setTimeOutMessage"
                  type="submit"
                  class="btn btn-light m-3"
                >
                  Guardar
                </button>
                <a class="btn" href="/types" style="color: white;">Terminar</a>
                <a class="btn" href="/types" style="color: white;">Cancelar</a>
              </div>
            </form>
            <!--Message success-->
            <div
              v-if="message.success"              
              id="success"
              class="alert alert-success mt-4"
            >
              {{ message.success }}
            </div>
            <!--Message errors-->
            <div v-if="message.err"  id="err" class="alert alert-danger mt-4">
              {{ message.err }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--component usuarios-->
    <typesList></typesList>
  </div>
</template>

<script>
import axios from "axios";
import typesList from "./typesList.vue";
export default {
  name: "types-add",
  props: {
    title: {
      type: String,
      default: "Agregar tipo de documento",
    },
  },
  data() {
    return {
      //datos originales que se recibe del servidor
      datos: {
        name_type: "",
      },
      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
      },
    };
  },

  components: { typesList },
  async mounted() {
    this.darclick();
    //this.getFiles();
  },

  methods: {
    async setTimeOutMessage() {
      setTimeout(this.messageHidden, 1000);
    },
    messageVisible() {
      let success = document.getElementById("success");
      success.hidden = false;
    },
    messageHidden() {
      let success = document.getElementById("success");
      success.hidden = true;
    },
    darclick() {
      const add = document.getElementById("add");
      add.click();
    },

    async addTypes() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/types",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result);
        if (result.statusText == "Created") {
          this.message.err = '';         
          this.message.success = result.data.Message;  
          await this.messageVisible();         
          //location.replace("/types");
          //location.replace("/types/add");
        }
      } catch (error) {
        this.message.err = await error.response.data.Message;
        this.message.success = '';
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
