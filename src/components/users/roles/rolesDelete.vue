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
        <div v-if="message.noEliminar == false" class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">Delete</h5>
            <a href="/roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <h5 class="modal-title">
              {{ title }}
            </h5>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteRol">Si</button>
            <a class="btn btn-light" href="/roles">No</a>
          </div>
        </div>
        <!--No debe eliminar-->
        <div v-else class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title" id="deleteModalLabel">Atención</h5>

            <a href="/roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert">
              No debe eliminar el rol "Admin". El sistema requiere de un
              Administrador.
            </div>
          </div>
          <div class="modal-footer">
            <a class="btn btn-secondary" href="/roles">Regresar</a>
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
    <rolesList></rolesList>
  </div>
</template>

<script>
import axios from "axios";
import rolesList from "./rolesList.vue";
export default {
  name: "roles-delete",
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
        noEliminar: false,
      },
    };
  },

  components: { rolesList },
  async mounted() {
    await this.getRol();
    this.darclick();
  },

  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    async getRol() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "GET",
          url: "http://localhost:4000/api/data/" + this.$route.params.id,

          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result.data);

        //obtener el nombre del rol a eliminar
        const rolName = result.data.rol[0].nombre_rol;

        //console.log({rol: rolName});
        //si el rol es admin
        if (rolName==="admin") {
          //restringimos su eliminación
          this.message.noEliminar = true;
          this.err = false;
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },
    async deleteRol() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/roles/" + this.$route.params.id,

          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        if (result.data.Message.length > 0) {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace("/roles");
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },
  },
};
</script>

<style>
</style>