import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
// import Home from './views/Home--problem-1.vue'
// import Home from './views/Home--problem-2.vue'
// next: CategoryCard--problem-3
// import Home from './views/Home--problem-7.vue'
// import Home from './views/Home--problem-8.vue'
// import Home from './views/Home--problem-9.vue'
// import Home from './views/Home--problem-10.vue'

Vue.use(VueRouter)

const baseUrl = ''
const routes = [{
  path: `${baseUrl}/`,
  name: 'home',
  component: Home
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router