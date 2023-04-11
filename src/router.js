import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Category from './views/Category.vue'

Vue.use(VueRouter)

const baseUrl = '/docs'
const routes = [{
  path: `${baseUrl}/`,
  name: 'home',
  component: Home
}, {
  path: `${baseUrl}/:id`,
  name: 'category',
  component: Category
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router