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
        <div class="modal-content">
          <div class="modal-header" style="background: #5dade2">
            <h5 class="modal-title" id="editarModalLabel" style="color: white">
              {{ title }}
            </h5>

            <a href="/usuarios-roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="EditarRol_usuario">
              <!--campo idusuario-->
              <div class="mb-3">
                <label for="idusuario" class="col-form-label">Usuario:</label>
                <input
                  v-model="datos.new_idusuario"
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
                  v-model="datos.new_idroles"
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
              <div class="modal-footer-sm" style="background: #5dade2">
                <!--button guardar-->
                <button
                  v-if="datos.new_idusuario !== datos.idusuario || datos.new_idroles !== datos.idroles"
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
    <usuariosRolesList></usuariosRolesList>
  </div>
</template>

<script>
import axios from "axios";
import usuariosRolesList from "./usuariosRolesList.vue";
export default {
name: "usuariosRoles-edit",
props:{
    title:{
        type: String,
        default: "Editando usuarios_roles"
    }
},
data(){

    return{
        //datos originales que se recibe del servidor
        datos:{
            idusuario:null,
            idroles:null,

             new_idusuario:null,
            new_idroles:null
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
    await this.getRol_usuario();
    await this.Usuarios();
    await this.Roles()
this.darclick();
},

methods:{
    darclick(){
        const edit = document.getElementById("editar");
        edit.click();
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
    async getRol_usuario(){
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                method:"GET",
                url: "http://localhost:4000/api/u_roles/"+this.$route.params.id,
                
                headers:{
                    Authorization: JSON.parse(token)
                }
            });
            this.datos.idusuario=result.data.usuario_rol[0].idusuario;
            this.datos.idroles=result.data.usuario_rol[0].idroles;

            this.datos.new_idusuario=result.data.usuario_rol[0].idusuario;
            this.datos.new_idroles=result.data.usuario_rol[0].idroles;
console.log(result)

        } catch (error) {                        
            console.log(error);
        }
    },

    async EditarRol_usuario(){
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                method:"PUT",
                url: "http://localhost:4000/api/u_roles/"+this.$route.params.id,
                data:{
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