import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import AddProductView from '@/views/AddProductView.vue'
import ProductView from '@/views/ProductView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/add-product',
    name: 'add-product',
    component: AddProductView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
