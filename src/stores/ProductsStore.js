import { defineStore } from "pinia";

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    products: JSON.parse(localStorage.getItem("products")) || [
      {
        code: "N234",
        name: "Nike Air",
        description: "zapatillas deportivas",
        photos: [],
        categories: [],
        prices: [],
      },
    ],
  }),
  getters: {},
  actions: {
    addProduct(product) {
      this.products = [...this.products, product];
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    editProduct(id, product) {
      this.products.splice(id, 1, product);
    },
    deleteProduct(id) {
      this.products = this.products.filter((i, key) => key !== id);
      localStorage.setItem("products", JSON.stringify(this.products));
    },
  },
});
