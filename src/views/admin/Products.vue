<script>
import Photos from '../../components/Photos.vue'
import Categories from '../../components/Categories.vue'
import Prices from '../../components/Prices.vue'
import Product from '../../classes/product'
import { useProductsStore } from '../../stores/ProductsStore'
import List from '../../components/List.vue'
import RouterService from '../../services/RouterService'
import { useRouter } from 'vue-router'
import router from '../../router'
import { saveExcel } from '@progress/kendo-vue-excel-export'

export default {
  components: { Photos, Categories, Prices, List },
  data() {
    return {
      store: useProductsStore(),
      router: useRouter(),
      routerService: new RouterService(),
      code: null,
      name: null,
      description: null,
      photos: [],
      categories: [],
      prices: [],
      defaultPrice: null,
      preview: false,
      isEditing: false,
      currentProduct: null,
      currentPhoto: null
    }
  },
  computed: {
    products() {
      return this.store.products
    }
  },
  methods: {
    exportExcel() {
      saveExcel({
        data: this.products,
        fileName: "products.xlsx",
        columns: [
          { field: 'code', title: 'Codigo' },
          { field: 'name', title: 'Nombre' },
          { field: 'description', title: 'Descripcion' },
          { field: 'defaultPrice', title: 'Precio por defecto' },
        ]
      });
    },
    viewProduct(id) {
      this.currentProduct = id
      this.code = this.store.products[id].code
      this.name = this.store.products[id].name
      const slug = this.routerService.getSlug(this.name)
      router.push(`/admin/productos/${this.code}/${slug}`)
    },
    updateCollection() {
      const product = new Product(
        this.code,
        this.name,
        this.description,
        this.photos,
        this.categories,
        this.prices,
        this.defaultPrice
      )
      this.store.editProduct(this.currentProduct, product)
    },
    addProduct() {
      const product = new Product(
        this.code,
        this.name,
        this.description,
        this.photos,
        this.categories,
        this.prices,
        this.defaultPrice
      )
      !this.isEditing
        ? this.store.addProduct(product)
        : this.store.editProduct(this.currentProduct, product)
      this.code = null
      this.name = null
      this.description = null
      this.photos = []
      this.categories = []
      this.prices = []
      this.defaultPrice = null
      this.isEditing = false
    },
    editProduct(id) {
      this.isEditing = true
      this.code = this.store.products[id].code
      this.name = this.store.products[id].name
      this.description = this.store.products[id].description
      this.photos = this.store.products[id].photos
      this.categories = this.store.products[id].categories
      this.prices = this.store.products[id].prices
      this.defaultPrice = this.store.products[id].defaultPrice
      this.currentProduct = id
    },
    deleteProduct(id) {
      this.store.deleteProduct(id)
    },
    addCategory(category) {
      this.categories.push(category)
      if (this.isEditing)
        this.updateCollection
    },
    deleteCategory(id) {
      this.categories = this.categories.filter((i, key) => key !== id)
      if (this.isEditing)
        this.updateCollection
    },
    addPhoto(photo) {
      this.photos.push(photo)
      if (this.isEditing)
        this.updateCollection
    },
    deletePhoto(id) {
      this.photos = this.photos.filter((i, key) => key !== id)
      if (this.isEditing)
        this.updateCollection
    },
    previewPhoto(id) {
      this.preview = true
      this.currentPhoto = this.photos[id]
    },
    addPrice(price) {
      this.prices.push(price);
      if (this.isEditing)
        this.updateCollection
    },
    deletePrice(id) {
      this.prices = this.prices.filter((i, key) => key !== id)
      if (this.isEditing)
        this.updateCollection
    }
  },
}
</script>
<template>
  <div class="container">
    <h1>Admin Productos</h1>
  </div>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="card-title">Nuevo producto</div>
          <span v-if="isEditing" class="text-danger">Editar producto</span>
          <form @submit.prevent="addProduct">
            <!-- code -->
            <div class="col-md-6 pt-3">
              <input type="text" id="codeInput" v-model="code" placeholder="Código" required />
            </div>

            <!-- name -->
            <div class="col-md-6 pt-3">
              <input type="text" id="nameInput" v-model="name" placeholder="Nombre" required />
            </div>

            <!-- description -->
            <div class="col-md-6 pt-3">
              <textarea id="description" v-model="description" placeholder="Descripción del producto..."></textarea>
            </div>

            <!-- default price -->
            <div class="col-md-6 pt-3">
              <input type="number" id="defaultPriceInput" v-model="defaultPrice" placeholder="Precio por defecto"
                required />
            </div>

            <!-- Categories -->
            <p class="mt-3">Categorias</p>
            <div class="collection">
              <ul v-if="categories.length">
                <li v-for="(category, index) of categories" :index="index">
                  {{ category.name }}
                  <span class="text-danger btn" @click="deleteCategory(index)">[Eliminar]</span>
                </li>
              </ul>
              <Categories @addCategory="addCategory" />
            </div>

            <!-- Photos -->
            <p class="mt-3">Fotos</p>
            <div class="collection">
              <ul v-if="photos.length">
                <li v-for="(photo, index) of photos" :index="index">
                  {{ photo.name }}
                  <span class="text-primary btn" @click="previewPhoto(index)">[Vista previa]</span>
                  <span class="text-danger btn" @click="deletePhoto(index)">[Eliminar]</span>
                </li>
              </ul>
              <div v-if="preview" class="ms-3 mb-3 border border-2 p-2">
                <p class="card-title">{{ currentPhoto.name }}</p>
                <img id="preview" :src="currentPhoto.img" :alt="currentPhoto.name" width="150" />
                <p class="text-danger btn" @click="this.preview = false">[Cerrar]</p>
              </div>
              <Photos @addPhoto="addPhoto" />
            </div>

            <!-- Prices -->
            <p class="mt-3">Tarifas</p>
            <div class="collection">

              <ul v-if="prices.length">
                <li v-for="(price, index) of prices" :index="index">
                  Desde: {{ new Date(price.start).toLocaleDateString() }} -
                  Hasta: {{ new Date(price.end).toLocaleDateString() }}.
                  Precio: {{ price.price }}€
                  <span class="text-danger btn" @click="deletePrice(index)">[Eliminar]</span>
                </li>
              </ul>
              <Prices @addPrice="addPrice" />
            </div>

            <!-- button -->
            <div class="col pt-3 text-right">
              <button class="p-2 px-4 btn btn-primary shadow-lg">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col">
      <List :name="'Productos'" :list="products" :properties="[
        { display: 'Código', value: 'code' },
        { display: 'Nombre', value: 'name' },
        { display: 'Descripción', value: 'description' },
      ]" :buttons="{ view: true, edit: true, delete: true }" @view="viewProduct" @edit="editProduct"
        @delete="deleteProduct" />
        <button class="btn btn-primary text-end" @click="exportExcel">Descargar Excel</button>
    </div>
  </div>
</template>
<style>
.collection {
  background-color: lightgray;
  margin-left: 20px;
  padding: 20px;
}
</style>