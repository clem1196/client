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
          <div class="modal-header" style="background: #5dade2">
            <h5 class="modal-title" id="addModalLabel" style="color: white">
              {{ title }}
            </h5>

            <a href="/usuarios-roles" class="btn btn-close"></a>
          </div>
          <!--modal header-->
          <div class="modal-body bg-light">
            <form @submit.prevent="addUser">
              <!--Campo nombre_usaurio-->
              <div class="mb-3">
                <label for="User-name" class="col-form-label">Usuario:</label>
                <input
                  v-model="datos.nombre_usuario"
                  type="text"
                  class="form-control"
                  minlength="3"
                  maxlength="24"
                  required
                  focus
                />
                <small
                  v-if="datos.nombre_usuario.length < 3"
                  class="text-danger"
                  >Mínimo 3 caracteres</small
                >
              </div>
              <!--Campo contraseña-->
              <div class="mb-3">
                <label for="contraseña-text" class="col-form-label"
                  >Contraseña:</label
                >
                <input
                  v-model="datos.contraseña"
                  type="password"
                  class="form-control"
                  required
                  minlength="6"
                  maxlength="16"
                />
                <small v-if="datos.contraseña.length < 6" class="text-danger"
                  >Mínimo 6 caracteres</small
                >
                <p>{{ this.datos.contraseña }}</p>
              </div>
              <!--Campo repite_contraseña-->
              <div class="mb-3">
                <label for="contraseña-text" class="col-form-label"
                  >Confirme:</label
                >
                <input
                  v-model="datos.repite_contraseña"
                  type="password"
                  class="form-control"
                  required
                />
                <div
                  v-if="datos.contraseña !== datos.repite_contraseña"
                  class="text-danger"
                >
                  Las contraseñas no coinciden!.
                </div>
                <p>{{ this.datos.repite_contraseña }}</p>
              </div>

              <!--botones guardar y cancelar-->
              <div class="modal-footer-sm" style="background: #5dade2">
                <button
                  v-if="
                    datos.nombre_usuario.length > 2 &&
                    datos.contraseña.length > 5 &&
                    datos.repite_contraseña.length > 5
                  "
                  type="submit"
                  class="btn btn-light m-3"
                >
                  Guardar
                </button>
                <button v-else disabled type="submit" class="btn btn-light m-3">
                  Guardar
                </button>
                <a class="btn" href="/usuarios-roles" style="color: white"
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
    <usuariosList></usuariosList>
  </div>
</template>

<script>
import axios from "axios";
import usuariosList from "./usuariosList.vue";
export default {
name: "usuarios-list",
props:{
    title:{
        type: String,
        default: "Agregar usuarios"
    }
},
data(){

    return{
        //datos originales que se recibe del servidor
        datos:{
            nombre_usuario: "",
            contraseña: "",
            repite_contraseña:""
        },
        
        //recibe del servidor o del catch
        message:{
            success:"",
            err:""
        }
    }
},

components:{usuariosList},
async mounted(){
this.darclick();
},

methods:{
    darclick(){
        const add = document.getElementById("add");
        add.click();
    },

    async addUser(){
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                method:"POST",
                url: "http://localhost:4000/api/registro",
                data: this.datos,
                headers:{
                    Authorization: JSON.parse(token)
                }
            });
            if(result.data.Message.length){
                this.message.success=result.data.Message;
                this.message.err=false;
                location.replace("/usuarios-roles-nuevo/add");
            }
        } catch (error) { 
            this.message.err=error.response.data.Message;           
            console.log(error.response);
        }
    }
}
}
</script>

<style>

</style>