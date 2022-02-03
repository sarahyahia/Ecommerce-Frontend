<template>
 <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app  style="background-color:#eee">
      <span >
        <v-app-bar-nav-icon @click="sidebar = !sidebar">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items  style="background-color:#eee" class="hidden-xs-only">
         <form method="get" action="/#/search">
          <v-text-field
            hide-details
            single-line
            prepend-icon="mdi-magnify"
            class="mt-3 mr-3"
            name="query"
            placeholder="search for a product"
          >
          </v-text-field>
         </form>
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view>
    </v-main>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  
  },
  data(){
    return {
      appTitle: 'Store App',
      sidebar: false,
      menuItems: [
          { title: 'Home', path: '/', icon: 'home' },
          { title: 'SignUp', path: '/signup', icon: 'face' },
          { title: 'Sign In', path: '/signin', icon: 'lock_open' },
          { title: 'Cart', path: '/cart', icon: 'mdi-cart' },
     ]
    }
  },
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