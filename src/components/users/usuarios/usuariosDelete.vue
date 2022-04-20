<template>
  <div>
    <button
      id="delete"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#deleteModal"
      data-bs-whatever="@mdo"
      hidden
    ></button>
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title" id="deleteModalLabel" style="color: white">
              {{ title }}
            </h5>

            <a href="/usuarios" class="btn btn-close"></a>
          </div>
          <div class="modal-footer-sm bg-danger">
            <button class="btn btn-light m-3" @click="deleteUser">Si</button>
            <a class="btn btn-default" href="/usuarios" style="color: white"
              >No</a
            >
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
    <usuariosList></usuariosList>
  </div>
</template>

<script>
import axios from "axios";
import usuariosList from "./usuariosList.vue";
export default {
  name: "usuarios-delete",
  props: {
    title: {
      type: String,
      default: "Estas seguro que quieres eliminar esto?",
    },
  },
  data() {
    return { 
        
      message: {
        success: "",
        err: "",
      },
    };
  },

  components: { usuariosList },
  async mounted() {
    
    this.darclick();
  },

  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    async deleteUser() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/usuarios/" + this.$route.params.id,
          
          {
              headers:{
                  Authorization: JSON.parse(token)
              }
          }

        );
        if(result.data.message.length>0) {
            this.message.success=result.data.message;
            location.replace("/usuarios");
        }       
      } catch (error) {
        this.message.err="No se pudo eliminar";
        console.log(error);
      }
    },
  },
};
</script>

<style>

</style>