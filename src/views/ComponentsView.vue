<template>
  <div
    class="container-fluid"
    id="containerFluid"
    @mouseenter="changeTextBtn"
  >
    <div class="row" v-if="token" id="rowDocsView">
      <div class="col-2 panel-right">
        <div class="nav flex-column">
          <!--Users-->
          <button
            v-if="administrator || auditor"
            class="btn-modules"
            id="btnusers"
            data-bs-toggle="collapse"
            data-bs-target="#tab-users"
            title="Users"
          >
            <i class="bi-people-fill"></i>
            Users
          </button>
          <div class="collapse" id="tab-users">
            <div
              class="nav flex-column"
              id="nav-users"
              aria-orientation="vertical"
            >
              <button
                @click="btnActive"
                id="btnUsers_roles"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-users_roles"
                type="button"
                aria-selected="false"
                title="Users with roles"
              >
                <i class="bi-person-lines-fill"></i>
                User-Role
              </button>
              <button
                @click="btnActive"
                id="btnUsers"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-users"
                type="button"
                aria-selected="false"
                title="User"
              >
                <i class="bi-person"></i>
                User
              </button>
              <button
                @click="btnActive"
                id="btnRoles"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-roles"
                type="button"
                aria-selected="false"
                title="Role"
              >
                <i class="bi-person-workspace"></i>
                Role
              </button>
            </div>
          </div>
          <!--Documents-->
          <button
            v-if="administrator || employee"
            class="btn-modules"
            id="btndocuments"
            data-bs-toggle="collapse"
            data-bs-target="#tab-documents"
            title="Documents"
          >
            <i class="bi-folder2"></i>
            Documents
          </button>
          <div class="collapse" id="tab-documents">
            <div
              class="nav flex-column"
              id="nav-documents"
              aria-orientation="vertical"
            >
              <button
                @click="btnActive"
                id="btnDocs"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-document"
                type="button"
                aria-selected="false"
                title="Docs"
              >
                <i class="bi-file-earmark"></i>
                Docs
              </button>
              <button
                @click="btnActive"
                id="btnFiles"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-files"
                type="button"
                aria-selected="false"
                title="Uploads"
              >
                <i class="bi-cloud-arrow-up-fill"></i>
                Uploads
              </button>
            </div>
          </div>
          <!--Accounting-->
          <button
            v-if="administrator || counter"
            class="btn-modules"
            id="btnaccounting"
            data-bs-toggle="collapse"
            data-bs-target="#tab-accounting"
            title="Accountings"
          >
            <i class="bi-book"></i>
            Accountings
          </button>
          <div class="collapse" id="tab-accounting">
            <div
              class="nav flex-column"
              id="nav-accounting"
              aria-orientation="vertical"
            >
              <button
                @click="btnActive"
                id="btnPayments"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-debts"
                type="button"
                aria-selected="false"
                title="Debts"
              >
                <i class="bi-currency-dollar"></i>
                Debts
              </button>
              <button
                @click="btnActive"
                id="btnDebts"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-obligations"
                type="button"
                aria-selected="false"
                title="Obligations"
              >
                <i class="bi-bank"></i>
                Obligations
              </button>
            </div>
          </div>
          <!--Sales-->
          <button
            v-if="administrator || seller"
            class="btn-modules"
            id="btndocuments"
            data-bs-toggle="collapse"
            data-bs-target="#tab-sales"
            title="Sales"
          >
            <i class="bi-shop"></i>
            Sales
          </button>
          <div class="collapse" id="tab-sales">
            <div
              class="nav flex-column"
              id="nav-sales"
              aria-orientation="vertical"
            >
              <button
                @click="btnActive"
                id="btnProducts"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-products"
                type="button"
                aria-selected="false"
                title="Products"
              >
                <i class="bi-cart4"></i>
                Products
              </button>
              <button
                @click="btnActive"
                id="btnStocks"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-stocks"
                type="button"
                aria-selected="false"
                title="Stock"
              >
                <i class="bi-list-ol"></i>
                Stock
              </button>
            </div>
          </div>
          
        </div>
      </div>
      <!--MAIN CONTENT-->
      <div class="col-10" id="col-10">
        <div class="tab-content">
           <!--users content-->
           <div class="tab-pane fade" id="data-users_roles">
            <users-roles></users-roles>
          </div>
          <div class="tab-pane fade" id="data-users">
            <users></users>
          </div>
          <div class="tab-pane fade" id="data-roles">
            <roles></roles>
          </div>
          <!--home content-->
          <div class="tab-pane fade" id="data-home">
            <home-view></home-view>
          </div>
          <!--documents content-->
          <div class="tab-pane fade" id="data-document">
            <documents></documents>
          </div>
          <!--<div class="tab-pane fade show active" id="data-files">-->
          <div class="tab-pane fade" id="data-files">
            <files></files>
          </div>
          <!--accounting content-->
          <div class="tab-pane fade" id="data-debts">
            <Debts></Debts>
          </div>
          <div class="tab-pane fade" id="data-obligations">
            <Obligations></Obligations>
          </div>
          <!--sales content-->
          <div class="tab-pane fade" id="data-products">
            <Products></Products>
          </div>
          <div class="tab-pane fade" id="data-stocks">
            <Stocks></Stocks>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from "../services/users/Helpers";
