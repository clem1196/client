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
            <a :href="myRoute" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            {{ title }}
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteDocs">Si</button>
            <a class="btn btn-light" :href="myRoute">No</a>
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
   
  </div>
</template>

<script>
import axios from "axios";
//import docsList from "./docsList.vue";
export default {
  name: "delete-documents",
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
      myUrl:"",
      myRoute:""
    };
  },

  components: { 
    //docsList
     },
  async mounted() {
    //this.getPersons();   
    this.getUrl()
    this.darclick();
  },

  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
     async getUrl(){
       if (this.$route.name=="docsDelete") {
          this.myUrl="http://localhost:4000/api/documentos/"+ this.$route.params.id;
          this.myRoute="/documentos";
        }        
        if (this.$route.name=="personsDelete") {
          this.myUrl= "http://localhost:4000/api/personas/"+ this.$route.params.id;
          this.myRoute="/personas";
        }
        if (this.$route.name=="typesDelete") {
          this.myUrl= "http://localhost:4000/api/types/"+ this.$route.params.id;
          this.myRoute="/types";
        }
        if (this.$route.name=="docs_personsDelete") {
          this.myUrl= "http://localhost:4000/api/doc-person/"+ this.$route.params.id;
          this.myRoute="/doc_personas"
        }
        if (this.$route.name=="Delete") {
          this.myUrl= "http://localhost:4000/api/files/"+ this.$route.params.name;
          this.myRoute="/upload"
        }
      console.log(this.$route.name, this.myRoute, this.myUrl)
    },
    async deleteDocs() {
      try {
        const token = localStorage.getItem("token");       

        const result = await axios.delete(
          this.myUrl, 
          {
          headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        console.log(result);
        if (result.statusText == "OK") {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace(this.myRoute);
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
