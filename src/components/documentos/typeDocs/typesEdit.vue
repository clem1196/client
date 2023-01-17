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
            <a href="/types" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="editTypes">              
             <!--Campo name_type-->
              <div class="mb-2">
                <label for="" class="col-form-label">Tipo Doc:</label>
                <input
                  v-model="datos.name_type"
                  type="text"
                  class="form-control"
                  style="font-size: 0.9rem;"
                  required
                  minlength="4"                 
                />
              </div>
             <small v-if="datos.name_type.length<4" class="text-danger m-2"
                >Mínimo 4 caracteres</small
              >
              <!--Campo name_type-->
              <div class="mb-2">
                <label for="" class="col-form-label">Estado:</label>
                <input
                  v-model="datos.state"
                  type="number"
                  class="form-control"
                  style="font-size: 0.9rem;"
                  required
                  minlength="1"
                  maxlength="1"                 
                />
              </div>
              <small v-if="datos.state.length ==''" class="text-danger m-2"
                >Mínimo 1 caracter</small
              >          
              
              <div class="modal-footer-sm" style="background: #0097a7;">
                <button type="submit" class="btn btn-light m-3">
                  Actualizar
                </button>
                <a class="btn" href="/types" style="color: white;"
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
    <typesList></typesList>
  </div>
</template>

<script>
import axios from "axios";
import typesList from "./typesList.vue";
export default {
  name: "types-edit",
  props: {
    title: {
      type: String,
      default: "Editar tipo de doc",
    },
  },
  data() {
    return {
      datos: {
        name_type: "",        
        state: "",
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
    this.getTypes();
    this.darclick();
  },

  methods: {
    darclick() {
      const edit = document.getElementById("edit");
      edit.click();
    },
    //obtener un type
    async getTypes() {
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

        if (result.data.lists.types_ById[0].length > 0) {
          this.datos.name_type = result.data.lists.types_ById[0][0].name_type;
          this.datos.state = result.data.lists.types_ById[0][0].state;         
        }else{
          this.message.err="No hay datos que mostrar"
        }
      } catch (error) {
        console.log(error.response);
      }
    },

    async editTypes() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.put(
          "http://localhost:4000/api/types/" + this.$route.params.id,
          {
            name_type: this.datos.name_type,            
            state: this.datos.state,
          },
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        console.log(result)
        if (result.statusText == "Created") {
          this.message.err = false;
          this.message.success = result.data.Message;
          location.replace("/types");
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
