import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Accordion from '@/views/Accordion.vue'
import Form from '@/views/Form.vue'
import Modal from '@/views/Modal.vue'
import Tab from '@/views/Tab.vue'
import Toast from '@/views/Toast.vue'
import Tooltip from '@/views/Tooltip.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/accordion',
      name: 'Accordion',
      component: Accordion
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/accordion',
      name: 'Accordion',
      component: Accordion
    },
    {
      path: '/tab',
      name: 'Tab',
      component: Tab
    },
    {
      path: '/toast',
      name: 'Toast',
      component: Toast
    },
    {
      path: '/tooltip',
      name: 'Tooltip',
      component: Tooltip
    },
  ]
})

export default router
