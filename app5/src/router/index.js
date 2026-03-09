import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Messenger from '../components/Messenger.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/messenger',
      component: Messenger,
    },
  ],
})

export default router
