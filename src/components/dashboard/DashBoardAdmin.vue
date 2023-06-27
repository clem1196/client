<template>
  <div class="container">
    <div class="navigation">
      <ul>
        <li>
          <a href="">
            <span class="icon"><ion-icon name="logo-apple"></ion-icon></span>
            <span class="title">Brand Name</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
            <span class="title">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"
              ><ion-icon name="people-outline"></ion-icon
            ></span>
            <span class="title">Costumers</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"
              ><ion-icon name="chatbubble-outline"></ion-icon
            ></span>
            <span class="title">Messeger</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"><ion-icon name="help-outline"></ion-icon></span>
            <span class="title">Help</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"
              ><ion-icon name="settings-outline"></ion-icon
            ></span>
            <span class="title">Settings</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"><ion-icon name="key-outline"></ion-icon></span>
            <span class="title">Password</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="icon"
              ><ion-icon name="log-out-outline"></ion-icon
            ></span>
            <span class="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
    <!--main-->
    <div class="main">
      <div class="topbar">
        <div class="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <!--search-->
        <div class="search">
          <label>
            <input type="search" placeholder="Search here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>
        <!--user-->
        <div class="user">
          <label>
            <img src="../../assets/clemente.jpg" />
          </label>
        </div>
      </div>
      <!--Documents-->
      <div>

      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>
<script>
//import axios from "axios";
export default {
  name: "dashboard-admin",
  data() {
    return {};
  },
  mounted() {
    this.activeLink();
    this.toggleActive();
  },
  methods: {
    toggleActive() {
      let toggle = document.querySelector(".toggle");
      let navigation = document.querySelector(".navigation");
      let main = document.querySelector(".main");
      toggle.onclick = () => {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      };
    },
    activeLink() {
      let navigationli = document.querySelectorAll(".navigation li");
      const activelink = () => {
        navigationli.forEach((item) => 
        item.classList.remove("hovered"));
        //this.classList.add("hovered");
      };
      navigationli.forEach((item) =>
        item.addEventListener("mouseover", activelink)
      );
    },
  },
};
</script>
<style scoped>
/*:root
{
  --bs-blue:#287bff;  
  --bs-pink: #AB47BC;
  --bs-pink1: #f3e5f5;
}*/

body {
  min-height: 100vh;
  overflow-x: hidden;
}
.container {
  position: fixed;
  width: 100%;
}
.navigation {
  position: fixed;
  width: 300px;
  height: 100%;
  background: #ce93d8;
  border-left: 10px solid #ce93d8;
  transition: 0.5s;
  overflow: hidden;
}
.navigation.active {
  width: 80px;
}
.navigation ul {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  padding-left: 2px;
}
.navigation ul li {
  position: relative;
  width: 96%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
.navigation ul li:hover,
.navigation ul li.hovered {
  background: white;
}
.navigation ul li:nth-child(1) {
  margin-bottom: 40px;
  pointer-events: none;
}
.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: white;
}
.navigation ul li:hover a,
.navigation ul li.hovered a {
  color: #ab47bc;
}
.navigation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 70px;
  text-align: center;
}
.navigation ul li a .icon ion-icon {
  font-size: 1.75em;
}
.navigation ul li a .title {
  position: relative;
  display: block;
  padding: 0px 10px;
  height: 60px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
}
/*curve hover navigation*/
.navigation ul li:hover a::before,
.navigation ul li.hovered a::before {
  content: "";
  position: absolute;
  right: 0;
  top: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px white;
  pointer-events: none;
}
.navigation ul li:hover a::after,
.navigation ul li.hovered a::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: -50px;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px white;
  pointer-events: none;
}
/*main*/
.main {
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  min-height: 100vh;
  background: white;
  transition: 0.5s;
}
.main.active {
  width: calc(100% - 80px);
  left: 85px;
}
.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.toggle {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5em;
  cursor: pointer;
}
.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}
.search label {
  position: relative;
  width: 100%;
}
.search label input {
  width: 400px;
  height: 35px;
  border-radius: 35px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 14px;
  outline: none;
  border: 1px solid #ada5ad;
}
.search label ion-icon {
  position: absolute;
  top: 8px;
  left: 10px;
  font-size: 1.2em;
}
.user {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}
.user img {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
