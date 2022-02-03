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
            <v-text-field label="quantity" type="number" min="1" :max="product.quantity_available"  v-model="quantity"></v-text-field>
            <v-btn
                  v-if="product.quantity_available"
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
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        Close
                        </v-btn>
                    </template>
                    </v-snackbar>
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
          <div v-for="product in this.$store.getters.getLatestProducts" :key="product.id" class="col-md-3 col-6">
             <ProductBox :product="product" />
          </div>
    </v-row>
    </v-container>
    </div>
</template>

<script>

import ProductBox from "@/components/ProductBox"
import AuthService from '@/services/AuthService.js';

export default({
    name:'Product',
    components: {
      ProductBox
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
          this.$store.commit('setIsLoading')
          const category_slug = this.$route.params.category_slug
          const product_slug = this.$route.params.product_slug
          const response = await AuthService.productDetail(category_slug, product_slug);
          this.$store.commit('setIsLoading');
          this.$store.commit('SET_PRODUCT',response)
          this.product = this.$store.getters.getProduct;
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
    },
    watch: {
        $route(to) {
            if (to.name === 'Product') {
                this.getProduct()
            }
        }
    },
})
</script>
