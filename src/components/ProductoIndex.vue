<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <div class="search-wrapper">
        <input type="text" v-model="searchQuery" placeholder="Buscar por nombre o ID del producto">
        <button class="add-button" @click="navigateToAddProductPage" style="background-color: #18900d;">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio compra</th>
            <th>Precio venta</th>
            <th>Proveedor</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in filteredProductos" :key="producto._id">
            <td>{{ producto._id }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.stock }}</td>
            <td>{{ producto.precio_compra }}</td>
            <td>{{ producto.precio_venta }}</td>
            <td>{{ producto.proveedor }}</td>
            <td>{{ producto.categoria }}</td>
            <td>{{ producto.categoria }}</td>
            <td>
              <router-link :to="'/producto/show/' + producto._id">
                <button class="action-button" style="background-color: #215df3;">
                  <i class="fas fa-eye"></i> <!-- Ícono de Font Awesome para 'Show' -->
                </button>
              </router-link>
              <router-link :to="'/producto/edit/' + producto._id">
                <button class="action-button" style="background-color: #f38321;">
                  <i class="fas fa-edit"></i> <!-- Ícono de Font Awesome para 'Edit' -->
                </button>
              </router-link>
              <button class="delete-button" @click="deleteProducto(producto._id)" style="background-color: #f32121;">
                <i class="fas fa-trash-alt"></i> <!-- Ícono de Font Awesome para 'Erase' -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductoIndex",
  data() {
    return {
      title: "Productos List",
      productos: [],
      filteredProductos: [], // Inicializamos como una matriz vacía
      searchQuery: ""
    };
  },
  mounted() {
    this.allProductos();
  },
  methods: {
    allProductos() {
      fetch(this.url + "/.netlify/functions/productoFindAll", {
        headers: { Accept: "application/json" }
      })
      .then((response) => response.json())
      .then((items) => {
        this.productos = items;
        // Al cargar todos los productos, también aplicamos el filtro inicial
        this.filterProductos();
      });
    },
    navigateToAddProductPage() {
      this.$router.push("/producto/create");
    },
    deleteProducto(id) {
      fetch(this.url + "/.netlify/functions/productoDelete/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE"
      })
      .then(() => {
        this.allProductos();
      });
    }
  },
  computed: {
    filteredProductos() {
      const query = this.searchQuery.toLowerCase();
      return this.productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(query) ||
        producto._id.toLowerCase().includes(query) ||
        producto.proveedor.toLowerCase().includes(query) ||
        producto.categoria.toLowerCase().includes(query);
      });
    }
  }
};
</script>

<style scoped>
.search-wrapper {
  display: block;
  align-items: center;
}

.add-button, .action-button, .delete-button {
  color: white;
  cursor: pointer;
  font-size: 16px; /* Tamaño de fuente */
  margin: 1px; /* Espaciado entre botones */
  transition: background-color 0.3s; /* Transición al pasar el ratón */
}

.add-button:hover, .action-button:hover, .delete-button:hover {
  background-color: #0e78b1; /* Color de fondo al pasar el ratón */
}

</style>
