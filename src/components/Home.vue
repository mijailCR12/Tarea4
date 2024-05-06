<!-- Home.vue -->
<template>
  <div>
    <h2 style="margin-top: 15px">Control - Souvenir</h2>
      <p>Sistema de control de inventario.</p>
    <ul>
      <li><router-link to='/provedor'>Proveedores</router-link></li>
      <li><router-link to='/categoria'>Categorias de productos</router-link></li>
      <li><router-link to='/producto'>Productos</router-link></li>
    </ul>
    <!-- Botón de Logout -->
    <button @click="logout">Logout</button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      // Eliminar la cookie del token
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // Redirigir al usuario a la pantalla de inicio de sesión
      this.$router.push('/');
    }
  }
};
</script>