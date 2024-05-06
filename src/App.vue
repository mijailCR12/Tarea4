<template>
<div id="app" class="container">
  <div class="row"  style="margin-top: 15px">
    <router-link class="three columns button button-primary" 
      to="/home">Home</router-link>
    <router-link class="three columns button button-primary" 
      to="/book">Books</router-link>
    <router-link class="three columns button button-primary" 
      to="/author">Authors</router-link>
    <router-link class="three columns button button-primary" 
      to="/publisher">Publishers</router-link>
  </div>
 <router-view />
</div>
</template>

<script>
export default {
  name: "App",
};
</script>
