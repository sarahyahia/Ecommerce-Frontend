<template>
    <v-app>
        <v-container >
        <v-row>
            <v-item-group class="my-3">
            <v-item
              v-for="category in this.$store.getters.getCategories"
              :key="category.id"
              v-slot="{ active, toggle }"
            >
                <router-link :to="category.get_absolute_url" class="btn">
                    <v-chip
                        class=""
                        active-class="warning white--text"
                        :input-value="active"
                        @click="toggle"
                    >
                        {{ category.title }}
                    </v-chip>
                </router-link>
            </v-item>
          </v-item-group>
        </v-row>
            <v-row>
                <h2>{{ category.title }}</h2>
            </v-row>
            <v-row>
                <div class="row h-4 m-5" v-if="!category.products.length" > No Items in this category, try to search in another category.</div>
                <div v-for="product in category.products" :key="product.id" class="col-md-3 col-6">
                    <!-- <ProductBox :product="product" /> -->
                </div>
                <ProductHorizontal :products="category.products"/>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
// import ProductBox from '@/components/ProductBox.vue';
import ProductHorizontal from '@/components/ProductHorizontal.vue';
import AuthService from '@/services/AuthService.js';
export default {
    name: 'Category',
    components: {
        // ProductBox,
        ProductHorizontal
    },
    data(){
        return {
            category: {},
            isLoading: '',
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            const response = await AuthService.categoryDetail(categorySlug)
            this.$store.commit('setIsLoading', false)
            this.$store.commit('SET_CATEGORY', response)
            console.log(this.$store.getters.getCategory.title);
            this.category=this.$store.getters.getCategory;
            console.log(this.category.title)


        }
    },
    watch: {
        $route(to) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
    mounted(){
        this.getCategory()
    }
}
</script>