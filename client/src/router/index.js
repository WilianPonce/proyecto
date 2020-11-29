import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {auth:true}
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {auth:true, admin:true}
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let rol = localStorage.getItem("rol");
  if(to.matched.some(record => record.meta.auth)){
    if(token){
      next();
      if(to.matched.some(record => record.meta.admin)){
        if(rol==1){
          next();
        }else{
          router.replace("/");
        }
      }else{
        next();
      }
    }else{
      router.replace("/login");
    }
  }else{
    next();
  }
});

export default router;
