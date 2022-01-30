// store/index.js
 
import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
 state: {
    user: {
        username: 'matt',
        fullName: 'Matt Maribojoc'
    },
    count: 0,
      
 },
 getters: {},
 mutations: {
    changeUsernameValue(state, username) {
        state.user.username = username
    },
    increment (state) {
        state.count++
    },
 },
 actions: {
    increment (context) {
      context.commit('increment')
    }
 }
});