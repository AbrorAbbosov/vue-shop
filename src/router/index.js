import { createRouter, createWebHistory } from "vue-router";
import Checkout from "../Pages/Checkout.vue";
import CheckoutSuccess from "../Pages/CheckoutSuccess.vue";
import HomePage from "../views/HomePage.vue";
import ProductPage from "../Pages/ProductPage.vue";
import NotFoundPage from "../Pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/product/:id",
      component: ProductPage,
    },
    {
      path: "/checkout",
      component: Checkout,
    },
    {
      path: "/checkout/success",
      component: CheckoutSuccess,
    },
    {
      path: "/:notFound(.*)",
      component: NotFoundPage,
    },
  ],
});

export default router;
