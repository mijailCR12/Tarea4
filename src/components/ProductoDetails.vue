<!-- ProductoDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Nombre</label>
       <input class="u-full-width" type="text"
         v-model="producto.nombre">
      </div>
      <div class="six columns">
       <label for="authorInput">Descripcion</label>
       <input class="u-full-width" type="text"
          v-model="producto.descripcion">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="publisherInput">Proveedor</label>
       <input class="u-full-width" type="text"
          v-model="producto.proveedor">
      </div>
      <div class="six columns">
       <label for="editionInput">Categoria</label>
       <input class="u-full-width" type="text"
         v-model="producto.categoria">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="copyrightInput">Stock</label>
       <input class="u-full-width" type="number"
          v-model="producto.stock">
      </div>
      <div class="six columns">
       <label for="languageInput">Creacion</label>
       <input class="u-full-width" type="text"
         v-model="producto.fecha_creacion">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="copyrightInput">Precio Compra</label>
       <input class="u-full-width" type="number"
          v-model="producto.precio_compra">
      </div>
      <div class="six columns">
       <label for="languageInput">Precio Venta</label>
       <input class="u-full-width" type="text"
         v-model="producto.precio_venta">
      </div>
     </div>
     <div class="row">
      <router-link class="button button-primary" 
        to="/producto">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateProducto(producto._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createProducto()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Producto Details",
  props: ['create','edit','create'],
  data() {
    return {
      title: "Producto Data",
      producto: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findProducto(route.params.id);
    else {
      this.producto = {
        '_id': Math.floor(Math.random()*100000000),
        'nombre':'',
        'descripcion':'',
        'stock':0,
        'precio_compra':'',
        'precio_venta':0,
        'fecha_actualizacion':'',
        'fecha_creacion':0,
        'categoria':'',
        'categoria_id':0,
        'proveedor':'',
        'proveedor_id':0 };
    }
  },
  methods: {
    findProducto: function(id) {
      fetch(this.url+'/.netlify/functions/productoFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.producto = items[0];
      })
    },
    updateProducto: function(id) {
      fetch(this.url+'/.netlify/functions/productoUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.producto)})
        .then((data) => {
          this.$router.push('/producto');
        }
      )
    },
    createProducto: function() {
      fetch(this.url+'/.netlify/functions/productoInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.producto)})
        .then((data) => {
           this.$router.push('/producto');
        }
      )
    }
  }
};
</script>