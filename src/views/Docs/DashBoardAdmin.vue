<template>
    <div>
      <DashBoardAdmin></DashBoardAdmin>
    </div>
  </template>
  
  <script>
  import DashBoardAdmin from "../../components/dashboard/DashBoardAdmin.vue";
  
  export default {
    data() {
      return {
        datos: {},
      };
    },
    mounted() {
      //await this.clickActive()
    },
    components: {      
     DashBoardAdmin
    },
    methods: {},
  };
  </script>
  
  <style>  
  </style>