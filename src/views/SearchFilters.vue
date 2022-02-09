<template>
    <v-app>
        <v-container >
            <v-row class="m-5">
                <h2>Search | Store App</h2>
            </v-row>
            <v-container>
                <v-row>
                    
                    <v-col  class="p-3 back p-5" cols="12" sm="8">
                        <div class="row h-4 m-5" v-if="isLoading" > Loading ...</div>
                        <div class="row h-4 m-5" v-else-if="!products.length" > No Results Found, try to search with another words.</div>
                        <ProductHorizontal :products="products"/>
                    </v-col>
                    <v-col class="back pt-5 ml-2" cols="12" sm="3">
                        <v-card class="back my-5" @change="changeSearch">
                        <h4 class="m-5 pt-5">Filter By</h4>
                            <v-card-text>
                                <v-col cols="12">
                                    <v-text-field
                                    label="Title"
                                    v-model="title"
                                    type="text"
                                    required
                                    @change="changeSearch"
                                    ></v-text-field>
                                </v-col>
                                <v-select
                                    v-model="category"
                                    :items="this.$store.getters.getCategories"
                                    label="Category"
                                    item-text="title"
                                    @change="categoryChanged"
                                    required
                                ></v-select>
                                <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                    label="Min Price"
                                    v-model="min_price"
                                    type="number"
                                    required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                    label="Max Price"
                                    v-model="max_price"
                                    type="number"
                                    required
                                    ></v-text-field>
                                </v-col>
                                </v-row>
                                <v-col cols="12">
                                    <v-text-field
                                    label="Vendor"
                                    v-model="vendor"
                                    type="text"
                                    required
                                    @change="changeSearch"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select
                                    v-model="status"
                                    :items="['available', 'sold out']"
                                    label="Status"
                                    required
                                    @change="changeSearch"
                                ></v-select>
                                </v-col>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                </v-row>
            </v-container>
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
            isLoading:false,
            products: [],
            title:'',
            min_price: "",
            max_price: "",
            category: '',
            category_id:'',
            vendor:'',
            status:''
        }
    },
    methods:{
        categoryChanged(e){
          this.category_id = this.$store.getters.getCategories.filter(obj => {
            return obj.title === e
          })[0].id
          this.searchProducts()
        },
        async searchProducts(){
            this.isLoading=true
            this.$store.commit('setIsLoading')
            await axios
             .get(`http://localhost:8000/api/products/search/?title=${this.title}&max_price=${this.max_price}&min_price=${this.min_price}&category=${this.category_id}&vendor=${this.vendor}&status=${this.status}`)
             .then(response => {
                 this.products = response.data.results
                 console.log(response.data)
             })
             .catch(error => {
                 console.log(error)
             })
            this.$store.commit('setIsLoading');
            this.isLoading=false
        },
        changeSearch(){
            this.searchProducts();
        }
    },
    mounted(){
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        if (params.get('query')) {
            this.query = params.get('query');
            this.searchProducts(this.query);
        }
        this.products = this.$store.getters.getProducts.results
    }
}
</script>

<style scoped>
.back{
    background-color: #eee;
}
</style>