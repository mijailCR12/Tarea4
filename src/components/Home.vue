<!-- Home.vue -->
<template>
  <div>
    <h2 style="margin-top: 15px">Bookstore Example Site</h2>
      <p>This website offers information on books, authors and publishers.</p>
    <ul>
      <li><router-link to='/book'>Books information</router-link></li>
      <li><router-link to='/author'>Authors information</router-link></li>
      <li><router-link to='/publisher'>Publishers information</router-link></li>
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