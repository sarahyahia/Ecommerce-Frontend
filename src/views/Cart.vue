<template>
    <v-app>
        <v-container >
            <v-row>
                <h2 class="float-left m-5">Shopping Cart</h2>
            </v-row>
            <v-row>
                <div class="row h-4 m-5" v-if="!cart.items.length" > No Items in your cart, start shopping.</div>
                <CartProduct :items="cart.items" :flag="true" v-else v-on:removeFromCart="removeFromCart"/>
            </v-row>
            <v-row v-if="cart.items.length">
                <strong class="m-3 ">Subtotal ({{ cartTotalLength  }} items): EGP {{cartTotalPrice.toFixed(2)}}</strong >
                <router-link v-if="this.$store.getters.isLoggedIn" to="/cart/checkout" style="text-decoration:none"><v-btn class="btn btn-block mb-5" color="warning">Proceed to checkout</v-btn></router-link>
                <router-link v-else to="/signin" style="text-decoration:none"><v-btn class="btn btn-block mb-5" color="warning" >Login first to proceed</v-btn></router-link>
            </v-row>
         </v-container>
    </v-app>
</template>

<script>

import CartProduct from '@/components/CartProduct'

export default {
    name: 'Cart',
    components: {
        CartProduct,
    },
    data() {
        return {
            cart: {
                items: []
            }
        }
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
        }
    },
    mounted() {
        this.cart = this.$store.getters.getCart;
    },
    computed: {
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
    }
}
</script>