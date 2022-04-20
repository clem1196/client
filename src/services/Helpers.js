const token= localStorage.getItem("token");
if (token) {
    const isloggedIn=()=>{
        return true
    };
    const listRoles=[];
    const result= JSON.parse(window.atob(token.split(".")[1])).rol;
    result.forEach(element => {
        listRoles.push(element.nombre_rol);
    });

    //admin
    const isAdministrator=async()=>{
        if (listRoles.find((element)=>element=="admin")=="admin") {
            return true;
        }else{
            return false
        }
    };
    //empleado
    const isEmployee=async()=>{
        if ((listRoles.find((element)=>element=="empleado")=="empleado") || (listRoles.find((element)=>element=="admin")=="admin")) {
            return true;
        }else{
            return false
        }
    };
    //vendedor
    const isSeller=async()=>{
        if ((listRoles.find((element)=>element=="vendedor")=="vendedor") || (listRoles.find((element)=>element=="admin")=="admin")) {
            return true;
        }else{
            return false
        }
    };
    //almacenero
    const isGrocer=async()=>{
        if ((listRoles.find((element)=>element=="almacenero")=="almacenero") || (listRoles.find((element)=>element=="admin")=="admin")) {
            return true;
        }else{
            return false
        }
    };

    const getUrls=async ()=>{
        let path=[];
        if (await isAdministrator() || await isEmployee()) {
            path.push("/usuarios-roles")
        }else if(await isSeller()){
            path.push("/ventas")
        }else if(await isGrocer()){
            path.push("/compras")
        }else{
            path.push("/")
        }
        return path[0];
    };

    const obtenerNombreUsuario= async ()=>{
        try {
            const nomUsuario= JSON.parse(window.atob(token.split(".")[1])).username;
            return nomUsuario;
        } catch (error) {
            console.log(error);
        }
    };

    const Logout = async ()=>{
        localStorage.removeItem("token");
        localStorage.clear();
        location.replace("/");
    }

    const CaducarToken=async()=>{
        const Exp= JSON.parse(window.atob(token.split(".")[1])).exp;
        if(Date.now()>=Exp*1000){
            alert("Su sesión a caducado, inicie sesión nuevamente");
            Logout();
            location.replace("/Login")
        }
    };

    module.exports={
        token,
        isloggedIn,
        isAdministrator,
        isEmployee,
        isSeller,
        isGrocer,
        getUrls,
        Logout,
        obtenerNombreUsuario,
        CaducarToken

    }
}else{
   console.log('No ha iniciado sesión');
}