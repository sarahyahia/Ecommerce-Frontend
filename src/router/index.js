import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import Computed from '../views/Computed.vue'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
// import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Account from '../views/Account.vue'
import Sales from '../views/Sales.vue'
import SearchFilters from '../views/SearchFilters.vue'
import Page500 from '../views/Page500.vue'
// import PageNotFound from '../views/PageNotFound'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: Search
  // },
  {
    path: '/500',
    name: 'Page500',
    component: Page500
  },
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
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/searchfilters',
    name: 'SearchFilters',
    component: SearchFilters
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/:category_slug/:product_slug',
    name: 'Product',
    component: Product
  },
  {
    path: '/:category_slug/',
    name: 'Category',
    component: Category
  },
  // {
  //   path: '*',
  //   name: 'PageNotFound',
  //   component: PageNotFound
  // },
]

const router = new VueRouter({
  routes
})

export default router
