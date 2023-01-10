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
          <div class="modal-header bg-light">
            <h5 class="modal-title">Delete</h5>

            <a href="/documentos" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            {{ title }}
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteUser">Si</button>
            <a class="btn btn-light" href="/documentos">No</a>
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
    <docsList></docsList>
  </div>
</template>

<script>
import axios from "axios";
import docsList from "./docsList.vue";
export default {
  name: "docs-delete",
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

  components: { docsList },
  async mounted() {
    //this.getPersons();
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
          "http://localhost:4000/api/documentos/" + this.$route.params.id,

          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        console.log(result)
        if (result.statusText=="OK") {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace("/documentos");
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
