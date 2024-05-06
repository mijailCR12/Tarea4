<!-- ProductoIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Nombre</th>
        <th>Descripcion</th>
        <th>Stock</th>
        <th>Precio compra</th>
        <th>Precio venta</th>
        <th>Proveedor</th>
        <th>Categoria</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='producto in productos'>
       <td>{{producto.nombre}}</td>
       <td>{{producto.descripcion}}</td>
       <td>{{producto.stock}}</td>
       <td>{{producto.precio_compra}}</td>
       <td>{{producto.precio_venta}}</td>
       <td>{{producto.proveedor}}</td>
       <td>{{producto.categoria}}</td>
       <td>
       <router-link class="button"
         :to="'/producto/show/'+producto._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/producto/edit/'+producto._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteProducto(producto._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/producto/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Producto Index",
  data() {
    return {
      title: 'Productos List',
      productos: []
    };
  },
  mounted() {
    this.allProductos()
  },
  methods: {
    allProductos() {
      fetch(this.url+'/.netlify/functions/productoFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.productos = items;
        })
     },
     deleteProducto(id) {
       fetch(this.url+'/.netlify/functions/productoDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allProductos();
          }
        )
     }
  }
};
</script>