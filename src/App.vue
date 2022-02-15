<template>
 <v-app>
    <v-navigation-drawer v-if="! this.$store.getters.getServerError" v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in getMenuItems()"
          :key="item.title"
          :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="this.$store.getters.isLoggedIn"
          key="logout"
           @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app  style="background-color:#eee">
      <span v-if="!this.$store.getters.getServerError" >
        <v-app-bar-nav-icon  @click="sidebar = !sidebar">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
       <v-divider
      class="mx-4"
      vertical
    ></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!this.$store.getters.getServerError"  style="background-color:#eee" class="hidden-xs-only">
         <!-- <form method="get" action="/#/searchfilters">
          <v-text-field
            hide-details
            single-line
            prepend-icon="mdi-magnify"
            class="mt-3 mr-3"
            name="query"
            placeholder="search for a product"
          >
          </v-text-field>
         </form> -->
        <v-btn
          text
          v-for="item in getMenuItems()"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          v-if="this.$store.getters.isLoggedIn"
          text
          key="logout"
          @click="logout">
          <v-icon left dark>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-main v-if="this.$store.getters.getServerError">
      <Page500/>
    </v-main>
    <v-main v-else>
      
      <router-view></router-view>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import Footer from '@/components/Footer.vue';
import Page500 from '@/views/Page500.vue';
export default {
  name: 'App',
  components: {
    Footer,
    Page500
  },
  data(){
    return {
      appTitle: 'Store App',
      sidebar: false,
      serverError:this.$store.getters.getServerError,
    }
  },
  methods:{
    getMenuItems(){
      if (this.$store.getters.isLoggedIn){
        if(this.$store.getters.getUser.is_staff){
          return [
          { title: 'Home', path: '/', icon: 'home' },
          { title: `${this.$store.getters.getUser.username}`, path: '/account', icon: 'face' },
          { title: 'Sales', path: '/sales', icon:'mdi-currency-usd'},
          { title: 'Search', path: '/searchfilters', icon:'mdi-magnify'},
          { title: 'changes log', path: '/changeslog', icon:'mdi-delta'},
        ]
        }
        return [
          { title: 'Home', path: '/', icon: 'home' },
          { title: 'Search', path: '/searchfilters', icon:'mdi-magnify'},
          { title: `${this.$store.getters.getUser.username}`, path: '/account', icon: 'face' },
          { title: 'Cart', path: '/cart', icon: 'mdi-cart' },

        ]
      }else{
        return [
          { title: 'Home', path: '/', icon: 'home' },
          { title: 'Search', path: '/searchfilters', icon:'mdi-magnify'},
          { title: 'SignUp', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' },
          { title: 'Cart', path: '/cart', icon: 'mdi-cart' },
        ] 
      }
    },
    async logout() {
      const response = await AuthService.logout(this.$store.getters.getRefreshToken);
      // this.$store.dispatch('changeMsgValue', response.msg)
      this.$store.dispatch('logout', response);
      this.$router.push('/signin');
    },
  },
  mounted:function(){
    this.$store.commit('setServerError', false)
    this.$store.dispatch('accessToken');
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.vue-bg {
  background: #bce5d0;
}
</style>