<template>
    <v-container>
        <v-row class="my-5">
            <h2 class="text-left my-3">Product Changes Log</h2>
            <v-data-table
                :headers="productHeaders"
                :items="logChanges"
                
                :items-per-page="10"
                class="elevation-1 yellow lighten-5 py-1"
            >
                <template v-slot:item.date_added="{ item }">
                    <div class="p-2">
                        {{ item.date_added.slice(0,10)}}
                    </div>
                </template>
                <template v-slot:item.delete="{ item }">
                    <tr>
                    <td>
                            <v-btn class="m-2" fab dark small color="warning" @click="onButtonClick(item.id)">
                                <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-row>
    </v-container>
</template>
<script>

import AuthService from '@/services/AuthService.js';
export default {
    name: 'ChangesLog',
    data(){
        return{
            logItem:[],
            productHeaders: [
                { text: 'ID', align: 'center', value: 'id' },
                {
                    text: 'Product ID',
                    align: 'center',
                    sortable: false,
                    value: 'old_product.id',
                },
                { text: 'Action', align: 'center', value: 'status' },
                { text: 'Changed Fields', align: 'center', value: 'differences' },
                { text: 'Admin', align: 'center', value: 'admin.username' },
                { text: 'Date Of Action', align: 'center', value: 'date_added' },
                { text: 'Delete', align: 'center', value: "delete" },
                // { text: 'Image', align: 'center', value: 'image' },
            ],
            logChanges:[],

        }
    },
    methods: {
        async getProductChangesLog() {
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.productChangesLog(token);
            if(response.response){
                console.log(response.response)
            }else if(response.request){
                this.$store.commit('setServerError',true);
            }
            this.$store.commit('setIsLoading',false);
            this.logChanges = response
        },
        async onButtonClick(id){
            this.$store.commit('setIsLoading',true)
            const token = this.$store.getters.isLoggedIn
            let response = await AuthService.deleteProductChangesLog(token, id);
            if(response.response){
                console.log(response.response)
            }else if(response.request){
                this.$store.commit('setServerError',true);
            }
            this.$store.commit('setIsLoading',false);
            location.reload();
        }
    },
    mounted(){
        this.getProductChangesLog();
    },
    watch: {
        
    }

}
</script>