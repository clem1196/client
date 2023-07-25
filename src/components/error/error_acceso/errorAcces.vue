<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger" style="color: #fef9e7">
        <h5 class="modal-title">Error!!.</h5>

        <a type="button" :href="path"
          ><i class="bi-x-lg" style="color: black"></i
        ></a>
      </div>
      <div class="modal-body">
        <p>Usted no tiene permiso!!.</p>
        <p>Desea cerrar sesión e ingresar con otra cuenta?</p>
      </div>
      <div class="modal-footer">
        <a
          type="button"
          class="btn btn-danger"         
          :href="path"
          >No</a
        >
        <a
          type="button"
          class="btn btn-light"          
          href="/login"
          >Si</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import GetUrls from "../../../services/users/Helpers";
export default {
 name: "error-acceso",
 data(){
     return{
         path:""
     }
 },
 async mounted(){
     const getPath=await GetUrls.getUrls();
     this.path=getPath[0];
 }
}
</script>

<style>

</style>