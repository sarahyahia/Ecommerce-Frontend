<template>
    
    <v-container>
        <v-row class="my-5">
            <h2 class="text-left my-3">Sales Statistics</h2>

            <v-col col="12" sm="6">
                <ChartComp  v-if="vendorLoaded" :chartdata="vendorData" :options="options"/>
            </v-col>
            <v-col col="12" sm="6">
                <ChartComp  v-if="categoryLoaded" :chartdata="categoryData" :options="options"/>
            </v-col>
        </v-row>
        <hr/>
        <v-row  class="my-5">
            <h2 class="text-left my-3">Top 10 For All Times</h2>
             <v-col col="12">
                <template>
                    <h5>Top 10 Products</h5>
                    <v-data-table
                        :headers="productHeaders"
                        :items="top10Products"
                        
                        :items-per-page="10"
                        class="elevation-1 purple text--white lighten-5 py-1"
                    >
                        <!-- <template v-slot:item.product="{ item }">
                            <div class="p-2">
                                <v-img :src="item.product.get_image" :alt="item.product.name" width="50"></v-img>
                            </div>
                        </template> -->
                        <template v-slot:item.product="{ item }">
                            <router-link :to="item.product.get_absolute_url" class="btn btn-sm">
                            <div class="p-2">
                                {{item.product.title}}
                            </div>
                            </router-link>
                        </template>
                    </v-data-table>
                </template>
            </v-col>
            <v-col col="12">
                <template>
                    <h5>Top 10 Vendors</h5>
                    <v-data-table
                        :headers="vendorHeaders"
                        :items="top10Vendor"
                        :items-per-page="10"
                        class="elevation-1 green text--white lighten-5 py-2"
                    ></v-data-table>
                </template>
            </v-col>
        </v-row>
        <hr/>
        <v-row  class="my-5">
            <h2 class="text-left my-3">Top 10 This Month</h2>
            <v-col col="12">
                <template>
                    <h5>Top 10 Vendors For This Month</h5>
                    <v-data-table
                        :headers="vendorHeaders"
                        :items="top10VendorMonth"
                        :items-per-page="10"
                        class="elevation-1 green text--white lighten-5 py-2"
                    ></v-data-table>
                </template>
            </v-col>
            <v-col col="12">
                <template>
                    <h5>Top 10 Products For This Month</h5>
                    <v-data-table
                        :headers="productHeaders"
                        :items="top10ProductsMonth"
                        
                        :items-per-page="10"
                        class="elevation-1 purple text--white lighten-5 py-1"
                    >
                        <!-- <template v-slot:item.product="{ item }">
                            <div class="p-2">
                                <v-img :src="item.product.get_image" :alt="item.product.name" width="50"></v-img>
                            </div>
                        </template> -->
                        <template v-slot:item.product="{ item }">
                            <router-link :to="item.product.get_absolute_url" class="btn btn-sm">
                            <div class="p-2">
                                {{item.product.title}}
                            </div>
                            </router-link>
                        </template>
                    </v-data-table>
                </template>
            </v-col>
        </v-row>
    </v-container>
        
</template>

<script>
import ChartComp from '@/components/ChartComp'
import AuthService from '@/services/AuthService.js';
export default {
    name: 'Sales',
    components:{
        ChartComp
    },
    data: () => ({
        vendorLoaded: false,
        categoryLoaded: false,
        response:[],
        vendorData: {
            labels: [],
            datasets: [
                {
                label: 'Sales by vendors',
                backgroundColor: 'green',
                data: []
                }
            ]
        },
        categoryData: {
            labels: [],
            datasets: [
                {
                label: 'Sales by categories',
                backgroundColor: 'purple',
                data: []
                }
            ]
        },
        options: {
        responsive: true,
        maintainAspectRatio: false
        },
        vendors: [],
        sales: [],
        top10Vendor:[],
        top10Products:[],
        top10ProductsMonth:[],
        top10VendorMonth:[],
        vendorHeaders: [
          {
            text: 'Vendor',
            align: 'center',
            sortable: false,
            value: 'vendor',
          },
          { text: 'Sales(EGP)', align: 'center', value: 'sales' },
        ],
        productHeaders: [
          {
            text: 'Product',
            align: 'center',
            sortable: false,
            value: 'product',
          },
          { text: 'Sales(EGP)', align: 'center', value: 'sales' },
        ],
        
    }),
    methods: {
        async getSalesByVendor() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.salesByVendor(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading',false);
            this.$store.commit('SET_SALES_BY_VENDOR',response)
            this.vendors = response.map(sale=> sale.vendor)
            this.sales = response.map(sale=> sale.sales)
            this.vendorData.labels = this.vendors
            this.vendorData.datasets[0].data=this.sales
            this.vendorLoaded = true
        },
        async getTop10Vendor() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.top10Vendor(token);
            if(response.response){
                console.log(response.response)
            }else if(response.request){
                this.$store.commit('setServerError',true);
            }
            this.$store.commit('setIsLoading',false);
            this.$store.commit('SET_SALES_BY_VENDOR',response)
            this.top10Vendor = response
        },
        async getSalesByCategory() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.salesByCategory(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading',false);
            this.$store.commit('SET_SALES_BY_CATEGORY',response)
            this.categoryData.labels = response.map(sale=> sale.category)
            this.categoryData.datasets[0].data=response.map(sale=> sale.sales)
            this.categoryLoaded = true
        },
        async getTop10Product() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.top10Product(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading',false);
            this.top10Products = response
        },
        async getTop10ProductForMonth() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.top10ProductForMonth(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading',false);
            this.top10ProductsMonth = response
        },
        async getTop10VendorForMonth() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.top10VendorForMonth(token);
            if(response.response){
                console.log(response.response)
            }else if(response.request){
                this.$store.commit('setServerError',true);
            }
            this.$store.commit('setIsLoading',false);
            this.$store.commit('SET_SALES_BY_VENDOR',response)
            this.top10VendorMonth = response
        },
    },
    mounted(){
        document.title="Sales | Store App";
        this.getSalesByVendor();
        this.getSalesByCategory();
        this.getTop10Product();
        this.getTop10Vendor();
        this.getTop10ProductForMonth();
        this.getTop10VendorForMonth();
    }
}
</script>