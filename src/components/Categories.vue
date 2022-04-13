<script>
import { useCategoriesStore } from '../stores/CategoriesStore'

export default {
  emits: ['addCategory'],
  data() {
    return {
      store: useCategoriesStore(),
      category: null,
    }
  },
  computed: {
    categories() {
      return this.store.categories
    }
  },
  methods: {
    addCategory() {
      if (this.category) {
        const category = this.store.getCategory(this.category)
        this.$emit('addCategory', category)
        this.category = null
        document.getElementById('formCategory').reset()
      }
    },
  }
}
</script>
<template>
  <form id="formCategory" @submit.prevent="addCategory">
    <div>
      <select class="form-select" aria-label="Default select example" v-model="category">
        <option selected>Seleccionar categoría</option>
        <option v-for="(category, index) of categories" :index="index" :value="category.name" :selected="{ true: category.name === category }">{{
            category.name
          }}
        </option>
      </select>
    </div>
    <div class="col pt-3 text-right">
      <button class="p-2 px-4 btn btn-primary shadow-lg">Guardar</button>
    </div>
  </form>
</template>