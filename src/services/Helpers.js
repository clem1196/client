const token = localStorage.getItem("token");
if (token) {

    const isloggedIn = () => {
        return true
    };
    const listRoles = [];
    const result = JSON.parse(window.atob(token.split(".")[1])).rol;
    result.forEach(element => {
        listRoles.push(element.nombre_rol);
    });

    /*para encontrar un valor en un array[] podemos usar find() o filter()
      - find() retorna un objeto con el primero que coincide la busqueda, caso contrario retorna undefined 
      - filter() retorna un nuevo array con todos los resultados que coincide la busqueda, caso contrario retona un array vacío

    aquí utilizaremos find().*/

    //admin
    const isAdministrator = async () => {
        if (listRoles.find(element => element === "admin")) {
            return true;
        } else {
            return false
        }
    };
    //empleado
    const isAuditor = async () => {
        if (listRoles.find(element => element === "auditor" || element === "admin")) {
            return true;
        } else {
            return false
        }
    };
    //vendedor
    const isSeller = async () => {
        if (listRoles.find(element => element === "vendedor" || element === "auditor" || element === "admin")) {
            return true;
        } else {
            return false
        }
    };
    //almacenero
    const isAccountant = async () => {
        if (listRoles.find(element => element === "contador" || element === "auditor" || element === "admin")) {
            return true;
        } else {
            return false
        }
    };
    //obtener el path según el rol
    const getUrls = async () => {
        let path = [];
        if (await isAdministrator() || await isAuditor()) {
            path.push("/usuarios-roles")
        } else if (await isSeller()) {
            path.push("/ventas")
        } else if (await isAccountant()) {
            path.push("/contabilidad")
        } else {
            path.push("/")
        }
        return path[0];
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
    }
    //caducar token
    const CaducarToken = async () => {
        const Exp = JSON.parse(window.atob(token.split(".")[1])).exp;
        if (Date.now() >= Exp * 1000) {
            alert("Su sesión a caducado, inicie sesión nuevamente");
            Logout();
            location.replace("/login")
        }
    };

    module.exports = {
        token,
        isloggedIn,
        isAdministrator,
        isAuditor,
        isSeller,
        isAccountant,
        getUrls,
        Logout,
        obtenerNombreUsuario,
        CaducarToken

    }
} else {    
    console.log('No ha iniciado sesión');
}