<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">Cart</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
        </ul>
      </div>
      <div>
        <router-link class="userl" to="/login">Login</router-link>
      </div>
      <!--<div>
        <span class="userl">Bienvenido: Wilian Ponce</span>
      </div>-->
    </nav>
    <router-view />
  </div>
</template>

<style>
  .userl{
    color: rgba(255, 255, 255, 0.5);
  }
  .userl:hover{
    color: #fff;
    text-decoration: none;
  }
</style>
