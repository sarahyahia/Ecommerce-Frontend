// store/index.js
 
import Vue from "vue";
import Vuex from "vuex";
import Axios from 'axios';
import addSeconds from "date-fns/addSeconds";
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

const getDefaultState = () => {
    return {
      token: {},
      tokenExpiry:'',
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
      salesByProduct:[],
      serverError:false,
    };
  };

const store = new Vuex.Store({
 strict: true,
 plugins: [createPersistedState()],
 state: getDefaultState(),
 getters: {
    isLoggedIn(state){
      return state.token.access;
    },
    getRefreshToken(state){
      return state.token.refresh;
    },
    getTokenExpiry(state){
      return state.tokenExpiry
    },
    getIsLoading: state => {
      return state.isLoading
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
    },
    getSalesByProducts: state => {
      return state.salesByProduct
    },
    getServerError:state => {
      return state.serverError
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
    SET_ACCESS_TOKEN(state, accessToken) {
      state.tokenExpiry = addSeconds(new Date(), 5*60)

      state.token.access = accessToken
    },
    SET_TOKEN: (state, token) => {
      state.tokenExpiry = addSeconds(new Date(), 5*60)
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
    setIsLoading: (state, isLoading) => {
      state.isLoading = isLoading ;
    },
    setServerError: (state,serverError)=>{
      state.serverError = serverError ;
      // state.user = {}
      // state.token = ''
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
    },
    SET_SALES_BY_PRODUCT(state,salesByProduct){
      state.salesByProduct = salesByProduct
    }
 },
 actions: {
    increment (context) {
      context.commit('increment')
    },
    login: ({ commit }, { jwt_token, user, msg }) => {
        commit('SET_TOKEN', jwt_token);
        commit('SET_USER', user);
        commit('changeMsgValue', msg)
        // set auth header
        Axios.defaults.headers.common['Authorization'] = `Bearer ${jwt_token.access}`;
    },
    logout: ({ commit }, { msg })=>{
      commit('RESET');
      commit('changeMsgValue', msg)
    },
    search: ({ commit },{products})=>{
      commit('SET_PRODUCTS',products);
    },
    accessToken:({ commit}, {access})=>{
      commit('SET_ACCESS_TOKEN',access)
    }
 }
});

export default store