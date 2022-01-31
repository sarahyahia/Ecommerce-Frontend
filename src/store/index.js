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
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({ commit }, { msg })=>{
      commit('RESET');
      commit('changeMsgValue', msg)
    }
 }
});