import { defineStore } from "pinia";

export const useCategoriesStore = defineStore({
  id: "categories",
  state: () => ({
    categories: JSON.parse(localStorage.getItem("categories")) || [
      {
        code: "c1",
        name: "zapatos",
        description: "categoria ppal de zapatos",
        isChild: false,
        parentCategory: null,
      },
      {
        code: "c2",
        name: "pantalones",
        description: "categoria ppal de pantalones",
        isChild: false,
        parentCategory: null,
      },
    ],
  }),
  getters: {
    getParentCategories: (state) =>
      state.categories.filter((i) => i.isChild === false),
    getCategory: (state) => {
      return (id) => state.categories.find((i, key) => key === id)
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
