import { defineStore } from "pinia";

export const useOrdersStore = defineStore({
  id: "orders",
  state: () => ({
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  }),
  getters: {},
  actions: {
    addOrder(order) {
      this.orders = [...this.orders, order];
      localStorage.setItem("orders", JSON.stringify(this.orders));
    },
    editOrder(id, order) {
      this.orders.splice(id, 1, order);
      localStorage.setItem("orders", JSON.stringify(this.orders));
    },
    deleteOrder(id) {
      this.orders = this.orders.filter((i, key) => key !== id);
      localStorage.setItem("orders", JSON.stringify(this.orders));
    },
  },
});
