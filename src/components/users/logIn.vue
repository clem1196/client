<template>
  <div class="col-4 align-self-center mt-5 m-auto">
    <div class="form-header mt-3">
      <h2 class="text-center mt-2">
        <i class="bi-person-circle" style="font-size: 6rem; color: white"></i>
      </h2>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="div-input">
        <input
          type="text"
          class="form-control form-input"
          v-model="nombre_usuario"
          required
          placeholder="Usuario"
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
      <div class="div-button">
        <button class="form-button btn btn-sm" type="submit" value="submit">
          <h3 class="button-h3">Login</h3>
        </button>
        <a class="form-a btn btn-sm" :href="path"><h5>Cancelar</h5></a>
      </div>
    </form>
    <div class="mt-5">
      <p v-if="success" class="alert alert-success">{{ success }}</p>
      <p v-if="err" class="alert alert-danger">{{ err }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Helpers from "../../services/Helpers";
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
        this.nombre_usuario = "";
        this.contraseña = "";

        const result = await axios({
          method: "POST",
          url: "http://localhost:4000/api/ingreso",
          data: login,
        });
        if (result.data.Message.length > 0) {
          localStorage.setItem("token", JSON.stringify(result.data.token));
          this.success = result.data.Message;
          this.err = false;
          location.replace("/");
        }
      } catch (error) {
        this.err = "El usaurio o la contraseña no es correcta";
        this.success = false;
      }
    },
  },
};
</script>

<style scoped>
.form-header {
  background: #3498db;
  height: 8rem;
}

.form-input {
  text-align: center;
  color: cornflowerblue;
  height: 3rem;
}
.div-input {
  column-fill: 12pt;
  margin-block: 10pt;
}
.div-button {
  display: grid;
  gap: 4pt;
  text-align: center;
  height: 7rem;
}
.form-button {
  background: #3498db;
  height: 4rem;
}
.form-a {
  background: #aed6f1;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
}
.button-h3 {
  color: white;
}
</style>