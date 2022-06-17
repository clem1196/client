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
        <div v-if="message.noEliminar==false" class="modal-content">
          <div class="modal-header" style="background: #5dade2;">
            <h5 class="modal-title" id="editarModalLabel" style="color: white;">
              {{ title }}
            </h5>

            <a href="/roles" class="btn btn-close"></a>
          </div>
          <div class="modal-body bg-light">
            <form @submit.prevent="editRol">
              <div class="mb-3">
                <label for="rol-name" class="col-form-label">Rol:</label>
                <input
                  v-model="new_datos.new_nombre_rol"
                  type="text"
                  class="form-control"
                  required
                  minlength="3"
                  maxlength="12"
                />
                <div
                  v-if="this.new_datos.new_nombre_rol.length < 3"
                  style="color: red;"
                >
                  Mínimo 3 caracteres
                </div>
              </div>

              <div class="modal-footer-sm" style="background: #5dade2;">
                <button
                  v-if="new_datos.new_nombre_rol !== datos.nombre_rol"
                  type="submit"
                  class="btn btn-light m-3"
                >
                  Guardar
                </button>
                <button v-else disabled type="submit" class="btn btn-light m-3">
                  Guardar
                </button>
                <a class="btn" href="/roles" style="color: white;">Cancelar</a>
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
              No debe modificar el rol "Admin". El sistema requiere de un
              Administrador.
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
  name: "roles-edit",
  props: {
    title: {
      type: String,
      default: "Editar roles",
    },
  },
  data() {
    return {
      //datos originales del servidor
      datos: {
        nombre_rol: "",
        
      },
      //datos para editar
      new_datos: {
        new_nombre_rol: "",
        
      },
      //recibe del servidor o del catch
      message: {
        success: "",
        err: "",
        noEliminar: false
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
      const result = await axios.get(
        "http://localhost:4000/api/data/" + this.$route.params.id,
        {
          headers: {
            Authorization: JSON.parse(token),
          },
        }
      );
      //console.log(result.data)

      //datos originales
      this.datos.nombre_rol = result.data.rol[0].nombre_rol;       

      //datos para comparar
      this.new_datos.new_nombre_rol = result.data.rol[0].nombre_rol;
      
      
        //obtener el nombre del rol a eliminar
        const rolName = result.data.rol[0].nombre_rol;

        console.log({
          rol: rolName,
        });
        //si el rol es admin
        if (rolName==="admin") {
          //restringimos su eliminación
          this.message.noEliminar = true;
          this.err = false;
        }
      
    },

    async editRol() {
      try {
        const token = localStorage.getItem("token");
        const result = await axios.put(
          "http://localhost:4000/api/roles/" + this.$route.params.id,
          {
            nombre_rol: this.new_datos.new_nombre_rol,            
          },
          {
              headers:{
                  Authorization: JSON.parse(token)
              }
          }

        );
        if(result.data.Message.length>0) {
            this.message.success=result.data.Message;
            this.message.err=false;
            location.replace("/roles");
        }       
      } catch (error) {
        this.message.err=error.response.data.Message;
        console.log(error.response.data.Message);
      }
    },
  },
};
</script>

<style>

</style>