// store/index.js
 
import Vue from "vue";
import Vuex from "vuex";
import Axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const getDefaultState = () => {
    return {
      token: '',
      user: {},
      count: 0,
      msg:'',
      latestProducts: [],
      products: [],
      product:{},
      isLoading:false,
      categories:[],
      category:{},
      cart: {
        items: [],
      },
      orders: [],
      salesByCategory:[],
      salesByVendor:[],
    };
  };

export default new Vuex.Store({
 strict: true,
 plugins: [createPersistedState()],
 state: getDefaultState(),
 getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    getLatestProducts: state => {
      return state.latestProducts;
    },
    getProducts: state => {
      return state.products;
    },
    getProduct: state => {
      return state.product;
    },
    getCategories: state => {
      return state.categories
    },
    getCategory: state => {
      return state.category
    },
    getCart: state => {
      return state.cart
    },
    getOrders: state => {
      return state.orders
    },
    getSalesByCategory: state => {
      return state.salesByCategory
    },
    getSalesByVendor: state => {
      return state.salesByVendor
    }    
  },
 mutations: {
    changeUsernameValue(state, username) {
      state.user.username = username
    },
    changeMsgValue(state, msg) {
      state.msg = msg
      setTimeout(state.msg ='', 5000)
    },
    increment (state) {
        state.count++
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_USER: (state, user) => {
        state.user = user;
    },
    RESET: state => {
        Object.assign(state, getDefaultState());
    },
    SET_LATEST_PRODUCTS(state, latestProducts){
      state.latestProducts = latestProducts
    },
    SET_PRODUCTS(state, products){
      state.products = products
    },
    SET_PRODUCT(state, product){
      state.product = product
    },
    setIsLoading: state=>{
      state.isLoading == true?false:true ;
    },
    SET_CATEGORIES(state,categories) {
      state.categories=categories;
    },
    SET_CATEGORY(state,category) {
      state.category=category;
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, item) {
      const exists = state.cart.items.filter(function(ele){ 
        return ele != item; })
      state.cart.items = exists      
    },
    clearCart(state) {
      state.cart = { items: [] }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    SET_ORDERS(state, orders){
      state.orders = orders
    },
    SET_SALES_BY_CATEGORY(state,salesByCategory){
      state.salesByCategory= salesByCategory
    },
    SET_SALES_BY_VENDOR(state,salesByVendor){
      state.salesByVendor= salesByVendor
    }
 },
 actions: {
    increment (context) {
      context.commit('increment')
    },
    login: ({ commit }, { token, user, msg }) => {
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
        commit('changeMsgValue', msg)
        // set auth header
        Axios.defaults.headers.common['Authorization'] = `token ${token}`;
    },
    logout: ({ commit }, { msg })=>{
      commit('RESET');
      commit('changeMsgValue', msg)
    },
    search: ({ commit },{products})=>{
      commit('SET_PRODUCTS',products);
    }
 }
});