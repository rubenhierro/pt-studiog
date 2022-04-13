import { defineStore } from "pinia";

export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => ({
    categories: JSON.parse(localStorage.getItem("categories")) || [],
  }),
  getters: {
    getParentCategoriesFiltered: (state) => (name) => state.categories.filter((i) => i.isChild === false && i.name !== name),
    getParentCategories: (state) =>
      state.categories.filter((i) => i.isChild === false),
    getCategory: (state) => {
      return (name) => state.categories.find((i, key) => i.name === name);
    },
  },
  actions: {
    addCategory(category) {
      this.categories = [...this.categories, category];
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    editCategory(id, category) {
      this.categories.splice(id, 1, category);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    deleteCategory(id) {
      this.categories = this.categories.filter((i, key) => key !== id);
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
  },
});
