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

            <a href="/doc_personas" class="btn btn-close"></a>
          </div>
          <!--modal header-->
          <div class="modal-body bg-light">
            <form @submit.prevent="addDocs_Persons">
              <!--Campo documentid-->
              <div class="mb-2">
                <label for="" class="col-form-label">Doc:</label>
                <select
                  v-model="datos.documentid"
                  class="form-select form-select-sm"
                  style="font-size: 0.9rem;"
                  required
                >
                  <option
                    v-for="(doc, index) in documents"
                    :key="index"
                    :value="documents[index].documentid"
                    >{{ documents[index].doc_number }}
                  </option>
                </select>
                <small
                  v-if="datos.documentid.length == ''"
                  class="text-danger m-2"
                  >Requerido</small
                >               
              </div>

              <!--Campo personid-->
              <div class="mb-2">
                <label for="" class="col-form-label">Persona:</label>
                <select
                  v-model="datos.personid"
                  class="form-select form-select-sm"
                  style="font-size: 0.9rem;"
                  required
                >
                  <option
                    v-for="(per, index) in persons"
                    :key="index"
                    :value="persons[index].personid"
                    >{{ persons[index].fullname }}
                  </option>
                </select>
                <small
                  v-if="datos.personid.length == ''"
                  class="text-danger m-2"
                  >Requerido</small
                >                
              </div>

              <!--Campo attended_by-->
              <div class="mb-2">
                <label for="" class="col-form-label">Atendido Por:</label>                
                <div class="mb-3">
                  <select
                  v-model="datos.attended_by"
                    class="form-select form-select-sm"                   
                    style="font-size: 0.9rem;"                   
                  >  
                   <option value="ORC_Huancayo">ORC_Huancayo</option>                 
                    <option value="ORA_Puno">ORA_Puno</option>
                    <option value="ORL_Lima">ORL_Lima</option>                   
                    <option value="ORNOSM_San Martin">ORNOSM_San Martin</option>
                    <option value="ORN_Chiclayo">ORN_Chiclayo</option>
                    <option value="OROP_Pucallpa">OROP_Pucallpa</option>
                    <option value="Sede_Central">Sede_Central</option>
                  </select>                              
                </div>
              </div>
              <!--botones guardar y cancelar-->
              <div class="modal-footer-sm" style="background: #0097a7;">
                <button type="submit" class="btn btn-light m-3">
                  Guardar
                </button>
                <a class="btn" href="/doc_personas" style="color: white;"
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
import personsList from "../docs_persons/docs_personsList.vue";
export default {
  name: "docs_persons-add",
  props: {
    title: {
      type: String,
      default: "Agregar doc_personas",
    },
  },
  data() {
    return {
      //datos originales que se recibe del servidor
      datos: {
        documentid: "",
        personid: "",
        attended_by: "ORC_Huancayo",          
      },
      documents: [],
      persons: [],

      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
      },
    };
  },

  components: { personsList },
  async mounted() {
    this.darclick();
    this.getPersons();
    this.getDocs();
  },

  methods: {
    darclick() {
      const add = document.getElementById("add");
      add.click();
    },
    async getPersons() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "GET",
          url: "http://localhost:4000/api/docs/data",
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        //console.log(result.data.lists);
        if (result.data.lists.persons[0].length > 0) {
          this.persons = result.data.lists.persons[0];
          this.message.err = false;
        }
        //console.log(this.persons);
      } catch (error) {
        console.log(error.response);
      }
    },
    async getDocs() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "GET",
          url: "http://localhost:4000/api/docs/data",
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        //console.log(result.data.lists);
        if (result.data.lists.documents[0].length > 0) {
          this.documents = result.data.lists.documents[0];
          this.message.err = false;
        }
        //console.log(this.documents);
      } catch (error) {
        console.log(error.response);
      }
    },
    async addDocs_Persons() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/doc-person",
          data: this.datos,
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result);
        if (result.statusText=="Created") {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace("/doc_personas");
        }
      } catch (error) {
        this.message.err=error.response.data.Message;
        console.log(error.response);
      }
    },
  },
};
</script>

<style></style>
