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
          <div class="modal-header" style="background: #5dade2">
            <h5 class="modal-title" id="addModalLabel" style="color: white">
             {{title}}
            </h5>

            <a href="/usuarios-roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="addUserRoles">

            <!--campo idusuario-->
              <div class="mb-3">
                <label for="idusuario" class="col-form-label">Usuario:</label>
                <input
                  v-model="datos.idusuario"
                  id="idusuario"
                  class="form-control"
                  required
                  focus
                  disabled
                />
                <select id="selectIdUsuario" @change="llenarUsuarios">
                  <option value="">Seleccione</option>
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
                />
                <select id="selectIdRoles" @change="llenarRoles">
                  <option value="">Seleccione</option>
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
              <div class="modal-footer-sm" style="background: #5dade2">
                <button
                  v-if="datos.idusuario !== null && datos.idroles !== null"
                  type="submit"
                  class="btn btn-light m-3"
                >
                  Guardar
                </button>
                <button v-else disabled type="submit" class="btn btn-light m-3">
                  Guardar
                </button>

                <!--cancelar-->
                <a class="btn" href="/usuarios-roles" style="color: white"
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
props:{
    title:{
        type: String,
        default: "Asignando Rol"
    }
},
data(){

    return{
        //datos originales que se recibe del servidor
        datos:{
            idusuario:null,
            idroles:null
        },
        
        //recibe del servidor o del catch
        message:{
            success:"",
            err:""
        },

        arrayUsuarios:[],
        arrayRoles:[]

    }
},

components:{usuariosRolesList},
async mounted(){
    await this.Usuarios();
    await this.Roles()
this.darclick();
},

methods:{
    darclick(){
        const add = document.getElementById("add");
        add.click();
    },

    async llenarUsuarios(){
        let elementSelectId=document.getElementById("selectIdUsuario");
        let inputId=document.getElementById("idusuario");

        inputId.value=elementSelectId.value;
        this.datos.idusuario=parseInt(inputId.value);
        inputId.disabled=false;
    },
    async llenarRoles(){
        let elementSelectId=document.getElementById("selectIdRoles");
        let inputId=document.getElementById("idroles");

        inputId.value=elementSelectId.value;
        this.datos.idroles=parseInt(inputId.value);
        inputId.disabled=false;
    },

    async Usuarios(){
        try {
            const token=localStorage.getItem("token");
            const usuarioResult= await axios.get(
                "http://localhost:4000/api/usuarios",
                {
                    headers:{
                        Authorization:JSON.parse(token)
                    }
                }
            );
            for (let index = 0; index < usuarioResult.data.usuarios.length; index++) {
                const objetos_usuarios = {
                    value:usuarioResult.data.usuarios[index].idusuario,
                    text: usuarioResult.data.usuarios[index].nombre_usuario,
                };
                this.arrayUsuarios.push(objetos_usuarios);
                
            }
        } catch (error) {
            console.log(error);
        }
    },

    async Roles(){
       try {
            const token=localStorage.getItem("token");
            const rolesResult= await axios.get(
                "http://localhost:4000/api/roles",
                {
                    headers:{
                        Authorization:JSON.parse(token)
                    }
                }
            );
            for (let index = 0; index < rolesResult.data.roles.length; index++) {
                const objetos_roles = {
                    value:rolesResult.data.roles[index].idroles,
                    text: rolesResult.data.roles[index].nombre_rol,
                };
                this.arrayRoles.push(objetos_roles);
                
            }
        } catch (error) {
            console.log(error);
        } 
    },



    async addUserRoles(){
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                method:"POST",
                url: "http://localhost:4000/api/u_roles/crear",
                data: {
                    idusuario:this.datos.idusuario,
                    idroles:this.datos.idroles
                },
                headers:{
                    Authorization: JSON.parse(token)
                }
            });
            if(result.data.Message.length){
                this.message.success=result.data.Message;
                location.replace("/usuarios-roles");
            }
        } catch (error) { 
            this.message.err="El usuario ya existe o los campos no se llenaron correctamente";           
            console.log(error);
        }
    }
}
}
</script>

<style>

</style>