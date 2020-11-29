<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="z-index:2">
      <router-link class="navbar-brand" to="/">
      <img src="./assets/logo2.png" width="33px"> CrossLuch
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="$store.state.user">
            <router-link class="nav-link" to="/cart">Cart</router-link>
          </li>
          <template v-if="$store.state.user">
            <li class="nav-item" v-if="$store.state.user.rol==1">
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
          </template>
        </ul>
      </div>
      <div v-if="!$store.state.user">
        <router-link class="userl" to="/login">Login</router-link> | 
        <router-link class="userl" to="/register">Register</router-link>
      </div>
      <div v-else>
        <span class="usern">Bienvenido: {{ $store.state.user.name }} <span class="botones userl" @click="logout()">Cerrar Sesión</span></span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import axios from "axios";

  export default {
    methods: {
      ...mapMutations(["logoutUser", "setUser", "setToken"]),
      logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        this.setUser(null);
        location.reload();
      },
      verificacion(){
        let token = localStorage.getItem("token");
        if(!token){
          return;
        }else{
          this.setToken(token);
        }
        if(!this.$store.state.user){
          axios.post("http://localhost:3000/users/auth",{token: token}).then( ({data}) => {
            const { user } = data;
            if(!user){
              this.logout();
            }
            this.setUser(user);
            localStorage.setItem("rol", user.rol)
          }).catch(error => {
            this.logout();
            console.log(error);
          });
        }
      }
    }, 
    mounted() {
      this.verificacion();
    },
  }
</script>

<style>
  .userl{
    color: rgba(255, 255, 255, 0.5);
  }
  .usern{
    color: rgba(255, 255, 255, 0.5);
    text-transform: capitalize;
  }
  .userl:hover{
    color: #fff;
    text-decoration: none;
  }
  .botones{
    cursor:pointer;
  }
  
</style>
