<template>
    <v-app>
        <v-container >
            <v-row class="m-5">
                <h2>Search | Store App</h2>
                <h3 class="">Search term: "{{ query }}"</h3>
            </v-row>
            <v-row>
                <v-col cols="12" sm="8">
                    <div class="row h-4 m-5" v-if="!products.length" > No Results Found, try to search with another words.</div>
                    <ProductHorizontal :products="products"/>
                </v-col>
                <v-col cols="12" sm="4">
                    
                </v-col>
            </v-row>
            <v-row>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

// import AuthService from '@/services/AuthService.js';
import axios from 'axios';
import ProductHorizontal from '@/components/ProductHorizontal';
export default {
    name: 'SearchFilters',
    components: {
        ProductHorizontal,
    },
    data() {
        return {
            products: [],
            min_price: "",
            max_price: "",
        }
    },
    methods:{
        async searchProducts(){
            this.$store.commit('setIsLoading')
            await axios
             .get(`api/v1/announcements/search/?max_price=${this.max_price}&min_price=${this.max_price}&`)
             .then(response => {
                 this.products = response.data.results
                 console.log(response.data)
             })
             .catch(error => {
                 console.log(error)
             })
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