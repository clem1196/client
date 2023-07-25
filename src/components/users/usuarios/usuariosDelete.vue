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

            <a href="/usuarios" class="btn btn-close"></a>
          </div>
          <div v-if="message.noEliminar == true" class="modal-body">
            <div class="alert alert-danger" role="alert">
              No debe eliminar a este usuario "Admin". El sistema requiere al
              menos de un Administrador.
            </div>
          </div>
          <div v-else class="modal-body">
            <div
              v-if="message.advertencia == true"
              class="alert alert-warning"
              role="alert"
            >
              Va eliminar su propia cuenta, si continúa deberá iniciar sesión
              nuevamente.
            </div>
            <div>{{ title }}.</div>
          </div>
          <div v-if="message.noEliminar == false" class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteUser">Si</button>
            <a class="btn btn-light" href="/usuarios">No</a>
          </div>
          <div v-else class="modal-footer">
            <a type="button" class="btn btn-light" href="/usuarios">
              Regresar
            </a>
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
import Helpers from "../../../services/users/Helpers";
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
        advertencia: false,
        noEliminar: false,
      },
    };
  },

  components: { usuariosList },
  async mounted() {
    this.getUser();
    this.darclick();
  },

  methods: {
    darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    //obtener un usuario
    async getUser() {
      try {
        const nameOfToken = await Helpers.obtenerNombreUsuario();
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "GET",
          url: "http://localhost:4000/api/data/" + this.$route.params.id,

          headers: {
            Authorization: JSON.parse(token),
          },
        });
        console.log(result.data);

        //obtener el nombre del usuario a eliminar
        const userName = result.data.users_ById[0].nombre_usuario;
        //obtener todos los roles del usuario a eliminar
        const userRoles = result.data.usersNames_rolesNames.filter(
          (element) => element.nombre_usuario == userName
        );
        //filtramos userRoles con el nombre del rol admin
        const userRol = userRoles.filter(
          (element) => element.nombre_rol == "admin"
        );
        //obtener la cantidad de usuarios admin
        const userAdmin = result.data.usersNames_rolesNames.filter(
          (element) => element.nombre_rol == "admin"
        );
        console.log({
          nombre: userName,
          roles: userRoles,
          userRol: userRol,
          numeroAdmin: userAdmin.length,
        });
        //si el usuario a eliminar es admin y es el último
        if (userRol.length > 0 && userAdmin.length < 2) {
          //restringimos su eliminación
          this.message.noEliminar = true;
          this.err = false;
        }
        //si el usuario a eliminar es admin y es el usuario actual.
        if (userRol.length > 0 && userName === nameOfToken) {
          //advertimos que debe iniciar sesión nuevamente
          this.message.advertencia = true;
          this.err = false;
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },
    async deleteUser() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/usuarios/" + this.$route.params.id,

          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        if (result.data.Message.length > 0) {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace("/usuarios");
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },
  },
};
</script>

<style>
</style>