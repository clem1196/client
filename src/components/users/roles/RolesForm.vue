<template>
  <div>
    <button
      id="editar"
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
        <div v-if="message.noEliminar == false" class="modal-content">
          <div class="modal-header headUserForm">
            <h5 class="modal-title" id="editarModalLabel">
              {{ title }}
            </h5>

            <a href="/roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <form @submit.prevent="changeRol">
              <div class="mb-3">
                <label for="rol-name" class="col-form-label">Rol:</label>
                <input
                  v-model="datos.nombre_rol"
                  type="text"
                  class="form-control"
                  required
                  minlength="3"
                  maxlength="12"
                />
                <div class="text-alert-form" v-if="this.datos.nombre_rol.length < 3">
                  Mínimo 3 caracteres
                </div>
              </div>
              <div v-if="id!=undefined" class="modal-footer-sm footUserForm">
                <button v-if="new_nombre_rol !== datos.nombre_rol" type="submit" class="btn btnUserForm">Update</button>
                <button v-else disabled type="submit" class="btn btnUserForm">Update</button>
                <a class="btn btnUserForm-cancel" href="/roles">Cancel</a>
              </div>
              <div v-else class="modal-footer-sm footUserForm">
                <button type="submit" class="btn btnUserForm">Save</button>
                <a class="btn btnUserForm-cancel" href="/roles">Cancel</a>
              </div>
            </form>
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
              <h6>No debe modificar el rol "Admin".</h6>
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
  name: "change-Roles",
  props: {
    title: {
      type: String,
      default: "Change roles",
    },
  },
  data() {
    return {
      //datos originales del servidor
      datos: {
        nombre_rol: "",
      },
      //valor para comparar
      new_nombre_rol: "",     
      id: this.$route.params.id,
      //message del servidor o del catch
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
      const edit = document.getElementById("editar");
      edit.click();
    },

    async getRol() {
      const token = localStorage.getItem("token");
      if (this.id != undefined) {
        try {
          const result = await axios({
            method: "GET",
            url: "http://localhost:4000/api/data/" + this.id,
            headers: {
              Authorization: JSON.parse(token),
            },
          });
          //console.log(result.data)
          //obtener el nombre del rol a eliminar
          const rolName = result.data.roles_ById[0].nombre_rol;
          console.log(rolName);
          //si el rol es admin
          if (rolName === "admin") {
            //restringimos su eliminación
            this.message.noEliminar = true;
            this.err = false;
          } else {
            //llena los campos
            this.datos.nombre_rol = result.data.roles_ById[0].nombre_rol;
            this.new_nombre_rol = result.data.roles_ById[0].nombre_rol;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async changeRol() {
      try {
        const token = localStorage.getItem("token");
        if (this.id != undefined) {
          let resultPut = await axios({
            method: "PUT",
            url: "http://localhost:4000/api/roles/" + this.id,
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          });
          if (resultPut.statusText == "Created") {
            this.message.success = resultPut.data.Message;
            this.message.err = false;
            location.replace("/roles");
          }
        } else {
          const resultPost = await axios({
            method: "POST",
            url: "http://localhost:4000/api/roles/crear",
            data: this.datos,
            headers: {
              Authorization: JSON.parse(token),
            },
          });
          if (resultPost.statusText == "Created") {
            this.message.success = resultPost.data.Message;
            this.message.err = false;
            location.replace("/roles");
          }
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },
  },
};
</script>

<style scoped>

</style>
