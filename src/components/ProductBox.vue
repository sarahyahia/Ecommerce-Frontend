<template>
    <v-card
        height="70%"
        :loading="this.$store.getters.isLoading"
        class="mx-auto p-2 overflow-hidden"
        max-width="374"
    >   
        <v-img
        height="50%"
        :src="product.get_image"
        ></v-img>
        <v-card-text class="p-0 display-6 h6">
        <router-link :to="product.get_absolute_url" class="btn">
        <div class="text ellipsis">
            <v-card-title class="text-concat" >{{ product.title }}</v-card-title>
        </div>
        </router-link>
            <div class="h6 text-danger my-2 text-subtitle-1">
                {{ product.price }} • LE 
            </div>
            <div class="h6 my-2 text-subtitle-1">
                {{ product.vendor }}
            </div>
            <!-- <v-chip-group
                active-class="deep-purple accent-2 white--text"
                column
            >
                <v-chip>{{ product.quantity_available }} piece</v-chip>
                <v-chip>{{ product.status}}</v-chip>
            </v-chip-group> -->
        </v-card-text>

        <!-- <v-card-actions class="pl-3">
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
        </v-card-actions> -->
    </v-card>
</template>

<script>
export default {
    name: 'ProductBox',
    props: {
        product: Object
    }
}
</script>

<style scoped>
.text {
  position: relative;
  font-size: .5rem;
  color: black;
  width: 100%; /* Could be anything you like. */
}

.text-concat {
  position: relative;
  display: inline-block;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 1.8em; /* (Number of lines you want visible) * (line-height) */
  line-height: 1.2em;
  text-align:justify;
}

.text.ellipsis::after {
  content: "....";
  position: relative;
  font-weight: bold;
  /* right: -12px; 
  bottom: 4px; */
}

</style>