<template>
  <div class="row g-1 p-2">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Documentos
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Archivos
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Salir
        </button>
      </li>
    </ul>
    <!--contenido-->
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <documents></documents>
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <uploads></uploads>
      </div>
      <div
        class="tab-pane fade"
        id="contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
      <home-view></home-view>
      </div>
    </div>
  </div>
</template>

<script>
import Documents from "../../components/documentos/documents.vue";
import Uploads from "../../components/documentos/files/Uploads.vue";
import HomeView from '../HomeView.vue';
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
    Uploads,
    Documents,
    HomeView,
  },
  methods: {},
};
</script>

<style></style>
