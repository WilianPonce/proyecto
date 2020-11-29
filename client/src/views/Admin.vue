<template>
  <div>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-6">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(prod,index) in lista" :key="index">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ prod.nombreProducto }}</td>
                <td>{{ prod.descripcionProducto }}</td>
                <td>{{ prod.precioProducto }}</td>
                <td> <img :src="url+prod.imagenProducto" class="card-img-top imgtable" alt="..."/> </td>
                <td>
                  <div class="btn btn-danger" @click="eliminar(prod._id)">Eliminar</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <div>
            <div class="form-group">
              <label for="exampleInputEmail1">Nombre del producto</label>
              <input
                type="email"
                class="form-control"
                id="nombre"
                aria-describedby="nombre"
                placeholder="Ingrese el nombre del producto"
                v-model="nombre"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"
                >Descripcion del producto</label
              >
              <input
                type="text"
                class="form-control"
                id="descripcion"
                placeholder="Ingrese la descipcion del producto"
                v-model="descripcion"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1"
                >Precio del producto</label
              >
              <input
                type="text"
                class="form-control"
                id="precio"
                placeholder="Ingrese el precio del producto"
                v-model="precio"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Imagen del producto</label>
              <input
                type="file"
                class="form-control-file"
                id="cargarImagen"
                v-on:change="cargarImagen"
              />
            </div>
            <button class="btn btn-primary" v-on:click="enviarProducto">Enviar</button>
          </div>
          <div class="card p-4 mt-5">
            <p>Nombre: {{ nombre }}</p>
            <p>Descripcion: {{ descripcion }}</p>
            <p>Precio: {{ precio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      url: 'http://localhost:3000/upload/',
      nombre: null,
      descripcion: null,
      precio:null,
      image: null,
      lista:[]
    };
  },
  methods: {
    cargarImagen(event) {
      this.image = event.target.files[0];
    },
    listarProducto(){
      axios.get("http://localhost:3000/products/list").then( ({data}) => {
        this.lista = data.body;
      }).catch(console.error)
    },
    enviarProducto(){
      let formData = new FormData();
      formData.append("nombreProducto",this.nombre);
      formData.append("descripcionProducto", this.descripcion);
      formData.append("precioProducto", this.precio);
      formData.append("imagenProducto", this.image);
      axios.post("http://localhost:3000/products/upload", formData)
        .then( ({data}) =>{
          this.lista.push(data.body.ops[0]);
          this.nombre = null;
          this.descripcion = null;
          this.precio = null;
          this.image = null;
        })
        .catch(console.error);
    },
    eliminar(id){
      axios.delete("http://localhost:3000/products/delete/"+id)
        .then( ({data}) =>{
          console.log(data);
          this.listarProducto();
        })
        .catch(console.error);
    }
  },
  mounted() {
    this.listarProducto();
  },
};
</script>

<style>
  .imgtable{
    width: 45px!important;
    height: 45px!important;
  }
</style>
