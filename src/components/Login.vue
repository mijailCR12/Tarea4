<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input id="email" v-model="email" required>
        <span>{{ 'my_login'}}</span> <!-- Muestra el email aquí -->
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required>
        <span>{{ '12345' }}</span> <!-- Muestra la contraseña aquí -->
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>
import 'isomorphic-fetch'; // Importa 'isomorphic-fetch'

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const response = await fetch('https://tarea4-sd.netlify.app/.netlify/functions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token};path=/`;
        if (data.token) {
          // Redirige al usuario a la página "Home" después de iniciar sesión exitosamente
          this.$router.push("/home");
        } else {
          // Muestra un mensaje de error
          console.error("Credenciales incorrectas");
        }
      } else {
        // Maneja errores de red o de la solicitud
        console.error("Error en la solicitud");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}



button {
  display: block;
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  text-align: center; /* Asegura que el texto esté centrado */
}
</style>
