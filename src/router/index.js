import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Auth from "../services/users/Helpers";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  //acceso
  {
    path: "/login",
    name: "LogIn",
    component: () =>
      import(/* webpackChunkName: "logIn" */ "../components/users/logIn.vue"),
  },
  {
    path: "/logout",
    name: "LogOut",
    component: () =>
      import(/* webpackChunkName: "logOut" */ "../components/users/logOut.vue"),
  },
  //contabilidad
  {
    path: "/debts",
    name: "DebtsList",
    component: () =>
      import(
        /* webpackChunkName: "DebtsList" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/obligations",
    name: "ObligationsList",
    component: () =>
      import(
        /* webpackChunkName: "ObligationsList" */ "../views/ComponentsView.vue"
      ),
  },
  //ventas
  {
    path: "/products",
    name: "ProductsList",
    component: () =>
      import(
        /* webpackChunkName: "ProductsList" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/stock",
    name: "StockList",
    component: () =>
      import(
        /* webpackChunkName: "StockList" */ "../views/ComponentsView.vue"
      ),
  },
  //usuarios
  {
    path: "/usuarios",
    name: "usuariosList",
    component: () =>
      import(
        /* webpackChunkName: "usauriosList" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/usuarios/add",
    name: "usuariosAdd",
    component: () =>
      import(
        /* webpackChunkName: "usauriosAdd" */ "../components/users/usuarios/usuariosAdd.vue"
      ),
  },
  {
    path: "/usuarios/edit/:id",
    name: "usuariosEdit",
    component: () =>
      import(
        /* webpackChunkName: "usuariosEdit" */ "../components/users/usuarios/usuariosEdit.vue"
      ),
  },
  {
    path: "/usuarios/delete/:id",
    name: "usuariosDelete",
    component: () =>
      import(
        /* webpackChunkName: "usuariosDelete" */ "../components/users/usuarios/usuariosDelete.vue"
      ),
  },

  //Roles

  {
    path: "/roles",
    name: "rolesList",
    component: () =>
      import(
        /* webpackChunkName: "rolesList" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/roles/add",
    name: "rolesAdd",
    component: () =>
      import(
        /* webpackChunkName: "rolesAdd" */ "../components/users/roles/RolesForm.vue"
      ),
  },
  {
    path: "/roles/edit/:id",
    name: "rolesEdit",
    component: () =>
      import(
        /* webpackChunkName: "rolesEdit" */ "../components/users/roles/RolesForm.vue"
      ),
  },
  {
    path: "/roles/Delete/:id",
    name: "rolesDelete",
    component: () =>
      import(
        /* webpackChunkName: "rolesDelete" */ "../components/users/roles/rolesDelete.vue"
      ),
  },

  //usuarios_roles
  {
    path: "/usuarios-roles",
    name: "usuariosRolesList",
    component: () =>
      import(
        /* webpackChunkName: "usuariosRolesList" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/usuarios-roles/add",
    name: "usuariosRolesAdd",
    component: () =>
      import(
        /* webpackChunkName: "usuariosRolesAdd" */ "../components/users/usuarios_roles/usuariosRolesAdd.vue"
      ),
  },
  {
    path: "/usuarios-roles-nuevo/add",
    name: "usuariosRolesAddNuevo",
    component: () =>
      import(
        /* webpackChunkName: "usuariosRolesAddNuevo" */ "../components/users/usuarios_roles/usuariosRolesAddNuevo.vue"
      ),
  },

  {
    path: "/usuarios-roles/edit/:id",
    name: "usuariosRolesEdit",
    component: () =>
      import(
        /* webpackChunkName: "usuariosRolesEdit" */ "../components/users/usuarios_roles/usuariosRolesEdit.vue"
      ),
  },
  {
    path: "/usuarios-roles/delete/:id",
    name: "usuariosRolesDelete",
    component: () =>
      import(
        /* webpackChunkName: "usuariosRolesDelete" */ "../components/users/usuarios_roles/usuariosRolesDelete.vue"
      ),
  },
  //archivo/files
  {
    path: "/files",
    name: "Files",
    component: () =>
      import(
        /* webpackChunkName: "Files" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/files/download/:name",
    name: "Download",
    component: () =>
      import(
        /* webpackChunkName: "Download" */ "../components/documentos/Download.vue"
      ),
  },
  {
    path: "/files/delete/:name",
    name: "filesDelete",
    component: () =>
      import(
        /* webpackChunkName: "filesDelete" */ "../components/documentos/Delete.vue"
      ),
  },

  
  //documents
  {
    path: "/documentos",
    name: "documentosList",
    component: () =>
      import(
        /* webpackChunkName: "documentosList" */ "../views/ComponentsView.vue"
      ),
  },
  {
    path: "/documentos/add",
    name: "documentosAdd",
    component: () =>
      import(
        /* webpackChunkName: "documentosAdd" */ "../components/documentos/DocumentForm.vue"
      ),
  },
  {
    path: "/documentos/edit/:id",
    name: "documentosEdit",
    component: () =>
      import(
        /* webpackChunkName: "documentosEdit" */ "../components/documentos/DocumentForm.vue"
      ),
  },
  {
    path: "/documentos/delete/:id",
    name: "documentosDelete",
    component: () =>
      import(
        /* webpackChunkName: "documentosDelete" */ "../components/documentos/Delete.vue"
      ),
  },
  //dashboard
  {
    path: "/dashboard/",
    name: "Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Dashboard" */ "../components/dashboard/DashBoardAdmin.vue"
      ),
  },
  //errors
  {
    path: "/error",
    name: "errorAcces",
    component: () =>
      import(
        /* webpackChunkName: "errorAcces" */ "../components/error/error_acceso/errorAcces.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  //Si no está logueado
  if (
    to.name !== "home" &&
    to.name !== "about" &&
    to.name !== "LogIn" &&
    !(await Auth.isloggedIn())
  ) {
    next("/login");
  }
  //Si no es admin
  else if (
    (to.name === "usuariosAdd" ||
      to.name === "usuariosEdit" ||
      to.name === "usuariosDelete" ||
      to.name === "rolesAdd" ||
      to.name === "rolesEdit" ||
      to.name === "rolesDelete" ||
      to.name === "usuariosRolesAddNuevo" ||
      to.name === "usuariosRolesAdd" ||
      to.name === "usuariosRolesEdit" ||
      to.name === "usuariosRolesDelete") &&
    !(await Auth.isAdministrator())
  ) {
    next("/error");
  }

   //Si no es contador
   //si no es vendedor

   //si no es Empleado
   else if (
    (to.name === "docsAdd" ||
      to.name === "docsEdit" ||
      to.name === "docsDelete") &&
    !(await Auth.isEmployeeChanges())
  ) {
    next("/error");
  }



  //Si no es auditor o admin
  else if (
    (to.name === "usuariosList" ||
      to.name === "rolesList" ||
      to.name === "usuariosRolesList") &&
    !(await Auth.isAuditor())
  ) {
    next("/error");
  }
  //Si no es contador, auditor o admin
  else if (
    to.name === "pagosPendientesList" &&
    !(await Auth.isAccountantLists())
  ) {
    next("/error");
  }
  //Si no es vendedor, auditor o admin
  else if (to.name === "ventasList" && !(await Auth.isSellerLists())) {
    next("/error");
  }
  //Si no es empleado, auditor o admin
  else if (to.name === "Files" && !(await Auth.isEmployeeLists())) {
    next("/error");
  } else {
    next();
  }
});

export default router;
