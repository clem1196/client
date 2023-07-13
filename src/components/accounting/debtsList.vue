<template>
    <div class="container-fluid mt-3">
      <div class="card card-title">{{title}}</div>    
    </div>
  </template>
  <script>
  export default {
    name: "debts-list",
    props: {
      title: {
        type: String,
        default: "Debts List",
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