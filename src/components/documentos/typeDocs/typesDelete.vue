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

            <a href="/personas" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            {{ title }}
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteTypes">Si</button>
            <a class="btn btn-light" href="/types">No</a>
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
  name: "types-delete",
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

  components: { typesList },
  async mounted() {   
    this.darclick();
  },

  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    async deleteTypes() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/types/" + this.$route.params.id,

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
