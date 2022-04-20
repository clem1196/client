import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from "../services/Helpers"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, 
  //acceso
  {
    path: '/login',
    name: 'LogIn',    
    component: () => import(/* webpackChunkName: "logIn" */ '../components/users/logIn.vue')
  },
  {
    path: '/logout',
    name: 'LogOut',    
    component: () => import(/* webpackChunkName: "logOut" */ '../components/users/logOut.vue')
  },
  //compras
  {
    path: '/compras',
    name: 'comprasList',    
    component: () => import(/* webpackChunkName: "comprasList" */ '../components/almacen/comprasList.vue')
  },
  //ventas
  {
    path: '/ventas',
    name: 'ventasList',    
    component: () => import(/* webpackChunkName: "ventasList" */ '../components/ventas/ventasList.vue')
  },
  //usuarios
  {
    path: '/usuarios',
    name: 'UsuariosList',    
    component: () => import(/* webpackChunkName: "usauriosList" */ '../components/users/usuarios/usuariosList.vue')
  },
  {
    path: '/usuarios/add',
    name: 'usuariosAdd',    
    component: () => import(/* webpackChunkName: "usauriosAdd" */ '../components/users/usuarios/usuariosAdd.vue')
  },
  {
    path: '/usuarios/edit/:id',
    name: 'usuariosEdit',    
    component: () => import(/* webpackChunkName: "usuariosEdit" */ '../components/users/usuarios/usuariosEdit.vue')
  },
  {
    path: '/usuarios/delete/:id',
    name: 'usuariosDelete',    
    component: () => import(/* webpackChunkName: "usuariosDelete" */ '../components/users/usuarios/usuariosDelete.vue')
  },
  
  //Roles

  {
    path: '/roles',
    name: 'rolesList',    
    component: () => import(/* webpackChunkName: "rolesList" */ '../components/users/roles/rolesList.vue')
  },
  {
    path: '/roles/add',
    name: 'rolesAdd',    
    component: () => import(/* webpackChunkName: "rolesAdd" */ '../components/users/roles/rolesAdd.vue')
  },
  {
    path: '/roles/edit/:id',
    name: 'rolesEdit',    
    component: () => import(/* webpackChunkName: "rolesEdit" */ '../components/users/roles/rolesEdit.vue')
  },
  {
    path: '/roles/Delete/:id',
    name: 'rolesDelete',    
    component: () => import(/* webpackChunkName: "rolesDelete" */ '../components/users/roles/rolesDelete.vue')
  },

  //usuarios_roles
  {
    path: '/usuarios-roles',
    name: 'usuariosRolesList',    
    component: () => import(/* webpackChunkName: "usuariosRolesList" */ '../components/users/usuarios_roles/usuariosRolesList.vue')
  },
  {
    path: '/usuarios-roles/add',
    name: 'usuariosRolesAdd',    
    component: () => import(/* webpackChunkName: "usuariosRolesAdd" */ '../components/users/usuarios_roles/usuariosRolesAdd.vue')
  },
  {
    path: '/usuarios-roles-nuevo/add',
    name: 'usuariosRolesAddNuevo',    
    component: () => import(/* webpackChunkName: "usuariosRolesAddNuevo" */ '../components/users/usuarios_roles/usuariosRolesAddNuevo.vue')
  },
    
  {
    path: '/usuarios-roles/edit/:id',
    name: 'usuariosRolesEdit',    
    component: () => import(/* webpackChunkName: "usuariosRolesEdit" */ '../components/users/usuarios_roles/usuariosRolesEdit.vue')
  },
  {
    path: '/usuarios-roles/delete/:id',
    name: 'usuariosRolesDelete',    
    component: () => import(/* webpackChunkName: "usuariosRolesDelete" */ '../components/users/usuarios_roles/usuariosRolesDelete.vue')
  },
  {
    path: '/error',
    name: 'errorAcces',    
    component: () => import(/* webpackChunkName: "errorAcces" */ '../components/error/error_acceso/errorAcces.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

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
  //Si no es empleado o admin
  else if (
    (to.name === "usuariosList" ||
      to.name === "rolesList" ||
      to.name === "usuariosRolesList") &&
    //!(await Auth.isAdministrator()) &&
    !(await Auth.isEmployee())
  ) {
    next("/error");
  }
  //Si no es almacenero o admin
  else if (
    to.name === "comprasList" &&
    //!(await Auth.isAdministrator()) &&
    !(await Auth.isGrocer())
  ) {
    next("/error");
  }
  //Si no es vendedor o admin
  else if (
    to.name === "ventasList" &&
    //!(await Auth.isAdministrator()) &&
    !(await Auth.isSeller())
  ) {
    next("/error");
  } else {
    next();
  }
});

export default router
