<template>
  <v-app>
    <v-container>
    <v-row class="my-5 text-left">
        <h2>Checkout:</h2>
    </v-row>
      <v-row class="mt-5">
            <table class="table table-striped ">
                <thead class="thead-light">
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in cart.items"
                        v-bind:key="item.product.id"
                    >
                        <td>{{ item.product.title }}</td>
                        <td>EGP {{ item.product.price }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>EGP {{ getItemTotal(item).toFixed(2) }}</td>
                    </tr>
                </tbody>
                <tfoot class=" table-warning">
                    <tr>
                        <th colspan="2" class="text-left">Total</th>
                        <td>{{ cartTotalLength }}</td>
                        <td>EGP {{ cartTotalPrice.toFixed(2) }}</td>
                    </tr>
                </tfoot>
            </table>
      </v-row>
      <v-row class="my-5 text-left">
        <h2>Shipping Details:</h2>
        <p class="has-text-grey mb-4 ml-2">* All fields are required</p>
        <v-container class="m-3 b-2">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="phone"
            :counter="11"
            type="text"
            label="Phone Number"
            required
            ></v-text-field>

            <v-text-field
            v-model="address"
            label="Address"
            required
            ></v-text-field>

            <v-text-field
             v-model="zipcode"
            label="Zipcode"
            required
            ></v-text-field>
            
            <v-text-field
             v-model="place"
            label="Place"
            required
            ></v-text-field>

            <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree to our terms of service?"
            required
            ></v-checkbox>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
            >
            Submit
            </v-btn>

            <v-btn
            color="purple white--text"
            class="mr-4"
            @click="reset"
            >
            Reset Form
            </v-btn>

        </v-form>
        </v-container>
      </v-row>
      <v-row>
          <v-col>

          </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>

import AuthService from '@/services/AuthService.js';


export default {
    name: "Checkout",
    data() {
        return{
            
            cart: {
                items: []
            },
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: [],
        }
    },
    mounted(){
        this.cart = this.$store.getters.getCart
    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.product.price * curVal.quantity
            }, 0)
        },
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {
                return acc += curVal.quantity
            }, 0)
        }
    },
    methods:{
        getItemTotal(item) {
            return item.quantity * item.product.price
        },
        reset () {
            this.$refs.form.reset()
        },
        async submit() {
            if (this.phone === '') {
                this.errors.push('The phone field is missing!')
            }
            if (this.address === '') {
                this.errors.push('The address field is missing!')
            }
            if (this.zipcode === '') {
                this.errors.push('The zip code field is missing!')
            }
            if (this.place === '') {
                this.errors.push('The place field is missing!')
            }
            if (!this.errors.length) {
                this.$store.commit('setIsLoading', true)
            }

            const items = []
            for (let i = 0; i < this.cart.items.length; i++) {
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price * item.quantity
                }
                items.push(obj)
            }

            const data = {
                'address': this.address,
                'zipcode': this.zipcode,
                'place': this.place,
                'phone': this.phone,
                'items': items,
            }
            this.$store.commit('setIsLoading')
            const response = await AuthService.checkout(data)
            console.log(response)
            this.$store.commit('setIsLoading')
        }
    }

}
</script>