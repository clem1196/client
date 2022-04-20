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
              {{ title }}
            </h5>

            <a href="/roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="addRol">
              <div class="mb-3">
                <label for="Rol-name" class="col-form-label">Rol:</label>
                <input
                  v-model="datos.nombre_rol"
                  type="text"
                  class="form-control"
                  minlength="3"
                  maxlength="24"
                  required
                  focus
                />
                <small v-if="datos.nombre_rol.length < 3" class="text-danger"
                  >Mínimo 3 caracteres</small
                >
              </div>
              <div class="modal-footer-sm" style="background: #5dade2">
                <button type="submit" class="btn btn-light m-3">Guardar</button>
                <a class="btn" href="/roles" style="color: white">Cancelar</a>
              </div>
            </form>
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
name: "roles-list",
props:{
    title:{
        type: String,
        default: "Agregar roles"
    }
},
data(){

    return{
        //datos originales que se recibe del servidor
        datos:{
            nombre_rol: ""            
        },        
        //recibe del servidor o del catch
        message:{
            success:"",
            err:""
        }
    }
},

components:{rolesList},
async mounted(){
this.darclick();
},

methods:{
    darclick(){
        const add = document.getElementById("add");
        add.click();
    },

    async addRol(){
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                method:"POST",
                url: "http://localhost:4000/api/roles/crear",
                data: this.datos,
                headers:{
                    Authorization: JSON.parse(token)
                }
            });
            if(result.data.Message.length){
                this.message.success=result.data.Message;
                location.replace("/roles");
            }
        } catch (error) { 
            this.message.err="El rol ya existe o los campos no se llenaron correctamente";           
            console.log(error);
        }
    }
}
}
</script>

<style>

</style>