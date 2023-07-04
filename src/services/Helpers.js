const token = localStorage.getItem("token");
if (token) {
  const isloggedIn = () => {
    return true;
  };
  const listRoles = [];
  const result = JSON.parse(window.atob(token.split(".")[1])).rol;
  result.forEach((element) => {
    listRoles.push(element.nombre_rol);
  });

  /*para encontrar un valor en un array[] podemos usar find() o filter()
      - find() retorna un objeto con el primero que coincide la busqueda, caso contrario retorna undefined 
      - filter() retorna un nuevo array con todos los resultados que coincide la busqueda, caso contrario retona un array vacío

    aquí utilizaremos find().*/

  //admin
  //acceso total
  const isAdministrator = async () => {
    if (listRoles.find((element) => element === "admin")) {
      return true;
    } else {
      return false;
    }
  };
  //auditor
  //Acceso a todas las listas
  const isAuditor = async () => {
    if (
      listRoles.find((element) => element === "auditor" || element === "admin")
    ) {
      return true;
    } else {
      return false;
    }
  };

  //acceso solo listaas
  //vendedor  
  const isSellerLists = async () => {
    if (
      listRoles.find(
        (element) =>
          element === "vendedor" || element === "auditor" || element === "admin"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  //contador
  const isAccountantLists = async () => {
    if (
      listRoles.find(
        (element) =>
          element === "contador" || element === "auditor" || element === "admin"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  //empleado
  const isEmployeeLists = async () => {
    if (
      listRoles.find(
        (element) =>
          element === "empleado" || element === "auditor" || element === "admin"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

   //acceso ssolo para modificaciones
  //vendedor  
  const isSellerChanges = async () => {
    if (
      listRoles.find(
        (element) =>
          element === "vendedor" || element === "admin"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  //contador
  const isAccountantChanges = async () => {
    if (
      listRoles.find(
        (element) =>
          element === "contador" || element === "admin"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  //empleado
  const isEmployeeChanges = async () => {
    if (
      listRoles.find(
        (element) =>
          element === "empleado" || element === "admin"
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  //obtener el path según el rol
  const getUrls = async () => {
    let path = [];
    if ((await isAdministrator()) || (await isAuditor())) {
      path.push("/usuarios-roles");
    } else if (await isSellerLists()||await isSellerChanges()) {
      path.push("/products");
      path.push("/stock");
    } else if (await isAccountantLists()||await isAccountantChanges()) {
      path.push("/obligations");
      path.push("/debts");     
    } else if (await isEmployeeLists()||await isEmployeeChanges()) {
      path.push("/documentos");
    } else {
      path.push("/");
    }
    return path;
  };
  //obtener el nombre del usuario desde el token
  const obtenerNombreUsuario = async () => {
    try {
      const nomUsuario = JSON.parse(window.atob(token.split(".")[1])).username;
      return nomUsuario;
    } catch (error) {
      console.log(error);
    }
  };
  //cerrar sesión
  const Logout = async () => {
    localStorage.removeItem("token");
    localStorage.clear();
    location.replace("/");
  };
  //caducar token
  const CaducarToken = async () => {
    const Exp = JSON.parse(window.atob(token.split(".")[1])).exp;
    if (Date.now() >= Exp * 1000) {
      alert("Su sesión a caducado, inicie sesión nuevamente");
      Logout();
      location.replace("/login");
    }
  };

  module.exports = {
    token,
    isloggedIn,
    isAdministrator,
    isAuditor,
    isSellerLists,
    isSellerChanges,
    isAccountantLists,
    isAccountantChanges,
    isEmployeeLists,
    isEmployeeChanges,    
    getUrls,
    Logout,
    obtenerNombreUsuario,
    CaducarToken,
  };
} else {
  console.log("No ha iniciado sesión");
}
