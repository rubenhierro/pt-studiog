import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/admin/Register.vue"),
      meta: {
        requiresSuperAuth: true,
      },
    },
    {
      path: "/admin/categorias",
      name: "categories",
      component: () => import("@/views/admin/Categories.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin/productos",
      name: "products",
      component: () => import("@/views/admin/Products.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    // {
    //   path: "/admin/pedidos",
    //   name: "orders",
    //   component: orders,
    //   meta: {
    //     requiresAuth: true,
    //   },
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

// router.beforeEach((to, from) => {
//   if (to.meta.requiresAuth && !JSON.parse(localStorage.getItem("isLogged"))) {
//     return { name: "login" };
//   }
//   if (
//     to.meta.requiresSuperAuth &&
//     !JSON.parse(localStorage.getItem("isSuperUser"))
//   ) {
//     return { name: "login" };
//   }
// });
export default router;
