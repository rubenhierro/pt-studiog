import { defineStore } from "pinia";

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    products: JSON.parse(localStorage.getItem("products")) || [],
  }),
  getters: {
    getProduct: (state) => {
      return (id) => state.products.find((i, key) => key === id);
    },
    getProductByCode: (state) => {
      return (code) => state.products.find((i, key) => i.code === code);
    },
    getProductByName: (state) => {
      return (name) => state.products.find((i, key) => i.name === name);
    },
  },
  actions: {
    addProduct(product) {
      this.products = [...this.products, product];
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    editProduct(id, product) {
      this.products.splice(id, 1, product);
      localStorage.setItem("products", JSON.stringify(this.products));
    },
    deleteProduct(id) {
      this.products = this.products.filter((i, key) => key !== id);
      localStorage.setItem("products", JSON.stringify(this.products));
    },
  },
});
