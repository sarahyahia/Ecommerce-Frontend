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
    }
  },
 mutations: {
    changeUsernameValue(state, username) {
      state.user.username = username
    },
    changeMsgValue(state, msg) {
      state.msg = msg
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