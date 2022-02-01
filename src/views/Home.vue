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
          <h3 class="mt-2 col col-12"><strong>Latest Products <i class="fas fa-plus-square"></i></strong></h3>
          <div v-for="product in this.$store.getters.getLatestProducts" :key="product.id" class="col-md-3 col-6">
            <v-card
              height="95%"
              :loading="loading"
              class="mx-auto my-12 overflow-hidden"
              max-width="374"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="50%"
                :src="product.get_image"
              ></v-img>

              <v-card-title class="overflow-hidden">{{ product.title }}</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                </v-row>

                <div class="my-4 text-subtitle-1">
                  {{ product.price }}LE • 
                </div>

                <!-- <div>{{ product.description }}</div> -->
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-2 white--text"
                  column
                >
                  <v-chip>{{ product.quantity_available }} piece</v-chip>
                  <v-chip>{{ product.status}}</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions class="pl-3">
                <v-btn
                  v-if="product.quantity_available"
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                  @click="reserve"
                >
                  <i class="fas fa-cart-plus"></i>
                </v-btn>
                <router-link :to="product.get_absolute_url" class="btn"><v-btn
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                  @click="reserve"
                >
                  <i class="fas fa-info-circle"></i>
                </v-btn></router-link>
              </v-card-actions>
            </v-card>
          </div>
          <v-divider class="mt-3"></v-divider>
          <h3 class="mt-2 col col-12"><strong>Our Products <i class="fas fa-ad"></i></strong></h3>
          <div v-for="product in this.$store.getters.getProducts" :key="product.id" class="col-md-3 col-6">
            <v-card
              height="95%"
              :loading="loading"
              class="mx-auto my-12 overflow-hidden"
              max-width="374"
            >
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img
                height="50%"
                :src="product.get_image"
              ></v-img>

              <v-card-title class="overflow-hidden">{{ product.title }}</v-card-title>

              <v-card-text>
                <v-row
                  align="center"
                  class="mx-0"
                >
                </v-row>

                <div class="my-4 text-subtitle-1">
                  {{ product.price }}LE • 
                </div>

                <!-- <div>{{ product.description }}</div> -->
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-2 white--text"
                  column
                >
                  <v-chip>{{ product.quantity_available }} piece</v-chip>
                  <v-chip>{{ product.status}}</v-chip>
                </v-chip-group>
              </v-card-text>

              <v-card-actions class="pl-3">
                <v-btn
                  v-if="product.quantity_available"
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                  @click="reserve"
                >
                  <i class="fas fa-cart-plus"></i>
                </v-btn>
                <router-link :to="product.get_absolute_url" class="btn"><v-btn
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                  @click="reserve"
                >
                  <i class="fas fa-info-circle"></i>
                </v-btn></router-link>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </v-container>
   </v-app>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default {
  name: 'Home',
  components: {
    
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
      }
    },
    mounted: function(){
      this.getLatestProducts();
      this.getProducts();
    }
}
</script>
