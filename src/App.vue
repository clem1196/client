<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light" style="background: #1976D2 ;">
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
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          v-if="!token"
          class="collapse navbar-collapse"
          id="navbarTogglerDemo01"
        >
          <a class="navbar-brand" style="color: white" href="/"
            ><i class="bi-house-door-fill"></i> Home</a
          >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                style="color: white"
                href="/about"
                >About</a
              >
            </li>
          </ul>
          <div>
            <span class="nav-link" style="color: yellow">
              <i class="bi-person-fill">Aún no ha iniciado sesión!!</i>
            </span>
          </div>
          <div>
            <a class="btn btn-light" href="/login">
              <i class="bi-people-fill"></i> Iniciar Sesión
            </a>
          </div>
        </div>

        <div v-else class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" style="color: white" href="/">
            <i class="bi-house-door-fill"></i> Home</a
          >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                style="color: white"
                href="/about"
                >About</a
              >
            </li>
            <li v-if="vendedor || auditor || admin" class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                style="color: white"
                href="/ventas"
                >Ventas</a
              >
            </li>
            <li v-if="contador || auditor || admin" class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                style="color: white"
                href="/contabilidad"
                >Contabilidad</a
              >
            </li>
            <li v-if="empleado || auditor || admin" class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                style="color: white"
                href="/doc_personas"
                >Mesa de partes</a
              >
            </li>
            <li v-if="auditor || admin" class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                style="color: white"
                href="/usuarios-roles"
                >Usuarios</a
              >
            </li>
          </ul>
          <div>
            <span class="nav-link" style="color: yellow">
              <i class="bi-person-fill">Hola {{ user }}!!</i>
            </span>
          </div>
          <div>
            <a class="btn btn-light btn-sm" href="/login">
              <i class="bi-people-fill"></i> Cambiar
            </a>
          </div>
          <div class="m-2">
            <a class="btn btn-light" href="logout">
              <i class="bi-power">Salir</i>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
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
      this.vendedor = await Helper.isSellerLists() || await Helper.isSellerChanges();
      this.contador = await Helper.isAccountantLists() || await Helper.isAccountantLists();
      this.empleado = await Helper.isEmployeeLists() || await Helper.isEmployeeChanges();
    }
  },
};
</script>

<style>
</style>
