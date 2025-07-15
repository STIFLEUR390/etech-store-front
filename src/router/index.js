import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutEKeyMarket from '../components/LayoutEKeyMarket.vue'

const routes = [
  {
    path: '/',
    component: LayoutEKeyMarket,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('../views/CategoriesView.vue'),
      },
      {
        path: 'produit/:id',
        name: 'ProductDetail',
        component: () => import('../views/ProductDetail.vue'),
      },
      {
        path: '/panier',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/CheckoutView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
