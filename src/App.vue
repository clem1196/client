<template>
  
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="bi-list"></span>
        </button>
        <div
          v-if="!token"
          class="collapse navbar-collapse"
          id="navbarTogglerDemo01"
        >
          <a class="navbar-brand" href="/"
            ><i class="bi-house-door-fill"></i> Home</a
          >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
          </ul>
          <div class="d-flex">
            <span class="welcome-user">
              <i class="bi-person-fill"></i> Aún no ha iniciado sesión!!
            </span>

            <a class="btn-signIn" href="/login" type="button">
              <i class="bi-people-fill"></i> LogIn
            </a>
          </div>
        </div>
        <div v-else class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/"
            ><i class="bi-house-door-fill"></i> Home</a
          >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/documentos">Modules</a>
            </li>
          </ul>
          <div class="d-flex">
            <span class="welcome-user">
              <i class="bi-person-fill"></i> Welcome {{ user }}!!
            </span>
            <a class="btn-signIn" href="/login" type="button">
              <i class="bi-people-fill"></i> Change
            </a>
            <a class="btn-signIn" href="/logout" type="button">
              <i class="bi-power"></i> LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
 
</template>

<script>
import Helper from "./services/Helpers";
export default {
  data() {
    return {
      token: "",
      user: "",
      admin: false,
      auditor: false,
      vendedor: false,
      contador: false,
      empleado: false,
    };
  },
  async mounted() {
    if (Helper.token) {
      //cerrar sesión
      await Helper.CaducarToken();
      //token
      this.token = Helper.token;
      //user
      this.user = await Helper.obtenerNombreUsuario();
      //roles
      this.admin = await Helper.isAdministrator();
      this.auditor = await Helper.isAuditor();
      this.vendedor =
        (await Helper.isSellerLists()) || (await Helper.isSellerChanges());
      this.contador =
        (await Helper.isAccountantLists()) ||
        (await Helper.isAccountantLists());
      this.empleado =
        (await Helper.isEmployeeLists()) || (await Helper.isEmployeeChanges());
    }
  },
};
</script>

<style>
@import url("/src/services/style.css");
</style>
