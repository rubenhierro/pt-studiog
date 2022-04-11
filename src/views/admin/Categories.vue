<script>
import Category from '../../classes/category'
import { useCategoriesStore } from '../../stores/CategoriesStore'

export default {
  data() {
    return {
      store: useCategoriesStore(),
      code: null,
      name: null,
      description: null,
      isChild: false,
      parentCategory: null,
      isEditing: false,
      currentCategory: null
    }
  },
  computed: {
    categories() {
      return this.store.getCategories
    }
  },
  methods: {
    addCategory() {
      const category = new Category(
        this.code, this.name, this.description, this.isChild, this.parentCategory
      )
      console.log(category);
      !this.isEditing
        ? this.store.addCategory(category)
        : this.store.editCategory(this.currentCategory, category)
      this.code = null
      this.name = null
      this.description = null
      this.isChild = false
      this.parentCategory = null
      this.isEditing = false
    },
    editCategory(id) {
      this.isEditing = true
      this.code = this.store.categories[id].code
      this.name = this.store.categories[id].name
      this.description = this.store.categories[id].description
      this.isChild = this.store.categories[id].isChild
      this.currentCategory = id
    },
    deleteCategory(id) {
      this.store.deleteCategory(id)
    }
  }
}
</script>
<template>
  <div class="container">
    <h1>Admin Categorías</h1>
  </div>
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <div class="card-title">Nueva categoría</div>
          <form @submit.prevent="addCategory">
            <div class="col-md-6 pt-3">
              <input type="text" id="codeInput" v-model="code" placeholder="Código" />
            </div>
            <div class="col-md-6 pt-3">
              <input type="text" id="nameInput" v-model="name" placeholder="Nombre" />
            </div>
            <div class="col-md-6 pt-3">
              <textarea id="description" v-model="description" placeholder="Descripción de la categoría..."></textarea>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="isChild" id="flexCheckDefault">
              <label class="form-check-label" for="flexCheckDefault">
                Subcategoría
              </label>
            </div>
            <div v-if="isChild" class="col-md-6 pt-3">
              <select class="form-select" aria-label="Default select example" v-model="parentCategory">
                <option selected>Categoría padre</option>
                <option v-for="(category, index) of categories" :index="index" :value="category.code">{{ category.name }}
                </option>
              </select>
            </div>
            <div class="col pt-3 text-right">
              <button class="p-2 px-4 btn btn-primary shadow-lg">Crear categoría</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>