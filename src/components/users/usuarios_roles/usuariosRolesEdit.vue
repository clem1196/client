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

            <a href="/usuarios-roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <form @submit.prevent="EditarRol_usuario">
              <!--campo idusuario-->
              <div class="mb-3">
                <label for="idusuario" class="col-form-label">Usuario:</label>
                <input
                  v-model="datos.idusuario"
                  id="idusuario"
                  class="form-control"
                  required
                  readonly
                  disabled
                />
                <select id="selectIdUsuario" @change="llenarUsuarios">
                  <option :value="datos.idusuario">{{textInitialUsers}}</option>
                  <option
                    v-for="usuario in arrayUsuarios"
                    :key="usuario"
                    :value="usuario.value"
                  >
                    {{ usuario.text }}
                  </option>
                </select>
               
              </div>              
              <!--campo idroles-->
              <div class="mb-3">
                <label for="idroles" class="col-form-label">Rol:</label>
                <input
                  v-model="datos.idroles"
                  id="idroles"
                  class="form-control"
                  required
                  readonly
                  disabled
                />
                <select id="selectIdRoles" @change="llenarRoles">
                  <option :value="datos.idroles">{{textInitialRoles}}</option>
                  <option
                    v-for="rol in arrayRoles"
                    :key="rol"
                    :value="rol.value"
                  >
                    {{ rol.text }}
                  </option>
                </select>
              </div>
              <div class="modal-footer-sm footUserForm">
                <!--button guardar-->
                <button
                  v-if="
                    new_datos.new_idusuario !== datos.idusuario ||
                    new_datos.new_idroles !== datos.idroles
                  "
                  type="submit"
                  class="btn btnUserForm"
                >
                  Guardar
                </button>
                <button v-else disabled type="submit" class="btn btnUserForm">
                  Guardar
                </button>
                <!--cancelar-->
                <a class="btn btnUserForm-cancel" href="/usuarios-roles"
                  >Cancelar</a
                >
              </div>
            </form>

            <!--advertencia-->
            <div>
              <div
                v-if="message.advertencia == true"
                class="alert alert-warning mt-4"
                role="alert"
              >
                Va modificar su propia cuenta, si continúa deberá iniciar sesión
                nuevamente
              </div>
            </div>
            <!--messages-->
            <div
              v-if="message.success.length > 0"
              class="alert alert-success mt-4 d-flex align-items-center"
              role="alert"
            >
              <i class="bi-check-circle-fill"></i> {{ message.success }}
            </div>
            <div v-if="message.err.length > 0" class="alert alert-danger mt-4">
              {{ message.err }}
            </div>
          </div>
        </div>



        <!--restrición-->
        <div v-else class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title" id="editarModalLabel">Atencion!</h5>
            <a href="/usuarios-roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" role="alert">
              No debe modificar al usuario "admin", El sistema requiere al menos
              de un Administrador
            </div>
          </div>
          <div class="modal-footer">
            <a class="btn btn-secondary" href="/usuarios-roles">Regresar</a>
          </div>
        </div>
      </div>
    </div>
    <usuariosRolesList></usuariosRolesList>
  </div>
</template>

<script>
import Helpers from "../../../services/users/Helpers";
import axios from "axios";
import usuariosRolesList from "./usuariosRolesList.vue";
export default {
  name: "usuariosRoles-edit",
  props: {
    title: {
      type: String,
      default: "Editando usuarios_roles",
    },
  },
  data() {
    return {
      //datos originales que se recibe del servidor
      datos: {
        idusuario: null,
        idroles: null,
      },
      //datos para comparar
      new_datos: {
        new_idusuario: null,
        new_idroles: null,
      },
      //recibe del servidor
      message: {
        success: "",
        err: "",
        //datos para no editao eliminar un usuario admin
        advertencia: false,
        noEliminar: false,
      },
      //usuarios para el select
      arrayUsuarios: [],
      //roles para el select
      arrayRoles: [],
      //para llenar el text del usuario seleccionado
      textInitialUsers:"",
      //para llenar el text del rol seleccionado
      textInitialRoles:"",
    };
  },

  components: { usuariosRolesList },
  async mounted() {
    await this.getUsers();
    await this.darclick();
  },

  methods: {
    async darclick() {
      const edit = document.getElementById("editar");
      edit.click();
    },
    async llenarUsuarios() {
      let elementSelectId = document.getElementById("selectIdUsuario");
      let inputId = document.getElementById("idusuario");

      inputId.value = elementSelectId.value;
      this.datos.idusuario = parseInt(inputId.value);
      inputId.disabled = false;
    },
    async llenarRoles() {
      let elementSelectId = document.getElementById("selectIdRoles");
      let inputId = document.getElementById("idroles");

      inputId.value = elementSelectId.value;
      this.datos.idroles = parseInt(inputId.value);
      inputId.disabled = false;
    },
    //obtener usuarios y usuarios_roles
    async getUsers() {
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

        
        //asignamos el valor del textInitialUsers
        this.textInitialUsers= result.data.usersNames_rolesNames_ById[0].nombre_usuario
         //asignamos el valor del textInitialRoles
        this.textInitialRoles= result.data.usersNames_rolesNames_ById[0].nombre_rol
                
        //para llenar arrayUsuarios
        for (let index = 0; index < result.data.users.length; index++) {
          const objetos_usuarios = {
            value: result.data.users[index].idusuario,
            text: result.data.users[index].nombre_usuario,
          };
          this.arrayUsuarios.push(objetos_usuarios);
          }        
        //para llenar arrayRoles
        for (let index = 0; index < result.data.roles.length; index++) {
          const objetos_roles = {
            value: result.data.roles[index].idroles,
            text: result.data.roles[index].nombre_rol,
          };
          this.arrayRoles.push(objetos_roles);
        }

        //datos para llenar los campos del usuario que vamos modificar
        this.datos.idusuario = result.data.users_roles_ById[0].idusuario;
        this.datos.idroles = result.data.users_roles_ById[0].idroles;
        //datos para comparar los campos si hubo o no cambios
        this.new_datos.new_idusuario = result.data.users_roles_ById[0].idusuario;
        this.new_datos.new_idroles = result.data.users_roles_ById[0].idroles;

        //Advertir o restringir para no editar un usuario "admin",
        // comprobamos que el rol del usuario a editar sea admin,
        //luego filtramos el rol admin en el array para obtener la cantidad de usuarios admin
        if (
          result.data.usersNames_rolesNames_ById[0].nombre_rol == "admin" &&
          result.data.usersNames_rolesNames.filter(
            (element) => element.nombre_rol === "admin"
          ).length < 2
        ) {
          //significa que hay solo un administrador, entonces restringimos su edición
          this.message.noEliminar = true;
          this.message.err = false;
        }
        if (
          result.data.usersNames_rolesNames_ById[0].nombre_usuario ==
            nameOfToken &&
          result.data.usersNames_rolesNames_ById[0].nombre_rol == "admin"
        ) {
          //significa que hay mas de un administrador, entonces advertimos su edición
          this.message.advertencia = true;
          this.err = false;
        }
      } catch (error) {
        this.message.err = error.response.data.Message;
        console.log(error.response);
      }
    },

    async EditarRol_usuario() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "PUT",
          url: "http://localhost:4000/api/u_roles/" + this.$route.params.id,
          data: {
            idusuario: this.datos.idusuario,
            idroles: this.datos.idroles,
          },
          headers: {
            Authorization: JSON.parse(token),
          },
        });

        if (result.data.Reset == true) {
          console.log(result.data);
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