<script>
import Photos from '../../components/Photos.vue'
import Categories from '../../components/Categories.vue'
import Prices from '../../components/Prices.vue'
import Product from '../../classes/product'
import { useProductsStore } from '../../stores/ProductsStore'
import List from '../../components/List.vue'

export default {
  components: { Photos, Categories, Prices, List },
  data() {
    return {
      store: useProductsStore(),
      code: null,
      name: null,
      description: null,
      photos: [],
      categories: [],
      prices: [],
      preview: false,
      isEditing: false,
      currentProduct: null
    }
  },
  computed: {
    products() {
      return this.store.products
    }
  },
  methods: {
    addProduct() {
      const product = new Product(
        this.code,
        this.name,
        this.description,
        this.photos,
        this.categories,
        this.prices
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
      this.currentProduct = id
    },
    deleteProduct(id) {
      this.store.deleteProduct(id)
    },
    addCategory(category) {
      this.categories.push(category)
    },
    deleteCategory(id) {
      this.categories = this.categories.filter((i, key) => key !== id)
    },
    addPhoto(photo) {
      this.photos.push(photo)
    },
    deletePhoto(id) {
      this.photos = this.photos.filter((i, key) => key !== id)
    },
    previewPhoto(id) {
      this.preview = true
      const img = this.photos[id].img
      document.getElementById('preview').setAttribute('src', '')
      document.getElementById('preview').setAttribute('src', img)
    },
    addPrice(price) {
      this.prices.push(price);
    },
    deletePrice(id) {
      this.prices = this.prices.filter((i, key) => key !== id)
    }
  },
}
</script>
<template>
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

            <!-- Cagegories -->
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
              <div v-if="preview">
                <div class="card">
                  <div class="card-content">
                    <img id="preview" src="" alt="Vista previa" width="150" />
                    <p class="text-danger btn" @click="this.preview = false">[Cerrar]</p>
                  </div>
                </div>
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
      ]" :buttons="{ edit: true, delete: true }" @edit="editProduct" @delete="deleteProduct" />
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