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
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('../views/auth/LoginView.vue'),
      },
      {
        path: '/auth/register',
        name: 'Register',
        component: () => import('../views/auth/RegisterView.vue'),
      },
      {
        path: '/auth/confirm-email',
        name: 'ConfirmEmail',
        component: () => import('../views/auth/ConfirmEmailView.vue'),
      },
      {
        path: '/auth/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/auth/ForgotPasswordView.vue'),
      },
      {
        path: '/auth/reset-password',
        name: 'ResetPassword',
        component: () => import('../views/auth/ResetPasswordView.vue'),
      },
      {
        path: '/user/dashboard',
        name: 'UserDashboard',
        component: () => import('../views/user/DashboardView.vue'),
      },
      {
        path: '/user/orders',
        name: 'UserOrders',
        component: () => import('../views/user/OrdersView.vue'),
      },
      {
        path: '/user/orders/:id',
        name: 'OrderDetail',
        component: () => import('../views/user/OrderDetailView.vue'),
      },
      {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('../views/user/ProfileView.vue'),
      },
      {
        path: '/user/wishlist',
        name: 'UserWishlist',
        component: () => import('../views/user/WishlistView.vue'),
      },
      {
        path: '/user/loyalty',
        name: 'UserLoyalty',
        component: () => import('../views/user/LoyaltyView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
