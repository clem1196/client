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

            <a href="/Doc_personas" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            {{ title }}
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteDocs_Persons">Si</button>
            <a class="btn btn-light" href="/doc_personas">No</a>
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
import personsList from "../docs_persons/docs_personsList.vue";
export default {
  name: "doc-persons-delete",
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

  components: { personsList },
  async mounted() {   
    this.darclick();
  },

  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    async deleteDocs_Persons() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/doc-person/" + this.$route.params.id,

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
          location.replace("/doc_personas");
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
