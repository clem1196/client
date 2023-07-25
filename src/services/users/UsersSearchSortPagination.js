const {Date}=require("core-js");
const token = localStorage.getItem("token");
if (token) {  
  //SEARCH DOCUMENTS
  const getSearchDocs = (documents, text) => {
    const filterItems = (query) => {
      return documents.filter(
        (doc) =>
          (doc.documentid !== null &&
            doc.documentid.toString().indexOf(query) > -1) ||
          (doc.doc_number !== null &&
            doc.doc_number.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.doc_type !== null &&
            doc.doc_type.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.firstSurname !== null &&
            doc.firstSurname.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.lastSurname !== null &&
            doc.lastSurname.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.name !== null &&
            doc.name.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.fullname !== null &&
            doc.fullname.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.file !== null &&
            doc.file.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.created !== null &&
            doc.created.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.updated !== null &&
            doc.updated.toLowerCase().indexOf(query.toLowerCase()) > -1) ||
          (doc.state !== null && doc.state.toString().indexOf(query) > -1)
      );
    };
    return filterItems(text);
  };

  //SORT ROLES
  let sortResult = false;
  const sortId = (arraySearch) => {
    for (let index = 0; index < arraySearch.length; index++) {
      const element = arraySearch[index];
      //console.log(typeof element);
      const asc = (a, b) => {
        if (
          typeof element.idroles === "number" &&
          a.idroles != null &&
          b.idroles != null
        ) {
          return a.idroles - b.idroles;
        }
        if (
          typeof element.idroles === "object" &&
          a.idroles != null &&
          b.idroles != null
        ) {
          return new Date(a.idroles).valueOf() - new Date(b.idroles).valueOf();
        }
        if (
          typeof element.idroles === "string" &&
          a.idroles != null &&
          b.idroles != null
        ) {
          return a.idroles.localeCompare(b.idroles);
        }
      };
      const desc = (a, b) => {
        if (
          typeof element.idroles === "number" &&
          b.idroles != null &&
          a.idroles != null
        ) {
          return b.idroles - a.idroles;
        }
        if (
          typeof element.idroles === "object" &&
          b.idroles != null &&
          a.idroles != null
        ) {
          return new Date(b.idroles).valueOf() - new Date(a.idroles).valueOf();
        }
        if (
          typeof element.idroles === "string" &&
          b.idroles != null &&
          a.idroles != null
        ) {
          return b.idroles.localeCompare(a.idroles);
        }
      };
      if (sortResult) {
        sortResult = false;
        return arraySearch.sort(asc);
      } else {
        sortResult = true;
        return arraySearch.sort(desc);
      }
    }
  };
  const sortNombre = (arraySearch) => {
    for (let index = 0; index < arraySearch.length; index++) {
      const element = arraySearch[index];
      //console.log(typeof element);
      const asc = (a, b) => {
        if (
          typeof element.nombre_rol === "number" &&
          a.nombre_rol != null &&
          b.nombre_rol != null
        ) {
          return a.nombre_rol - b.nombre_rol;
        }
        if (
          typeof element.nombre_rol === "object" &&
          a.nombre_rol != null &&
          b.nombre_rol != null
        ) {
          return (
            new Date(a.nombre_rol).valueOf() - new Date(b.nombre_rol).valueOf()
          );
        }
        if (
          typeof element.nombre_rol === "string" &&
          a.nombre_rol != null &&
          b.nombre_rol != null
        ) {
          return a.nombre_rol.localeCompare(b.nombre_rol);
        }
      };
      const desc = (a, b) => {
        if (
          typeof element.nombre_rol === "number" &&
          b.nombre_rol != null &&
          a.nombre_rol != null
        ) {
          return b.nombre_rol - a.nombre_rol;
        }
        if (
          typeof element.nombre_rol === "object" &&
          b.nombre_rol != null &&
          a.nombre_rol != null
        ) {
          return (
            new Date(b.nombre_rol).valueOf() - new Date(a.nombre_rol).valueOf()
          );
        }
        if (
          typeof element.nombre_rol === "string" &&
          b.nombre_rol != null &&
          a.nombre_rol != null
        ) {
          return b.nombre_rol.localeCompare(a.nombre_rol);
        }
      };
      if (sortResult) {
        sortResult = false;
        return arraySearch.sort(asc);
      } else {
        sortResult = true;
        return arraySearch.sort(desc);
      }
    }
  };
  const sortCreado = (arraySearch) => {
    for (let index = 0; index < arraySearch.length; index++) {
      const element = arraySearch[index];
      //console.log(typeof element);
      const asc = (a, b) => {
        if (
          typeof element.registrado === "number" &&
          a.registrado != null &&
          b.registrado != null
        ) {
          return a.registrado - b.registrado;
        }
        if (
          typeof element.registrado === "object" &&
          a.registrado != null &&
          b.registrado != null
        ) {
          return (
            new Date(a.registrado).valueOf() - new Date(b.registrado).valueOf()
          );
        }
        if (
          typeof element.registrado === "string" &&
          a.registrado != null &&
          b.registrado != null
        ) {
          return a.registrado.localeCompare(b.registrado);
        }
      };
      const desc = (a, b) => {
        if (
          typeof element.registrado === "number" &&
          b.registrado != null &&
          a.registrado != null
        ) {
          return b.registrado - a.registrado;
        }
        if (
          typeof element.registrado === "object" &&
          b.registrado != null &&
          a.registrado != null
        ) {
          return (
            new Date(b.registrado).valueOf() - new Date(a.registrado).valueOf()
          );
        }
        if (
          typeof element.registrado === "string" &&
          b.registrado != null &&
          a.registrado != null
        ) {
          return b.registrado.localeCompare(a.registrado);
        }
      };
      if (sortResult) {
        sortResult = false;
        return arraySearch.sort(asc);
      } else {
        sortResult = true;
        return arraySearch.sort(desc);
      }
    }
  };

  const sortModificado = (arraySearch) => {
    for (let index = 0; index < arraySearch.length; index++) {
      const element = arraySearch[index];
      //console.log(typeof element);

      const asc = (a, b) => {
        if (
          typeof element.actualizado === "number" &&
          a.actualizado != null &&
          b.actualizado != null
        ) {
          return a.actualizado - b.actualizado;
        }
        if (
          typeof element.actualizado === "object" &&
          a.actualizado != null &&
          b.actualizado != null
        ) {
          return (
            new Date(a.actualizado).valueOf() -
            new Date(b.actualizado).valueOf()
          );
        }
        if (
          typeof element.actualizado === "string" &&
          a.actualizado != null &&
          b.actualizado != null
        ) {
          return a.actualizado.localeCompare(b.actualizado);
        }
      };
      const desc = (a, b) => {
        if (
          typeof element.actualizado === "number" &&
          b.actualizado != null &&
          a.actualizado != null
        ) {
          return b.actualizado - a.actualizado;
        }
        if (
          typeof element.actualizado === "object" &&
          b.actualizado != null &&
          a.actualizado != null
        ) {
          return (
            new Date(b.actualizado).valueOf() -
            new Date(a.actualizado).valueOf()
          );
        }
        if (
          typeof element.actualizado === "string" &&
          b.actualizado != null &&
          a.actualizado != null
        ) {
          console.log(b.actualizado);
          return b.actualizado.localeCompare(a.actualizado);
        }
      };
      if (sortResult) {
        sortResult = false;
        return arraySearch.sort(asc);
      } else {
        sortResult = true;
        return arraySearch.sort(desc);
      }
    }
  };

  module.exports = {
    token,   
    //sort roles
    sortId,
    sortNombre,
    sortCreado,
    sortModificado,
    //filter documents
    getSearchDocs,
  };
} else {
  console.log("No ha iniciado sesión");
}
