<template>
    <v-app>
        <v-container >
            <v-row class="m-5">
                <h2>Search | Store App</h2>
                <h3 class="">Search term: "{{ query }}"</h3>
            </v-row>
            <v-row>
                <div class="row h-4 m-5" v-if="!products.length" > No Results Found, try to search with another words.</div>
                <ProductHorizontal :products="products"/>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

import AuthService from '@/services/AuthService.js';
import ProductHorizontal from '@/components/ProductHorizontal';
export default {
    name: 'Search',
    components: {
        ProductHorizontal,
    },
    data() {
        return {
            products: [],
            query: ''
        }
    },
    methods:{
        async searchProducts(query){
            this.$store.commit('setIsLoading')
            const response = await AuthService.searchProduct(query);
            if(response.response){
                console.log(response.response)
            }else if(response.request){
                this.$router.push('/500');
            }
            // this.$store.commit('SET_PRODUCTS',response);
            this.products = response
            this.$store.commit('setIsLoading');
        }
    },
    mounted(){
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        if (params.get('query')) {
            this.query = params.get('query');
            this.searchProducts(this.query);
        }
    }
}
</script>