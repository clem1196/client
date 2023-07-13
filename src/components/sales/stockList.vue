<template>
    <div class="container-fluid mt-3">
      <div class="card card-title">{{title}}</div>    
    </div>
  </template>
  <script>
  export default {
    name: "stock-list",
    props: {
      title: {
        type: String,
        default: "Stock list",
      },
    },
    data() {
      return {
        
      };
    },
  };
  </script>
  <style>

  </style>