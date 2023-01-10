import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Auth from "../services/Helpers";

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
  //compras
  {
    path: "/contabilidad",
    name: "pagosPendientesList",
    component: () =>
      import(
        /* webpackChunkName: "pagosPendientesList" */ "../components/contabilidad/pagosPendientesList.vue"
      ),
  },
  //ventas
  {
    path: "/ventas",
    name: "ventasList",
    component: () =>
      import(
        /* webpackChunkName: "ventasList" */ "../components/ventas/ventasList.vue"
      ),
  },
  //usuarios
  {
    path: "/usuarios",
    name: "usuariosList",
    component: () =>
      import(
        /* webpackChunkName: "usauriosList" */ "../components/users/usuarios/usuariosList.vue"
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
        /* webpackChunkName: "rolesList" */ "../components/users/roles/rolesList.vue"
      ),
  },
  {
    path: "/roles/add",
    name: "rolesAdd",
    component: () =>
      import(
        /* webpackChunkName: "rolesAdd" */ "../components/users/roles/rolesAdd.vue"
      ),
  },
  {
    path: "/roles/edit/:id",
    name: "rolesEdit",
    component: () =>
      import(
        /* webpackChunkName: "rolesEdit" */ "../components/users/roles/rolesEdit.vue"
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
        /* webpackChunkName: "usuariosRolesList" */ "../components/users/usuarios_roles/usuariosRolesList.vue"
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
  //archivo/prueba
  {
    path: "/upload",
    name: "Upload",
    component: () =>
      import(
        /* webpackChunkName: "Files" */ "../components/documentos/pdf/Upload.vue"
      ),
  },

  //archivo/files
  {
    path: "/files",
    name: "Files",
    component: () =>
      import(
        /* webpackChunkName: "Files" */ "../components/documentos/pdf/Files.vue"
      ),
  },
  {
    path: "/files/download/:name",
    name: "Download",
    component: () =>
      import(
        /* webpackChunkName: "Download" */ "../components/documentos/pdf/Download.vue"
      ),
  },
  {
    path: "/files/delete/:name",
    name: "Delete",
    component: () =>
      import(
        /* webpackChunkName: "Delete" */ "../components/documentos/pdf/Delete.vue"
      ),
  },
  //documentos
  {
    path: "/documentos",
    name: "docsList",
    component: () =>
      import(
        /* webpackChunkName: "docsList" */ "../components/documentos/docs/docsList.vue"
      ),
  },
  {
    path: "/documentos/add",
    name: "docsAdd",
    component: () =>
      import(
        /* webpackChunkName: "docAdd" */ "../components/documentos/docs/docsAdd.vue"
      ),
  },
  {
    path: "/documentos/edit/:id",
    name: "docsEdit",
    component: () =>
      import(
        /* webpackChunkName: "docsEdit" */ "../components/documentos/docs/docsEdit.vue"
      ),
  },
  {
    path: "/documentos/delete/:id",
    name: "docsDelete",
    component: () =>
      import(
        /* webpackChunkName: "docsDelete" */ "../components/documentos/docs/docsDelete.vue"
      ),
  },

  //personas
  {
    path: "/personas",
    name: "personsList",
    component: () =>
      import(
        /* webpackChunkName: "personsList" */ "../components/documentos/persons/personsList.vue"
      ),
  },
  {
    path: "/personas/add",
    name: "personsAdd",
    component: () =>
      import(
        /* webpackChunkName: "personsAdd" */ "../components/documentos/persons/personsAdd.vue"
      ),
  },
  {
    path: "/personas/edit/:id",
    name: "personsEdit",
    component: () =>
      import(
        /* webpackChunkName: "personsEdit" */ "../components/documentos/persons/personsEdit.vue"
      ),
  },
  {
    path: "/personas/delete/:id",
    name: "personsDelete",
    component: () =>
      import(
        /* webpackChunkName: "personsDelete" */ "../components/documentos/persons/personsDelete.vue"
      ),
  },

//docs_persons
{
  path: "/doc_personas",
  name: "docs_personsList",
  component: () =>
    import(
      /* webpackChunkName: "docs_personsList" */ "../components/documentos/docs_persons/docs_personsList.vue"
    ),
},
{
  path: "/doc_personas/add",
  name: "docs_personsAdd",
  component: () =>
    import(
      /* webpackChunkName: "docs_personsAdd" */ "../components/documentos/docs_persons/docs_personsAdd.vue"
    ),
},
{
  path: "/doc_personas/edit/:id",
  name: "docs_personsEdit",
  component: () =>
    import(
      /* webpackChunkName: "docs_personsEdit" */ "../components/documentos/docs_persons/docs_personsEdit.vue"
    ),
},
{
  path: "/doc_personas/delete/:id",
  name: "docs_personsDelete",
  component: () =>
    import(
      /* webpackChunkName: "docs_personsDelete" */"../components/documentos/docs_persons/docs_personsDelete.vue"
    ),
},


  //erros

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
