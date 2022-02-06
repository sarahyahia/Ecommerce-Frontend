<template>
    <v-app>
        <h2 class="mt-5">{{ user.username }}'s profile</h2>
        <v-container class="container-fluid d-flex">
        <v-row class="m-5">
            <v-card outlined height="auto" class="h-auto">
                    <v-btn
                        :top="true"
                        :right="true"
                        class="btn-danger mt-2 float-right"
                        @click="deactivate"
                    >
                        Deactivate your account
                    </v-btn>
                <v-card-text>
                <v-card-title class="text-h4 text--primary">
                    Profile Info
                </v-card-title>
                    <div class="text--secondry text-h6 text-left">
                        Name: <strong>{{ user.first_name }} {{ user.last_name }}</strong>
                    </div>
                    <div class="text--secondry text-h6 text-left">
                        Username: <strong>{{ user.username }}</strong>
                    </div>
                    <div class="text--secondry text-h6 text-left">
                        E-mail: <strong>{{ user.email }}</strong>
                    </div>
                </v-card-text>
                <v-card-text>
                <v-card-title v-if="this.$store.getters.getOrders.length" class="text-h4 text--primary">
                    Orders History
                </v-card-title>
                    <OrderHorizontal :orders="this.$store.getters.getOrders" />
                </v-card-text>
            </v-card>
        </v-row>
        </v-container>
    </v-app>
</template>

<script>
import AuthService from '@/services/AuthService.js';
import OrderHorizontal from '@/components/OrderHorizontal.vue';
export default {
    data() {
        return {
            user:{},
            orders:[]
        }
    },
    name:'Account',
    components: {
        OrderHorizontal,
    },
    methods:{
        async getUserInfo(){
            this.user= this.$store.getters.getUser;
            this.$store.commit('setIsLoading');
            const token= this.$store.getters.isLoggedIn;
            const response = await AuthService.orderList(token);
            this.$store.commit('setIsLoading');
            this.$store.commit('SET_ORDERS',response)
        },
        async deactivate(){
            this.$store.commit('setIsLoading');
            const token= this.$store.getters.isLoggedIn;
            const response = await AuthService.deactivate(token);
            this.$store.commit('changeMsgValue', response.msg)
            this.$store.commit('setIsLoading');
            // const response = await AuthService.logout(this.$store.getters.isLoggedIn);
            this.$store.dispatch('logout', response);
            this.$router.push('/signin');
            
        }
    },
    mounted(){
        this.getUserInfo();
    }
}
</script>