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

<style scoped>
.navbar-expand-lg {
  flex-wrap: nowrap;
  justify-content: flex-start;
  min-width: 600px;
  background: #9025ae;
}

.navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.navbar-brand {
  padding-left: 8px;
  padding-right: 8px;
  color: white;
  border-radius: 0.25rem;
  text-align: center;
}
.navbar-brand:hover {
  padding-left: 8px;
  padding-right: 8px;
  background-color: #b370bd;
  border-radius: 0.25rem;
}
.navbar-collapse {
  margin-top: 8px;
  margin-bottom: 2px;
}
.navbar.navbar-expand-lg {
  background:  #6039f7;
}
.navbar-toggler {
  font-size: 1.8rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: white;
  background:#00acc1;
  margin-top: 4px;
  margin-bottom: 4px;
}
.navbar-toggler:hover {
  font-size: 1.8rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: white;
  background: #e1bee7;
}
.navbar-toggler:focus {
  box-shadow: 3px 3px 3px 0px;
  color: #e1bee7;
  background: white;
}
.navbar-nav {
  display: flex;

  padding-left: 0;
  list-style: none;

  margin-right: auto;
}

.nav-link {
  padding-left: 8px;
  padding-right: 8px;
  color: white;
  border-radius: 0.25rem;
  height: 40px;
  width: 80px;
  vertical-align: auto;
}
.nav-link:hover {
  padding-left: 8px;
  padding-right: 8px;
  background-color: #b370bd;
  border-radius: 0.25rem;
  
  height: 40px;
  width: 80px;
}
.nav-link:focus {
  box-shadow: 0px 0px 3px 0px;
  color: #e1bee7;
  background: white;
}
.d-flex {
  display: flex !important;
  align-items: center;
  justify-content: none;
  align-content: center;
  flex-direction: row;
  padding-left: 8px;
}
.welcome-user {
  padding-right: 8px;
  color: #e1bee7;
  font-size: 16px;
  font-style: oblique;
}
.btn-signIn {
  background-color:#00acc1 ;
  border-radius: 0.25rem;
  width: 82px;
  height: 34px;
  color: white;
  text-align: center;
  font-size: 15px;
  line-height: 30px;
  margin: 4px;
  text-decoration: none;
}
.btn-signIn:hover {
  background-color: #b370bd;
  border-radius: 0.25rem;
  width: 82px;
  height: 34px;
  color: white;
  text-align: center;
  font-size: 15px;
  line-height: 30px;
  margin: 4px;
}
</style>
