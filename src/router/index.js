import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import Computed from '../views/Computed.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/signup',
    name: 'SignupForm',
    component: SignupForm
  },
  {
    path: '/computed',
    name: 'Computed',
    component: Computed
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: Product
  },
  {
    path: '/:category_slug',
    name: 'Category',
    component: Category
  }
]

const router = new VueRouter({
  routes
})

export default router