//components home
import HomeView from "./HomeView.vue";
//components documents
import Files from "../components/documentos/Files.vue";
import Documents from "../components/documentos/Documents.vue";
// Components accounting
import Debts from "../components/accounting/debtsList.vue";
import Obligations from "../components/accounting/obligationsList.vue";
// Components sales
import Products from "../components/sales/productsList.vue";
import Stocks from "../components/sales/stockList.vue";
//components users
import Roles from "../components/users/roles/rolesList.vue";
import Users from "../components/users/usuarios/usuariosList.vue";
import UsersRoles from "../components/users/usuarios_roles/usuariosRolesList.vue";

export default {
  data() {
    return {
      token: "",
      user: "",
      administrator: false,
      auditor: false,
      seller: false,
      counter: false,
      employee: false,
      //size windows
      sizeWindow: 0,
    };
  },
  async mounted() {
    if (Helper.token) {
      //cerrar sesión
      await Helper.CaducarToken();
      //token
      this.token = Helper.token;
      //user
      this.user = await Helper.obtenerNombreUsuario();
      //roles
      this.administrator = await Helper.isAdministrator();
      this.auditor = await Helper.isAuditor();
      this.seller =
        (await Helper.isSellerLists()) || (await Helper.isSellerChanges());
      this.counter =
        (await Helper.isAccountantLists()) ||
        (await Helper.isAccountantChanges());
      this.employee =
        (await Helper.isEmployeeLists()) || (await Helper.isEmployeeChanges());
    }
    //reset buttons

    this.changePageActive();
  },
  components: {
    HomeView,
    Documents,
    Files,
    Debts,
    Obligations,
    Products,
    Stocks,
    UsersRoles,
    Users,
    Roles,
  },
  methods: {
    changePageActive() {
      //console.log(this.$route.path);
      //let tabPaneHome=document.getElementById("data-home")
      //let tabPaneAbout=document.getElementById("data-about")
      let tabPaneDoc = document.getElementById("data-document");
      let tabPaneFiles = document.getElementById("data-files");
      let tabPanePayments = document.getElementById("data-debts");
      let tabPaneDebts = document.getElementById("data-obligations");
      let tabPaneProducts = document.getElementById("data-products");
      let tabPaneStocks = document.getElementById("data-stocks");
      let tabPaneUsers_Roles = document.getElementById("data-users_roles");
      let tabPaneUsers = document.getElementById("data-users");
      let tabPaneRoles = document.getElementById("data-roles");
      if (this.$route.path === "/documentos") {
        tabPaneDoc.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/files") {
        tabPaneFiles.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/debts") {
        tabPanePayments.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/obligations") {
        tabPaneDebts.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/products") {
        tabPaneProducts.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/stocks") {
        tabPaneStocks.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/usuarios-roles") {
        tabPaneUsers_Roles.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/usuarios") {
        tabPaneUsers.classList.value = "tab-pane fade show active";
      }
      if (this.$route.path === "/roles") {
        tabPaneRoles.classList.value = "tab-pane fade show active";
      }
    },
    btnActive() {
      let navBtnActive = document.getElementsByClassName("nav-link-tab active");
      let navBtn = document.getElementsByClassName("nav-link-tab");

      let btnIdActive = [];
      for (let index = 0; index < navBtn.length; index++) {
        if (navBtn[index].classList.value === "nav-link-tab active") {
          btnIdActive.push(navBtn[index].id);
          //console.log(navBtn.length)
          //console.log(navBtn[index].id)
          navBtn[index].classList.value = "nav-link-tab";
        }
      }
      for (let index = 0; index < navBtn.length; index++) {
        if (btnIdActive.length === 1 && navBtn[index].id === btnIdActive[0]) {
          navBtn[index].classList.value = "nav-link-tab active";
        }
      }
      console.log(navBtnActive);
      console.log(navBtnActive[0]);
      console.log(btnIdActive);
    },
    changeTextBtn() {
      let widthWindow = document.getElementById("containerFluid");
      this.sizeWindow = widthWindow.offsetWidth;
      console.log(this.sizeWindow);
      //class btn-modules
      let btnModules = document.getElementsByClassName("btn-modules");
      for (let index = 0; index < btnModules.length; index++) {
        if (this.sizeWindow < 800) {
          btnModules[index].innerHTML =
            btnModules[index].innerHTML.split("i>")[0] + "i>";
        } else {
          btnModules[index].innerHTML =
            btnModules[index].innerHTML.split("i>")[0] +
            "i>" +
            " " +
            btnModules[index].title;
        }
      }
      //class nav-link-tab
      let btnNavLinkTab = document.getElementsByClassName("nav-link-tab");
      for (let index = 0; index < btnNavLinkTab.length; index++) {
        if (this.sizeWindow < 800) {
          btnNavLinkTab[index].innerHTML =
            btnNavLinkTab[index].innerHTML.split("i>")[0] + "i>";
        } else {
          btnNavLinkTab[index].innerHTML =
            btnNavLinkTab[index].innerHTML.split("i>")[0] +
            "i>" +
            " " +
            btnNavLinkTab[index].title;
        }
      }
    },
  },
};
</script>

<style></style>
