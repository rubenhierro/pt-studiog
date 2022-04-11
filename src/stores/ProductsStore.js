import { defineStore } from "pinia";

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    categories: JSON.parse(localStorage.getItem("products")) || [
      {
        code: "N234",
        name: "Nike Air",
        description: "zapatillas deportivas",
        photos: null,
        categories: null,
        prices: null,
      },
    ],
  }),
  getters: {},
  actions: {},
});
