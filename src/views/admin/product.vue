<script>
import { useRoute } from 'vue-router'
import { useProductsStore } from '../../stores/ProductsStore'

export default {
  data() {
    return {
      route: useRoute(),
      store: useProductsStore(),
    }
  },
  computed: {
    code() {
      return this.route.params.code
    },
    product() {
      console.log(this.store.getProductByCode(this.code))
      return this.store.getProductByCode(this.code)
    }
  },
  mounted() {
    console.log(this.route.params.code);
  },
}
</script>
<template>
  <h1>Producto</h1>
  <div class="containter">
    <h2>Código: {{ product.code }}</h2>
    <p class="fw-bold mt-2">Nombre: {{ product.name }}</p>
    <p class="fw-bold mt-2">Descripción: {{ product.description }}</p>

    <!-- Categorias -->
    <p class="fw-bold mt-2">Categorias:</p>
    <span>
      <ul>
        <li v-for="category of product.categories">{{ category.name }}</li>
      </ul>
    </span>

    <!-- Fotos -->
    <p class="fw-bold mt-2">Fotos:</p>
    <div class="galery d-flex">
      <div v-for="photo of product.photos" class="ms-3">
        <img :src="photo.img" :alt="photo.name" width="150" /><br>
        <span>{{ photo.name }}</span>
      </div>
    </div>

    <!-- Tarifas -->
    <p class="fw-bold mt-2">Tarifas:</p>
    <span>
      <ul>
        <li v-for="(price, index) of product.prices" :index="index">
          Desde: {{ new Date(price.start).toLocaleDateString() }} -
          Hasta: {{ new Date(price.end).toLocaleDateString() }}.
          Precio: {{ price.price }}€
        </li>
      </ul>
    </span>
  </div>
</template>