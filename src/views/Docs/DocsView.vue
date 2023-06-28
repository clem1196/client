<template>
  <div class="container-fluid">
    <div class="row" v-if="token" id="rowDocsView" @mouseenter="changeSizeCol_10">
      <div class="col-2">
        <div class="nav flex-column">
          <!--Documents-->
          <button v-if="administrator||employee"
            class="btn-modules"
            id="btndocuments"           
            data-bs-toggle="collapse"
            data-bs-target="#tab-documents"
          >
            <i class="bi-file-earmark-plus-fill"></i>
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
              >
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
              >
                Files
              </button>
            </div>
          </div>
          <!--Accounting-->
          <button
          v-if="administrator||counter"
            class="btn-modules"
            id="btnaccounting"          
            data-bs-toggle="collapse"
            data-bs-target="#tab-accounting"
          >
            <i class="bi-briefcase-fill"></i>
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
                data-bs-target="#data-payments"
                type="button"
                aria-selected="false"
              >
                Payments
              </button>
              <button
                @click="btnActive"
                id="btnDebts"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-debts"
                type="button"
                aria-selected="false"
              >
                Debts
              </button>
            </div>
          </div>
          <!--Sales-->
          <button
          v-if="administrator||seller"
            class="btn-modules"
            id="btndocuments"
           
            data-bs-toggle="collapse"
            data-bs-target="#tab-sales"
          >
            <i class="bi-cash-stack"></i>
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
              >
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
              >
                Stock
              </button>
            </div>
          </div>
          <!--Users-->
          <button
          v-if="administrator||auditor"
            class="btn-modules"
            id="btnusers"
           
            data-bs-toggle="collapse"
            data-bs-target="#tab-users"
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
              >
                Users-Roles
              </button>
              <button
                @click="btnActive"
                id="btnUsers"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-users"
                type="button"
                aria-selected="false"
              >
                Users
              </button>
              <button
                @click="btnActive"
                id="btnRoles"
                class="nav-link-tab"
                data-bs-toggle="pill"
                data-bs-target="#data-roles"
                type="button"
                aria-selected="false"
              >
                Roles
              </button>
            </div>
          </div>
        </div>
      </div>
      <!--MAIN CONTENT-->
      <div class="col-10" id="col-10" >
        
        <div class="tab-content">
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
          <div class="tab-pane fade" id="data-payments">
            <Payments></Payments>
          </div>
          <div class="tab-pane fade" id="data-debts">
            <h2>This is Debts</h2>
          </div>
          <!--sales content-->
          <div class="tab-pane fade" id="data-products">
            <Products></Products>
          </div>
          <div class="tab-pane fade" id="data-stocks">
            <h2>This is Stocks</h2>
          </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from "../../services/Helpers";
//components home
import HomeView from "../HomeView.vue";
//components documents
import Files from "../../components/documentos/Files.vue";
import Documents from "../../components/documentos/Documents.vue";
// Components sales
import Products from "../../components/ventas/ventasList.vue";
// Components accounting
import Payments from "../../components/contabilidad/pagosPendientesList.vue";
//components users
import Roles from "../../components/users/roles/rolesList.vue";
import Users from "../../components/users/usuarios/usuariosList.vue";
import UsersRoles from "../../components/users/usuarios_roles/usuariosRolesList.vue";

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

    //this.changeSizeCol_10()
  },
  components: {
    Documents,
    HomeView,
    Files,
    UsersRoles,
    Users,
    Roles,
    Payments,
    Products,
  },
  methods: {
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
    changeSizeCol_10(){
     
      let widthRow=document.getElementById("rowDocsView")    
      let widthCol10=document.getElementById("col-10")
      
      console.log(widthRow.offsetWidth)
      console.log(widthCol10.offsetWidth)
      if (widthRow.offsetWidth<1004||widthCol10.offsetWidth<837) {     
        widthCol10.style="width:64%; display:flex;";
        
      }else{
        widthCol10.style="width:84%;";
      }
    
      
    }
  },
};
</script>

<style scoped>
.col-10 {
  flex: 0 0 auto;
  width: 84%;
}
.col-2 {
  flex: 0 0 auto;
  width: 16%;
  background: #b8c8ca ;
  min-width: min-content;
  min-height: min-content;
}
.btn-modules {
  color: white;
  margin-top: 6px;
  background-color: #00ACC1;
  border: 1px solid #00ACC1;
  padding: 0.25rem 2.75rem;
  font-size: 0.95rem;
  border-radius: 0.25rem;
  text-align: left;
  padding-left: 12px;
}
.btn-modules:hover {
  color: #9c27b0;
  background: #f3e5f5;
  border: 1px solid white;
}
.nav-link-tab {
  color: #9c27b0;
  background: white;
  border: 0;
  border-radius: 0.25rem;
  width: 70%;
  margin-top: 3%;
}
.nav-link-tab.active {
  color: white;
  background-color: #ab47bc;
  width: 70%;
  margin-top: 3%;
}

.nav-link-tab:hover {
  color: #9c27b0;
  background: #f3e5f5;
  border: 1px solid white;
}
.flex-column {
  flex-direction: column;
  align-content: center;
  margin-top: 0.1rem;
  margin-bottom: 12px;
  display: flex;
  flex-wrap: nowrap;
}
</style>
