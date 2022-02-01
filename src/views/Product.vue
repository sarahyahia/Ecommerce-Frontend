<template>
<div>
    <v-spacer></v-spacer>
    <v-container>
    <v-row class="d-flex">
        <v-col
            key="n"
            class="d-flex child-flex"
            cols="6"
        >
            <v-img
                :src="product.get_image"
                aspect-ratio="1"
                class="grey lighten-2"
            ></v-img>
        </v-col>
        <v-col
            col="2"
        ></v-col>
        <v-col
            class="d-flex child-flex"
            cols="4"
        >
        <!-- <v-container> -->
        <v-card>
            <v-title class="h3 m-3 pb-3">{{product.title}}</v-title>
            
            <v-divider></v-divider>
            <v-list-item-title class="float-lg-left">
                  {{ product.price }}LE 
                </v-list-item-title>

            <v-card-actions>
                <v-btn
                  v-if="product.quantity_available"
                  color="deep-purple darken-2"
                  class="btn btn-warning"
                  text
                  @click="reserve"
                >
                  <i class="fas fa-cart-plus"></i>
                </v-btn>
            </v-card-actions>
        </v-card>
        <!-- </v-container> -->
        </v-col>
    </v-row>
    </v-container>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService.js';

export default({
    data() {
    return{
        product: this.$store.getters.getProduct
        
    }},
    methods:{
        async getProduct() {
        this.$store.commit('setIsLoading', true)
        const category_slug = this.$route.params.category_slug
        const product_slug = this.$route.params.product_slug
        const response = await AuthService.productDetail(category_slug, product_slug);
        this.$store.commit('setIsLoading');
        this.$store.commit('SET_PRODUCT',response)

      },
    },
    mounted(){
        this.getProduct();
    }
})
</script>
