<template>
<div>
    <v-spacer></v-spacer>
    <v-container>
        <p v-if="this.$store.getters.getIsLoading">Loading...</p>
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
            </div><strong>Product Details:</strong>
            <pre class="text--primary">{{product.description}}
            </pre>
            <p class="text--primary">
                <strong>Vendor:</strong> {{product.vendor}}
            </p>
            <p class="text--primary">
                <strong>Status:</strong> {{product.status}}
            </p>
            <div class="text-danger">{{product.quantity_available}} left in the stock</div>
            <v-text-field label="quantity"  v-if="!this.$store.getters.getUser.is_staff && product.quantity_available" type="number" min="1" :max="product.quantity_available"  v-model="quantity"></v-text-field>
            <v-btn
                  v-if="!this.$store.getters.getUser.is_staff && product.quantity_available"
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                   @click="addToCart()"
                >
                  Add to Cart<i class="fas fa-cart-plus"></i>
                </v-btn>
                <div class="text-center ma-2">
                    <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    >
                    {{ text }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="pink"
                        text
                        class="btn d-block w-50"
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        Close
                        </v-btn>
                    </template>
                    </v-snackbar>
                </div>
            <div class="mt-5" v-if="this.$store.getters.getUser.is_staff">
                <EditProduct :product="product" />
                <DeleteProduct />
            </div>
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
          <div v-for="product in this.$store.getters.getLatestProducts" :key="product.id" class="col-md-2 col-4">
             <ProductBox :product="product" />
          </div>
    </v-row>
    </v-container>
    </div>
</template>

<script>

import ProductBox from "@/components/ProductBox"
import EditProduct from "@/components/EditProduct"
import DeleteProduct from "@/components/DeleteProduct"
import AuthService from '@/services/AuthService.js';

export default({
    name:'Product',
    components: {
      ProductBox,
      EditProduct,
      DeleteProduct
    },
    data() {
    return{
        product:{},
        snackbar: false,
        text: `Added to your cart successfully`,
        timeout: 2000,
        quantity: 1
    }},
    methods:{
        async getProduct() {
          this.$store.commit('setIsLoading',true)
          const category_slug = this.$route.params.category_slug
          const product_slug = this.$route.params.product_slug
          const response = await AuthService.productDetail(category_slug, product_slug);
          if(response.response){
            console.log(response.response)
          }else if(response.request){
            this.$store.commit('setServerError',true);
          }
          this.$store.commit('setIsLoading',false);
          this.$store.commit('SET_PRODUCT',response)
          this.product = this.$store.getters.getProduct;
      },
      async getLatestProducts() {
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.latestProducts();
       if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
        this.$store.commit('setIsLoading',false);
        this.$store.commit('SET_LATEST_PRODUCTS',response)

      },
      addToCart() {
            this.snackbar = true;
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)
        }
    },
    mounted(){
        this.getProduct();
        this.getLatestProducts();

    },
    watch: {
        $route(to) {
            if (to.name === 'Product') {
                // location.reload();
                this.getProduct()
            }
        }
    },
})
</script>
