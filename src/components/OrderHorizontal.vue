<template>
    <v-row>
        <v-col
          v-for="order in orders"
          :key="order.id"
          cols="12"
        >
          <v-card
          >
            <div class="d-flex flex-no-wrap justify-space-between pb-5">
              <div>
                  <!-- <router-link :to="order.get_absolute_url" class="btn">
                    <v-card-title
                      class="text-h5"
                      style="text-decoration:none"
                      v-text="order.id"
                    ></v-card-title>
                  </router-link> -->

                <v-card-actions class="ml-3 mt-2">
                    <strong>Order ID: {{order.id}}</strong>
                </v-card-actions>
                <v-card-actions class="m-3" color="deep-purple darken-2">
                    <strong>Total Paid amount: EGP {{order.paid_amount}}</strong>
                </v-card-actions>
                <v-card-actions class="m-3">
                    <strong>No of items : {{order.items.length }}</strong>
                </v-card-actions>
                <v-card-actions class="m-3">
                    <strong>Order address : {{order.address}}</strong>
                </v-card-actions>
                <v-card-actions class="m-3">
                    <strong>Order place : {{order.place}}</strong>
                </v-card-actions>
                <v-card-actions class="m-3">
                    <strong>Phone : {{order.phone}}</strong>
                </v-card-actions>
                    <template>
                        <div class="text-center overflow-hidden">
                            <v-dialog
                            width="75%"
                            >
                            <template v-slot:activator="{ on, attrs } ">
                                <v-btn
                                color="purple lighten-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >
                                show items
                                </v-btn>
                            </template>

                            <v-card class="overflow-hidden">
                                <v-card-title class="text-h5 grey lighten-2">
                                Items Ordered
                                </v-card-title>

                                <CartProduct :items="order.items" :flag="false"/>
                            </v-card>
                            </v-dialog>
                        </div>
                    </template>
              </div>
            </div>
          </v-card>
        </v-col>
    </v-row>
</template>

<script>

import CartProduct from '@/components/CartProduct.vue'
export default {
    
    name:'OrderHorizontal',
    props:{orders:Array},
    components: {
        CartProduct,
    },
    data: () => ({
      
    }),
  }
</script>
