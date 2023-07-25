<template>
  <div>
    <button
      id="logout"
      type="button"
      class="btn btn-primary btn-lg"
      data-bs-toggle="modal"
      data-bs-target="#logoutModal"
      hidden
    ></button>

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
          <div class="modal-header head">
            <p class="modal-title title" id="logoutModalLabel">
              <i class="bi-exclamation-triangle-fill"></i>
            </p>
            <a class="modal-close" :href="path">X</a>
          </div>
          <div class="modal-body body">Desea Cerrar Sesión?</div>
          <div class="modal-footer footer">
            <button class="btn yes m-3" @click="getLogout">Si</button>
            <a :href="path" class="btn not">No</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helpers from "../../services/users/Helpers";
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

<style scoped>

</style>
