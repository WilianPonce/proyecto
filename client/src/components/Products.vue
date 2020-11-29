<template>
  <div class="hello">
    <div class="container">
      <h2 class="mt-5 mb-5 display-4 text-center">Lista de productos</h2>
      <div class="row">
        <div class="col-4" v-for="product in products" :key="product.id">
          <div class="card mb-3">
            <img
              :src="url+product.imagenProducto"
              class="card-img-top"
              alt="..."
              width="90"
              height="180"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.nombreProducto }}</h5>
              <p class="card-text">
                {{ product.descripcionProducto }}
              </p>
              <p
                class="card-text d-flex justify-content-lg-between align-items-center"
              >
                <small class="text-muted mr-5">$ {{ product.precioProducto }}</small>
                <button
                  class="btn btn-dark"
                  v-on:click="agregarAlCarrito(product)"
                  v-if="$store.state.user"
                >
                  Agregar al carrito
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "Products",
  data() {
    return {
      url: 'http://localhost:3000/upload/',
      products: [],
      productsInCar: []
    };
  },
  methods: {
    listarProducto(){
      axios.get("http://localhost:3000/products/list").then( ({data}) => {
        this.products = data.body;
      }).catch(console.error)
    },
    agregarAlCarrito(product) {
      // Forma 1
      //localStorage.setItem(`${product.id}`, JSON.stringify(product));
      // Forma 2
      let existe = 0;
      this.productsInCar.forEach(el => {
          if(el._id == product._id){
            existe++;
          }
      });
      if(existe>0){return;}
      this.productsInCar.push(product);
      let productsString = this.productsInCar.map(producto =>
        JSON.stringify(producto)
      );
      localStorage.setItem("productos", `[${productsString.toString()}]`);
    }
  },
  mounted(){
    let prd_recupera = localStorage.getItem("productos");
    if(prd_recupera){
      this.productsInCar = JSON.parse(prd_recupera);
    }
    this.listarProducto();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
