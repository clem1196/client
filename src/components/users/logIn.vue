<template>
  <div class="container m-5">
   <div class="card card-login">
    <div class="form-header">
      <i class="bi-person-circle"></i>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="div-input">
        <input
          type="text"
          class="form-control form-input"
          v-model="nombre_usuario"
          required
          placeholder="Usuario"
          autofocus
        />
      </div>
      <div class="div-input">
        <input
          type="password"
          class="form-control form-input"
          v-model="contraseña"
          required
          placeholder="Contraseña"
        />
      </div>
      <div class="div-buttons">
        <button class="btn btn-sm form-button" type="submit" value="submit">
          Login
        </button>
        <a class="btn btn-sm form-a" :href="path">Cancelar</a>
      </div>
    </form>
    <div class="login-alert">
      <p v-if="success" class="alert alert-success">{{ success }}</p>
      <p v-if="err" class="alert alert-danger">{{ err }}</p>
    </div>
   </div>
  </div>
</template>

<script>
import axios from "axios";
import Helpers from "../../services/users/Helpers";
export default {
  name: "log-in",
  data() {
    return {
      //datos del usaurio
      nombre_usuario: "",
      contraseña: "",
      //estados
      err: "",
      success: "",
      // ruta
      path: "",
    };
  },
  async mounted() {
    if (Helpers.token) {
      this.path = await Helpers.getUrls();
    }
  },
  methods: {
    async onSubmit() {
      try {
        let login = {
          nombre_usuario: this.nombre_usuario,
          contraseña: this.contraseña,
        };
        this.$emit("log-in-submitted", login);
        //this.nombre_usuario = "";
        //this.contraseña = "";
        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/ingreso",
          data: login,
        });
        console.log(result);
        if (result.data.Message.length > 0) {
          localStorage.setItem("token", JSON.stringify(result.data.token));
          this.success = result.data.Message;
          this.err = false;
          location.replace("/");
        }
      } catch (error) {
        this.err = error.response.data.Message;
        this.success = false;
        console.log(error.response);
      }
    },
  },
};
</script>

<style scoped>

</style>
