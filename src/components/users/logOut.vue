<template>
  <div>
    <!-- Button trigger modal -->
    <button
      id="logout"
      type="button"
      class="btn btn-primary btn-lg"
      data-bs-toggle="modal"
      data-bs-target="#logoutModal"
      hidden
    ></button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="logoutModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-secondary">
            <h5 class="modal-title" id="logoutModalLabel" style="color: white">
              Desea Cerrar Sesión?
            </h5>
            <a :href="path" class="btn btn-close"></a>
          </div>
          <div class="modal-footer-sm bg-light">
            <button class="btn btn-secondary m-3" @click="getLogout">Si</button>
            <a :href="path" class="btn btn-default" style="color: black">No</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helpers from "../../services/Helpers";
export default {
  name: "log-out",
  data() {
    return {
      path: "",
    };
  },
  async mounted() {
    this.path = await Helpers.getUrls();
    this.darclick();
  },

  methods: {
    darclick() {
      const log = document.getElementById("logout");
      log.click();
    },
    getLogout() {
      Helpers.Logout();
    },
  },
};
</script>

<style>
</style>