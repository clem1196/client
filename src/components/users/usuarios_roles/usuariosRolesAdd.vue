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
          <div class="modal-header headUserForm">
            <h5 class="modal-title" id="addModalLabel">
             {{title}}
            </h5>

            <a href="/usuarios-roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addUserRoles">

            <!--campo idusuario-->
              <div class="mb-3">
                <label for="idusuario" class="col-form-label">Usuario:</label>
                <input
                  v-model="datos.idusuario"
                  id="idusuario"
                  class="form-control"
                  required
                  readonly
                  focus
                  disabled
                />
                <select id="selectIdUsuario" @change="llenarUsuarios">
                  <option value="0">Seleccione</option>
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
                  disabled
                  readonly
                />
                <select id="selectIdRoles" @change="llenarRoles">
                  <option value="0">Seleccione</option>
                  <option
                    v-for="rol in arrayRoles"
                    :key="rol"
                    :value="rol.value"
                  >
                    {{ rol.text }}
                  </option>
                </select>                
              </div>

              <!--button guardar-->
              <div class="modal-footer-sm footUserForm">
                <button
                  v-if="datos.idusuario !== null && datos.idroles !== null"
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
import usuariosRolesList from "./usuariosRolesList.vue";
export default {
  name: "usuariosRoles-add",
  props: {
    title: {
      type: String,
      default: "Asignando Rol",
    },
  },
  data() {
    return {
      //datos originales que se recibe del servidor
      datos: {
        idusuario: null,
        idroles: null,
      },

      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
      },

      arrayUsuarios: [],
      arrayRoles: [],
    };
  },

  components: { usuariosRolesList },
  async mounted() {
    await this.getUsers();   
    this.darclick();
  },

  methods: {
    darclick() {
      const add = document.getElementById("add");
      add.click();
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
    //obtener usuarios
    async getUsers() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.get(
          "http://localhost:4000/api/data",
          {
            headers: {
              Authorization: JSON.parse(token),
            },
          }
        );
        console.log(result.data)
        //usuarios
        for (
          let index = 0;
          index < result.data.users.length;
          index++
        ) {
          const objetos_usuarios = {
            value: result.data.users[index].idusuario,
            text: result.data.users[index].nombre_usuario,
          };
          this.arrayUsuarios.push(objetos_usuarios);
        }
        //roles
        for (let index = 0; index < result.data.roles.length; index++) {
          const objetos_roles = {
            value: result.data.roles[index].idroles,
            text: result.data.roles[index].nombre_rol,
          };
          this.arrayRoles.push(objetos_roles);
        }
      } catch (error) {
        console.log(error);
      }
    },   

    async addUserRoles() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/u_roles/crear",
          data: {
            idusuario: this.datos.idusuario,
            idroles: this.datos.idroles,
          },
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (result.data.Message.length) {
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