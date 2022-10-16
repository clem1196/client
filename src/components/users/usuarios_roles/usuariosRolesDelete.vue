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

    <!--normal-->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <!--No eliminar-->
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 id="deleteModalLabel" class="modal-title">Atención!</h5>
            <a href="/usuarios-roles" class="btn btn-close"></a>
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
            <div>Seguro que desea eliminar esto?.</div>
          </div>
          <div v-if="message.noEliminar == false" class="modal-footer">
            <button class="btn btn-danger m-3" @click="deleteUserRoles">
              Si
            </button>
            <a type="button" class="btn btn-light" href="/usuarios-roles">
              No
            </a>
          </div>
          <div v-else class="modal-footer">
            <a type="button" class="btn btn-light" href="/usuarios-roles">
              Regresar
            </a>
          </div>
        </div>
        <!--messages-->
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
    <usuariosRolesList></usuariosRolesList>
  </div>
</template>

<script>
import axios from "axios";
import Helpers from "../../../services/Helpers";
import usuariosRolesList from "./usuariosRolesList.vue";
export default {
  name: "usuariosRoles-delete",
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
        advertencia: false,
      },
    };
  },

  components: { usuariosRolesList },
  async mounted() {
    await this.getUser();
    await this.darclick();
  },

  methods: {
    async darclick() {
      const del = document.getElementById("delete");
      del.click();
    },
    //obtener usuarios por nombre y rol
    async getUser() {
      try {
        const nameOfToken = await Helpers.obtenerNombreUsuario();
        const token = localStorage.getItem("token");
        //obtenemos datos de usuarios_roles
        const result = await axios.get(
          "http://localhost:4000/api/data/" + this.$route.params.id,
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        //console.log(result.data);

        // comprobamos que el rol del usuario a editar sea admin
        //luego filtramos el rol admin en el array para obtener la cantidad de usuarios admin 
        if (result.data.usersNames_rolesNames_ById[0].nombre_rol == "admin" &&
            result.data.usersNames_rolesNames.filter(element => element.nombre_rol === "admin").length < 2
        ) {
          //significa que hay solo un administrador, entonces restringimos su eliminación
          this.message.noEliminar = true;
          this.err = false;
        }
        if (
          result.data.usersNames_rolesNames_ById[0].nombre_usuario == nameOfToken &&
          result.data.usersNames_rolesNames_ById[0].nombre_rol == "admin"
        ) {
          //significa que hay mas de un administrador, entonces advertimos su eliminación
          this.message.advertencia = true;
          this.err = false;
        }
      } catch (error) {
        this.err = error.response.data.Message;
        console.log(error.response);
      }
    },
    async deleteUserRoles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(
          "http://localhost:4000/api/u_roles/" + this.$route.params.id,

          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        if (result.data.Reset == true) {
          this.message.success = result.data.Message;
          this.message.err = false;
          await Helpers.Logout();
          location.replace("/login");
        } else {
          this.message.success = result.data.Message;
          this.message.err = false;
          location.replace("/usuarios-roles");
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