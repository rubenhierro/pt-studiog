<script>
import Category from '../../classes/category'
import { useCategoriesStore } from '../../stores/CategoriesStore'
import List from '../../components/List.vue'

export default {
  components: { List },
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
      return this.store.categories
    },
    parentCategories() {
      return this.store.getParentCategories
    },
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
      this.parentCategory = this.store.categories[id].parentCategory
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
          <span v-if="isEditing" class="text-danger">Editar categor</span>
          <form @submit.prevent="addCategory">
            <div class="col-md-6 pt-3">
              <input type="text" id="codeInput" v-model="code" placeholder="Código" required />
            </div>
            <div class="col-md-6 pt-3">
              <input type="text" id="nameInput" v-model="name" placeholder="Nombre" required />
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
                <option v-for="(category, index) of parentCategories" :index="index" :value="category.name"
                  :selected="{ true: category.name === parentCategory }">{{
                    category.name
                  }}
                </option>
              </select>
            </div>
            <div class="col pt-3 text-right">
              <button class="p-2 px-4 btn btn-primary shadow-lg">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col">
      <List :name="'Categorías'" :list="categories" :properties="[
        { display: 'Código', value: 'code' },
        { display: 'Nombre', value: 'name' },
        { display: 'Descripción', value: 'description' },
        { display: 'Categoría padre', value: 'parentCategory' }
      ]" :buttons="{ edit: true, delete: true }" @edit="editCategory" @delete="deleteCategory" />
    </div>
  </div>
</template>