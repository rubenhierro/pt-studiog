<script>
import { useRoute } from 'vue-router'
import { useProductsStore } from '../../stores/ProductsStore'
import { PDFExport, savePDF } from "@progress/kendo-vue-pdf";

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
      return this.store.getProductByCode(this.code)
    }
  },
  methods: {
    exportPDFWithMethod: function () {
      savePDF(this.$refs.container, {
        paperSize: "A4",
        margin: 40,
        fileName: `Producto-${this.code}`
      });
    },
  }
}
</script>
<template>
  <h1>Producto</h1>
  <div class="containter" ref="container">
    <h2>{{ product.code }}</h2>
    <p class="mt-2"><span class="fw-bold">Nombre: </span>{{ product.name }}</p>
    <p class="mt-2"><span class="fw-bold">Descripción: </span>{{ product.description }}</p>

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
  <button class="btn btn-primary text-end" @click="exportPDFWithMethod">Descargar PDF</button>
</template>