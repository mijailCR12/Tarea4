<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <input type="text" v-model="searchQuery" placeholder="Buscar por nombre, nacionalidad o año de nacimiento">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Nationality</th>
            <th>Birth Year</th>
            <th>Fields</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="author in filteredAuthors" :key="author._id">
            <td>{{ author.author }}</td>
            <td>{{ author.nationality }}</td>
            <td>{{ author.birth_year }}</td>
            <td>{{ author.fields }}</td>
            <td>
              <router-link class="button" :to="'/author/show/' + author._id">Show</router-link>
              <router-link class="button" :to="'/author/edit/' + author._id">Edit</router-link>
              <a class="button" @click="deleteAuthor(author._id)">Erase</a>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/author/create">New</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorIndex",
  data() {
    return {
      title: "Author List",
      authors: [],
      searchQuery: ""
    };
  },
  mounted() {
    this.allAuthors();
  },
  methods: {
    allAuthors() {
      fetch(this.url + "/.netlify/functions/authorFindAll", {
        headers: { Accept: "application/json" }
      })
      .then((response) => response.json())
      .then((items) => {
        this.authors = items;
      });
    },
    deleteAuthor(id) {
      fetch(this.url + "/.netlify/functions/authorDelete/" + id, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE"
      })
      .then(() => {
        this.allAuthors();
      });
    }
  },
  computed: {
    filteredAuthors() {
      const query = this.searchQuery.toLowerCase();
      return this.authors.filter((author) => {
        return (
          author.author.toLowerCase().includes(query) ||
          author.nationality.toLowerCase().includes(query) ||
          author.birth_year.toString().includes(query)
        );
      });
    }
  }
};
</script>
