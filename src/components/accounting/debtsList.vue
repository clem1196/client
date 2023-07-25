<template>
    <div class="container-fluid mt-3">
      <div class="card card-title">{{title}}</div> 
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Supplier</th>
              <th scope="col">Amount</th>
              <th scope="col">Estado</th>
              
            </tr>
          </thead>
          <tbody>
            <tr class="">
              <td>1</td>
              <td>Client</td>
              <td>1000$</td>
              <td>Cancelled</td>
            </tr>
            <tr class="">
              <td scope="row">2</td>
              <td>Client1</td>
              <td>180$</td>
              <td>Cancelled</td>
            </tr>
            <tr class="">
              <td scope="row">3</td>
              <td>Client2</td>
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