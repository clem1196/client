<template>
  <div class="container-fluid mt-3">
    <div class="card card-title">{{title}}</div>    
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Servicios</th>
            <th scope="col">Amount</th>
            <th scope="col">Estado</th>
            
          </tr>
        </thead>
        <tbody>
          <tr class="">
            <td>1</td>
            <td>Water</td>
            <td>200$</td>
            <td>Cancelled</td>
          </tr>
          <tr class="">
            <td scope="row">2</td>
            <td>Electricity</td>
            <td>180$</td>
            <td>Cancelled</td>
          </tr>
          <tr class="">
            <td scope="row">3</td>
            <td>Internet</td>
            <td>100$</td>
            <td>Outstanding</td>
          </tr>
        </tbody>
      </table>
    </div>
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

</style>