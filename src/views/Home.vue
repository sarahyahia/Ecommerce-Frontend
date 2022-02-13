<template>
   <v-app class='wrapper'>
    <!-- <div class="row h-4 m-5" v-if="this.$store.getters.getIsLoading" > Loading ...</div> -->
    <div  >
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
            <v-subheader></v-subheader>
            <v-item
              v-for="category,i in this.$store.getters.getCategories"
              :key="i*2+100"
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
              <v-chip v-if="this.$store.getters.getUser.is_staff">
                <AddCategory :getCategories="this.getCategories" />
              </v-chip>
          </v-item-group>
       </div>
       <div class="row">
         <hr class="my-3">
          <h3 class="mt-2 col col-12"><strong>Latest Products <i class="fas fa-plus-square"></i></strong></h3>
          <div v-for="product,i in this.$store.getters.getLatestProducts" :key="i*3" class="col-md-2 col-4">
            <ProductBox :product="product" />
          </div>
          <v-divider class="mt-3"></v-divider>
          <h3 class="mt-2 col col-12"><strong>Top 10 Best Products <i class="fas fa-plus-square"></i></strong></h3>
          <Slider :products="this.$store.getters.getSalesByProducts"/>
          <hr class="my-3">
          <h3 class="mt-3 col col-12 "><strong>Our Products <i class="fas fa-ad"></i></strong></h3>
          <v-item-group>
            <v-chip v-if="this.$store.getters.getUser.is_staff">
              <AddProduct />
            </v-chip>
          </v-item-group>
          <div v-for="product, i in this.$store.getters.getProducts.results" :key="i+2000" class="col-md-2 col-4 m-0">
            <ProductBox :product="product" />
          </div>
          <div class="text-right">
            <v-pagination
              v-model="page"
              :length="pages"
              circle
              color="purple white--text"
              @input="handlePageChange"
              class="mb-5"
            ></v-pagination>
          </div>
        </div>
      </v-container>
      </div>
   </v-app>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import ProductBox from '@/components/ProductBox.vue';
import AddCategory from '@/components/AddCategory.vue';
import AddProduct from '@/components/AddProduct.vue';
import Slider from '@/components/Slider.vue';
export default {
  name: 'Home',
  components: {
    ProductBox,
    AddCategory,
    AddProduct,
    Slider
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
      page: 1,
      pages:1,
      // i:10,
      top10products: []
      }
    },
    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
      async getLatestProducts() {
        

        this.$store.commit('setIsLoading',true)
        const response = await AuthService.latestProducts();
          this.$store.commit('setIsLoading',false);
        if(response.response){
          alert(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);

        }
        this.$store.commit('setServerError', false)
        this.$store.commit('SET_LATEST_PRODUCTS',response)

      },
      async getProducts(){
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.productsList();
          this.$store.commit('setIsLoading',false);
        if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
        this.$store.commit('SET_PRODUCTS', response)
      },
      async getCategories() {
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.categoryList();
        this.$store.commit('setIsLoading',false);
        if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
        this.$store.commit('SET_CATEGORIES', response)
      },
      async handlePageChange(){
        console.log(this.page)
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.productsList(this.page);
        this.$store.commit('setIsLoading',false);
        if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
        this.$store.commit('SET_PRODUCTS', response)
      },
      async getSalesByProduct() {
          this.$store.commit('setIsLoading',true)
          const token = this.$store.getters.isLoggedIn
          let response = await AuthService.salesByProduct(token);
          this.$store.commit('setIsLoading',false);
          if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
          this.$store.commit('SET_SALES_BY_PRODUCT',response)
          this.top10products = this.$store.getters.getSalesByProduct
      }
    },
    mounted: function(){
      this.getLatestProducts();
      this.getProducts();
      this.getCategories();
      this.getSalesByProduct();
      const count = this.$store.getters.getProducts.count
      if (count%6){
        this.pages = parseInt(count/6 +1)
      }else{
        this.pages = parseInt(count/6);
      }
    },
    computed: {
      columns() {
        if (this.$vuetify.breakpoint.xl) {
          return 4;
        }

        if (this.$vuetify.breakpoint.lg) {
          return 3;
        }

        if (this.$vuetify.breakpoint.md) {
          return 2;
        }

        return 1;
      },

    },
}
</script>
