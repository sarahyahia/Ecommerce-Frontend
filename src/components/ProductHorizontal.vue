<template>
    <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
        >
          <v-card
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                  <router-link :to="product.get_absolute_url" class="btn">
                    <v-card-title
                      class="text-h5"
                      style="text-decoration:none"
                      v-text="product.title"
                    ></v-card-title>
                  </router-link>

                <v-card-actions class="m-3" color="deep-purple darken-2">
                    <strong>Price: {{product.price}}LE</strong>
                </v-card-actions>
                <v-card-actions class="ml-3">
                    <strong>Vendor: {{product.vendor}}</strong>
                </v-card-actions>
                
                <v-card-actions class="m-2">
                    <v-btn
                        v-if="product.quantity_available"
                        color="deep-purple darken-2"
                        class="btn btn-warning"
                        text
                    >
                        <i class="fas fa-cart-plus"></i>
                    </v-btn>
                  <router-link :to="product.get_absolute_url" class="btn">
                    <v-btn
                        color="deep-purple darken-2"
                        class="btn btn-warning"
                        text
                    >
                        <i class="fas fa-info-circle"></i>
                    </v-btn>
                    </router-link>
                    <div class="text-danger float-left m-2">{{product.quantity_available}} left in the stock</div>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="250"
                tile
              >
                <v-img :src="product.get_image"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    
    name:'ProductHorizontal',
    props:{products:Array},
    data: () => ({
      
    }),
  }
</script>
