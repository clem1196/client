<template>
  <div class="container-fluid mt-3">
    <div class="card card-title">{{title}}</div>    
  </div>
</template>
<script>
export default {
  name: "obligations-list",
  props: {
    title: {
      type: String,
      default: "Obligations list",
    },
  },
  data() {
    return {
      
    };
  },
};
</script>
<style>
@import  url("/src/services/style.css");
</style>