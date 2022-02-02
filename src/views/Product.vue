<template>
<div>
    <v-spacer></v-spacer>
    <v-container>
        <p v-if="this.$store.state.isLoading">Loading...</p>
    <v-row class="d-flex">
        <v-col
            key="n"
            class="d-flex child-flex"
            cols="6"
            style="height: auto;"
        >
            <v-img
                :src="product.get_image"
                aspect-ratio="1"
                class="grey lighten-2"
                style="{height: auto; width: auto; max-height:100%; max-width: 100%}"
            ></v-img>
        </v-col>
        <v-col
            col="2"
        ></v-col>
        <v-col
            class="d-flex child-flex"
            cols="4"
        >
        <v-card
            class="mx-auto"
            max-width="344"
        >
            <v-card-text class="float-left">
            <div></div>
            <p class="text-h4 text--primary">
                {{product.title}}
            </p>
            <div class="m-3 text-h6 text--primary">
               <strong>Price:</strong> <strong style="color:purple"> {{ product.price }}LE </strong> 
            </div>
            <p class="text--primary">
                <strong>Product Details:</strong> {{product.description}}
            </p>
            <p class="text--primary">
                <strong>Vendor:</strong> {{product.vendor}}
            </p>
            <p class="text--primary">
                <strong>Status:</strong> {{product.status}}
            </p>
            <div class="text-danger">{{product.quantity_available}} left in the stock</div>
            <v-btn
                  v-if="product.quantity_available"
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                  @click="reserve"
                >
                  Add to Cart<i class="fas fa-cart-plus"></i>
                </v-btn>
            </v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
        <!-- </v-container> -->
        </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
          <h5 class="mt-5 col col-12"><strong>Latest Products <i class="fas fa-plus-square"></i></strong></h5>
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
                  @click="getProduct"
                >
                  <i class="fas fa-info-circle"></i>
                </v-btn></router-link>
              </v-card-actions>
            </v-card>
          </div>
    </v-row>
    </v-container>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default({
    data() {
    return{
        product: this.$store.state.product
        
    }},
    methods:{
        async getProduct() {
        this.$store.commit('setIsLoading')
        const category_slug = this.$route.params.category_slug
        const product_slug = this.$route.params.product_slug
        const response = await AuthService.productDetail(category_slug, product_slug);
        this.$store.commit('setIsLoading');
        this.$store.commit('SET_PRODUCT',response)

      },
    },
    created(){
        this.getProduct();
    },
    computed() {
        this.product = this.$store.getters.getProduct();
    }
})
</script>
