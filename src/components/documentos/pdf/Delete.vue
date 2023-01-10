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

            <a href="/files" class="btn btn-close"></a>
          </div>

          <div class="modal-body">
            <div class="alert alert-warning" role="alert">
              {{ title }}
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteFiles">Si</button>
            <a class="btn btn-light" href="/files">No</a>
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
    <Files></Files>
  </div>
</template>

<script>
//import Helpers from "../../../services/Helpers";
import axios from "axios";
import Files from "./Files.vue";
export default {
  name: "delete-files",
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

  components: { Files },
  async mounted() {
    this.darclick();
  },
  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    async deleteFiles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/files/" + this.$route.params.name,

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
          location.replace("/files");
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
