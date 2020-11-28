<template>
  <div class="about">
    <div class="container">
      <h1 class="mt-5 mb-3 text-center">Your cart</h1>
      <router-link class="mb-5 text-info" to="/"
        >continuar comprando</router-link
      >
      <table class="table mt-3">
        <thead class="thead-dark">
          <tr>
            <th scope="col" class="text-center">Nº</th>
            <th scope="col">Producto</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Imag</th>
            <th scope="col" class="text-center">Cantidad</th>
            <th scope="col" class="text-center">Precio unitario</th>
            <th scope="col" class="text-center">Precio total</th>
            <th scope="col" class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product,index) in products" :key="index">
            <th scope="row" class="text-center">{{ index+1 }}</th>
            <td>{{ product.nombreProducto }}</td>
            <td>{{ product.descripcionProducto }}</td>
            <td><img :src="url+product.imagenProducto" class="card-img-top imgtablecart" alt="..."/></td>
            <td class="text-center"><input type="text" v-model="product.cantidadProducto" class="cantidad" @keyup="acprodcts()"></td>
            <td class="text-center">${{ product.precioProducto }}</td>
            <td class="text-center">${{ (product.cantidadProducto * product.precioProducto) | totalizar }}</td>
            <td class="text-center"><div class="btn btn-danger" @click="eliminar(index)">Eliminar</div></td>
          </tr>
          <tr >
            <th></th>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-center" v-if="total>0">total</td>
            <td class="text-center" v-if="total>0">${{total}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://localhost:3000/upload/',
      products: []
    };
  },
  filters: {
    totalizar(data){
      if(data){
        return data.toFixed(2)
      }else{
        return (0).toFixed(2)
      }
    }
  },
  computed: {
    total(){
      let total = 0;
      this.products.forEach(el => {
          let cantidadProducto = 0;
          if(el.cantidadProducto){
            cantidadProducto = el.cantidadProducto;
          }
          total += parseFloat(cantidadProducto) * parseFloat(el.precioProducto);
      });
      return total.toFixed(2);
    }
  },
  methods: {
    getProducts() {
      this.products = JSON.parse(localStorage.getItem("productos"));
    },
    eliminar(index){
      this.products.splice(index,1);
      this.acprodcts();
    },
    acprodcts(){
      let productsString = this.products.map(producto =>
        JSON.stringify(producto)
      );
      localStorage.setItem("productos", `[${productsString.toString()}]`);
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style>
  .cantidad{
    border: none;
    border-bottom: 1px solid #b3b3b3;
    width: 80px;
    outline:none!important;
    text-align: center;
  }
  .imgtablecart{
    height: 40px!important;
    width: 40px!important;
  }
</style>