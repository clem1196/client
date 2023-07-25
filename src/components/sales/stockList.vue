<template>
    <div class="container-fluid mt-3">
      <div class="card card-title">{{title}}</div>    
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Total</th>
              <th scope="col">Available</th>
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <td>1</td>
              <td>product</td>
              <td>20</td>
              <td>5</td>
            </tr>
            <tr class="">
              <td scope="row">2</td>
              <td>product1</td>
              <td>50</td>
              <td>20</td>
            </tr>
            <tr class="">
              <td scope="row">3</td>
              <td>product2</td>
              <td>100</td>
              <td>40</td>
            </tr>
          </tbody>
        </table>
      </div>
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