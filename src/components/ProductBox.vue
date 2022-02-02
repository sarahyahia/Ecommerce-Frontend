<template>
    <v-card
        height="95%"
        :loading="this.$store.getters.isLoading"
        class="mx-auto my-12 overflow-hidden"
        max-width="374"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-img
        height="50%"
        :src="product.get_image"
        ></v-img>

        <v-card-title class="overflow-hidden">{{ product.title }}</v-card-title>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
            </v-row>

            <div class="my-4 text-subtitle-1">
                {{ product.price }}LE • 
            </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <v-chip-group
                active-class="deep-purple accent-2 white--text"
                column
            >
                <v-chip>{{ product.quantity_available }} piece</v-chip>
                <v-chip>{{ product.status}}</v-chip>
            </v-chip-group>
        </v-card-text>

        <v-card-actions class="pl-3">
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
        </v-card-actions>
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