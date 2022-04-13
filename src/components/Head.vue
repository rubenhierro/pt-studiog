<script>
import { useRouter, RouterLink } from 'vue-router'
import { LoginStore } from '../stores/LoginStore'

export default {
  data() {
    return {
      store: LoginStore(),
      router: useRouter(),
    }
  },
  computed: {
    isLogged() {
      return this.store.isLogged
    },
  },
  methods: {
    logout() {
      this.store.logout()
      this.router.push({ name: 'home' })
    }
  },
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Menu</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div v-if="isLogged">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Inicio</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/admin/categorias" class="nav-link">Categorías</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/admin/productos" class="nav-link">Productos</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/admin/pedidos" class="nav-link">Pedidos</RouterLink>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">Inicio</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/login" class="nav-link">Login</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>