import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import BookIndex from "./components/BookIndex.vue";
import BookDetails from "./components/BookDetails.vue";

import AuthorIndex from "./components/AuthorIndex.vue";
import AuthorDetails from "./components/AuthorDetails.vue";

import PublisherIndex from "./components/PublisherIndex.vue";
import PublisherDetails from "./components/PublisherDetails.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/home", component: Home, meta: {requiresAuth: true} },
  { path: "/book", component: BookIndex, meta: {requiresAuth: true} },
  { path: "/book/show/:id", 
    component: BookDetails, props: {show:true}, meta: {requiresAuth: true} },
  { path: "/book/edit/:id", 
    component: BookDetails, props: {edit:true}, meta: {requiresAuth: true} },
  { path: "/book/create", 
    component: BookDetails, props: {create:true}, meta: {requiresAuth: true} },
  { path: "/book/delete/:id", 
    component: BookDetails, props: {delete:true}, meta: {requiresAuth: true} },

      // authors
  { path: "/author", component: AuthorIndex, meta: {requiresAuth: true} },
  { path: "/author/show/:id", 
    component: AuthorDetails, props: {show:true}, meta: {requiresAuth: true} },
  { path: "/author/edit/:id", 
    component: AuthorDetails, props: {edit:true}, meta: {requiresAuth: true} },
  { path: "/author/create", 
    component: AuthorDetails, props: {create:true}, meta: {requiresAuth: true} },
  { path: "/author/delete/:id", 
    component: AuthorDetails, props: {delete:true}, meta: {requiresAuth: true} },

  // publisher
  { path: "/publisher", component: PublisherIndex, meta: {requiresAuth: true} },
  { path: "/publisher/show/:id", 
    component: PublisherDetails, props: {show:true}, meta: {requiresAuth: true} },
  { path: "/publisher/edit/:id", 
    component: PublisherDetails, props: {edit:true}, meta: {requiresAuth: true} },
  { path: "/publisher/create", 
    component: PublisherDetails, props: {create:true}, meta: {requiresAuth: true} },
  { path: "/publisher/delete/:id", 
    component: PublisherDetails, props: {delete:true}, meta: {requiresAuth: true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = getCookie("token");
  if (to.meta.requiresAuth && !token) {
    next("/");
  }else{
    next();
  }
})

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default router;