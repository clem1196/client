<template>
  <div class="container text-center mt-5">
    <div>
      <div class="card m-auto bg-light"><h3>Contabilidad</h3></div>
      <table class="table table-light table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Clientes</th>
            <th>Monto</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="index">
            <td>{{ index }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.monto }}</td>
            <td>{{ cliente.detalles }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagos-list",
  props: {
    title: {
      type: String,
      default: "Pagos pendientes",
    },
  },
  data() {
    return {
      clientes: [
        { nombre: "Telefónica", monto:2000, detalles: " 2 mese" },
        { nombre: "Electrocentro", monto:9000, detalles: "3 meses" },
        { nombre: "El rápido.SA", monto:5000, detalles: "2 meses" },
      ],
    };
  },
};
</script>
<style scoped>
</style>