<template>
    <v-row>
        <v-col
          v-for="item in items"
          :key="item.product.id"
          cols="12"
        >
          <v-card
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                  <router-link :to="item.product.get_absolute_url" class="btn">
                    <v-card-title
                      class="text-h5"
                      style="text-decoration:none"
                      v-text="item.product.title"
                    ></v-card-title>
                  </router-link>

                <v-card-actions class="ml-3">
                    <strong>ordered quantity: {{item.quantity}} </strong>
                  
                </v-card-actions>
                <v-card-actions class="m-3" color="deep-purple darken-2">
                    <strong>Total Price: {{item.product.price*item.quantity}}LE</strong>
                </v-card-actions>
                <v-card-actions class="ml-3" v-if="flag">
                    <!-- <strong>Vendor: {{item.product.vendor}}</strong> -->
                    <button class="btn btn-warning" @click="removeFromCart(item)">Delete<v-icon>mdi-delete-forever</v-icon></button>
                </v-card-actions>
                
              </div>

              <v-avatar
                class="ma-3"
                size="250"
                tile
              >
                <v-img :src="item.product.get_image"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    
    name:'CartProduct',
    props:{
      items:Array,
      flag:Boolean,
      },
    data() {
      return{
      }
    },
    methods:{
        
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.getters.getCart))
        },
        removeFromCart(item) {
            this.$store.commit('removeFromCart', item)
            this.$emit('removeFromCart', item)
            this.updateCart()
        },
    }
  }
</script>
