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
                        active-class="warning white--text"
                        :input-value="active"
                        @click="toggle"
                    >
                        {{ category.title }}
                    </v-chip>
                </router-link>
            </v-item>
            <v-chip v-if="this.$store.getters.getUser.is_staff">
                <AddCategory />
            </v-chip>
          </v-item-group>
        </v-row>
            <v-row>
                <h2 class="text-left ">{{ category.title }}</h2>
                <div class="d-block float-end my-5">
                    <EditCategory :category="category" :categorySlug="this.categorySlug" />
                    <DeleteCategory :categorySlug="this.categorySlug" />
                </div>
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
import AddCategory from '@/components/AddCategory.vue';
import EditCategory from '@/components/EditCategory.vue';
import DeleteCategory from '@/components/DeleteCategory.vue';

export default {
    name: 'Category',
    components: {
        // ProductBox,
        ProductHorizontal,
        AddCategory,
        EditCategory,
        DeleteCategory,
    },
    data(){
        return {
            category: {},
            isLoading: '',
            categorySlug : this.$route.params.category_slug,
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


        },
        async getCategories() {
        this.$store.commit('setIsLoading',true)
        const response = await AuthService.categoryList();
        this.$store.commit('setIsLoading', false);
        this.$store.commit('SET_CATEGORIES', response)
      },
    },
    watch: {
        $route(to) {
            if (to.name === 'Category') {
                this.getCategory();
                // this.getCategories();
            }
        }
    },
    mounted(){
        this.getCategory();
        this.getCategories();
    }
}
</script>