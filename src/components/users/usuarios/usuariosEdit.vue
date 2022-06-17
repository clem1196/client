<template>
  <div>
    <button
      id="edit"
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
          <div class="modal-header" style="background: #5dade2">
            <h5 class="modal-title" id="editarModalLabel" style="color: white">
              {{title}}
            </h5>

            <a href="/usuarios" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="editUser">
              <div class="mb-3">
                <label for="User-name" class="col-form-label">Usuario:</label>
                <input
                  v-model="new_datos.new_nombre_usuario"
                  type="text"
                  class="form-control"
                  required
                  minlength="3"
                  maxlength="12"
                />
                <div
                  v-if="new_datos.new_nombre_usuario.length < 3"
                  style="color: red"
                >
                  Mínimo 3 caracteres
                </div>
              </div>

              <div class="mb-3">
                <label for="contraseña-text" class="col-form-label"
                  >Contraseña:</label
                >
                <input
                  v-model="new_datos.new_contraseña"
                  type="password"
                  class="form-control"
                  required
                  minlength="6"
                  maxlength="16"
                />
                <div
                  v-if="new_datos.new_contraseña.length < 6"
                  style="color: red"
                >
                  Mínimo 6 caracteres
                </div>
              </div>
              <!--Si el campo username o password se modifica el boton "Guardar" se habilita de lo
            contrario se deshabilita-->
              <div class="modal-footer-sm" style="background: #5dade2">
                <button
                  v-if="new_datos.new_nombre_usuario !== datos.nombre_usuario"
                  type="submit"
                  class="btn btn-light m-3"
                >
                  Guardar
                </button>
                <button
                  v-else-if="new_datos.new_contraseña !== datos.contraseña"
                  type="submit"
                  class="btn btn-light m-3"
                >
                  Guardar
                </button>
                <button v-else disabled type="submit" class="btn btn-light m-3">
                  Guardar
                </button>
                <a class="btn" href="/usuarios" style="color: white"
                  >Cancelar</a
                >
              </div>
            </form>
            <div
              v-if="message.advertencia == true"
              class="alert alert-warning"
              role="alert"
            >
              Va eliminar su propia cuenta, si continúa deberá iniciar sesión
              nuevamente.
            </div>           
          </div>
        </div>
        <div v-else class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Atención</h5>
            <a href="/usuarios" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert">
              No debe eliminar a este usuario "Admin". El sistema requiere al
              menos de un Administrador.
            </div>

            <div class="modal-footer">
              <a class="btn btn-secondary" href="/usuarios">Cancelar</a>
            </div>
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
import Hlpers from "../../../services/Helpers";
import axios from "axios";
import usuariosList from "./usuariosList.vue";
export default {
  name: "usuarios-edit",
  props: {
    title: {
      type: String,
      default: "Editar usuarios",
    },
  },
  data() {
    return {
      //datos originales del servidor
      datos: {
        nombre_usuario: "",
        contraseña: "",
      },
      //datos para editar
      new_datos: {
        new_nombre_usuario: "",
        new_contraseña: "",
      },
      //recibe del servidor o del catch
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
      const edit = document.getElementById("edit");
      edit.click();
    },
    //obtener un usuario y usuarios(por nombre y rol)
    async getUser() {
      const nameOfToken = await Hlpers.obtenerNombreUsuario();
      const token = localStorage.getItem("token");
      const result = await axios.get(
        "http://localhost:4000/api/data/" + this.$route.params.id,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        }
      );
      //console.log(result.data)
      //datos para editar
      this.new_datos.new_nombre_usuario = result.data.user[0].nombre_usuario;
      this.new_datos.new_contraseña = result.data.user[0].contraseña;
      //datos originales
      this.datos.nombre_usuario = result.data.user[0].nombre_usuario;
      this.datos.contraseña = result.data.user[0].contraseña;     

      //obtener el nombre del usuario a editar
      const userName = result.data.user[0].nombre_usuario;
      //obtener todos los roles del usuario a editar
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
      //si el usuario a editar es admin y es el último
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
    },

    async editUser() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.put(
          "http://localhost:4000/api/usuarios/" + this.$route.params.id,
          {
            nombre_usuario: this.new_datos.new_nombre_usuario,
            contraseña: this.new_datos.new_contraseña,
          },
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