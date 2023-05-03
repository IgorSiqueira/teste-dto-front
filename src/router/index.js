import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'CategoryIndex',
      component: () => import('../views/categories/CategoryIndex.vue')
    },
    {
      path: '/categories/create',
      name: 'CategoryCreate',
      component: () => import('../views/categories/CategoryCreate.vue')
    },
    {
      path: '/categories/:id/edit',
      name: 'CategoryEdit',
      component: () => import('../views/categories/CategoryEdit.vue'),
      props: true
    },
    {
      path: '/products',
      name: 'ProductIndex',
      component: () => import('../views/products/ProductIndex.vue')
    },
    {
      path: '/products/create',
      name: 'ProductCreate',
      component: () => import('../views/products/ProductCreate.vue')
    },
    {
      path: '/products/:id/edit',
      name: 'ProductEdit',
      component: () => import('../views/products/ProductEdit.vue'),
      props: true
    }
  ]
})

export default router
