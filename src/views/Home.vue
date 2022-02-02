<template>
   <v-app class='wrapper'>
    <v-carousel hide-delimiters cycle show-arrows-on-hover >
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        style="height: 100%; top:0"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>

     <v-container class="mt-3">
       <div class="row">
         <v-item-group>
            <v-subheader>Categories:</v-subheader>
            <v-item
              v-for="category in this.$store.getters.getCategories"
              :key="category.id"
              v-slot="{ active, toggle }"
            >
            <router-link :to="category.get_absolute_url" class="btn">
              <v-chip
                active-class="warning white--text"
                :input-value="active"
                @click="toggle"
              >
                {{ category.title }}
              </v-chip>
            </router-link>
            </v-item>
          </v-item-group>
       </div>
       <div class="row">
          <h3 class="mt-2 col col-12"><strong>Latest Products <i class="fas fa-plus-square"></i></strong></h3>
          <div v-for="product in this.$store.getters.getLatestProducts" :key="product.id" class="col-md-3 col-6">
            <ProductBox :product="product" />
          </div>
          <v-divider class="mt-3"></v-divider>
          <h3 class="mt-2 col col-12"><strong>Our Products <i class="fas fa-ad"></i></strong></h3>
          <div v-for="product in this.$store.getters.getProducts" :key="product.id" class="col-md-3 col-6">
            <ProductBox :product="product" />
          </div>
        </div>
      </v-container>
   </v-app>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import ProductBox from '@/components/ProductBox.vue';
export default {
  name: 'Home',
  components: {
    ProductBox
  },
   data () {
      return {
        items: [
          {
            src: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1581515286348-98549702050f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
          },
          {
            src: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1723&q=80',
          },
        ],
      loading: false,
      selection: 1,
      }
    },
    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      async getLatestProducts() {
        this.$store.commit('setIsLoading', true)
        const response = await AuthService.latestProducts();
        this.$store.commit('setIsLoading');
        this.$store.commit('SET_LATEST_PRODUCTS',response)

      },
      async getProducts(){
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.productsList();
        this.$store.commit('setIsLoading', false);
        this.$store.commit('SET_PRODUCTS', response)
      },
      async getCategories() {
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.categoryList();
        this.$store.commit('setIsLoading', false);
        this.$store.commit('SET_CATEGORIES', response)
      }
    },
    mounted: function(){
      this.getLatestProducts();
      this.getProducts();
      this.getCategories();
    }
}
</script>
