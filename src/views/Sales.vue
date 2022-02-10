<template>
    
    <v-container>
        <v-row>
            <v-col col="12" sm="6">
                <ChartComp  v-if="vendorLoaded" :chartdata="vendorData" :options="options"/>
            </v-col>
            <v-col col="12" sm="6">
                <ChartComp  v-if="categoryLoaded" :chartdata="categoryData" :options="options"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col col="12" sm="6">
                <ChartComp  v-if="productLoaded" :chartdata="productData" :options="options"/>
            </v-col>
            <v-col col="12" sm="6">
                <ChartComp  v-if="categoryLoaded" :chartdata="categoryData" :options="options"/>
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
        productLoaded:false,
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
        productData: {
            labels: [],
            datasets: [
                {
                label: 'Top 10 best seller products',
                backgroundColor: 'pink',
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
    }),
    methods: {
        async getSalesByVendor() {
            this.$store.commit('setIsLoading')
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.salesByVendor(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading');
            this.$store.commit('SET_SALES_BY_VENDOR',response)
            this.vendors = response.map(sale=> sale.vendor)
            this.sales = response.map(sale=> sale.sales)
            this.vendorData.labels = this.vendors
            this.vendorData.datasets[0].data=this.sales
            this.vendorLoaded = true
        },
        async getSalesByCategory() {
            this.$store.commit('setIsLoading')
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.salesByCategory(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading');
            this.$store.commit('SET_SALES_BY_CATEGORY',response)
            this.categoryData.labels = response.map(sale=> sale.category)
            this.categoryData.datasets[0].data=response.map(sale=> sale.sales)
            this.categoryLoaded = true
        },
        async getSalesByProduct() {
            this.$store.commit('setIsLoading')
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.salesByProduct(token);
            if(response.response){
          console.log(response.response)
        }else if(response.request){
          this.$store.commit('setServerError',true);
        }
            this.$store.commit('setIsLoading');
            this.$store.commit('SET_SALES_BY_PRODUCT',response)
            this.productData.labels = response.map(sale=> sale.product.title)
            this.productData.datasets[0].data=response.map(sale=> sale.sales)
            this.productLoaded = true
        }
    },
    mounted(){
        this.getSalesByVendor();
        this.getSalesByCategory();
        this.getSalesByProduct();
    }
}
</script>