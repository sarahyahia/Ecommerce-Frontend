<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="320"
    >
      <template v-slot:activator="{ on, attrs }">
          
        <v-btn 
            v-bind="attrs"
            v-on="on" 
            class="btn d-block w-75 mt-2" 
            filled 
            color="warning white--text"
        > 
            Delete Product <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this product?
        </v-card-title>
        <!-- <v-card-text>Products associated with this category will be deleted,too.</v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="submit"
          >
            Delete
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AuthService from '@/services/AuthService.js';
  export default {
      name: "DeleteProduct",
    data () {
      return {
        dialog: false,
      }
    },
    methods: {
        async submit () {
             try{
                const token = this.$store.getters.isLoggedIn
                this.$store.commit('setIsLoading')
                const response = await AuthService.deleteProduct( token, this.$store.getters.getProduct.id);
                this.msg = response.msg
                this.$store.commit('setIsLoading');
                this.dialog = false;
                window.history.back()
                // this.$router.push({ path: `/${this.slug}/` })
                }catch (error) {
                    this.errors = error
                    console.log(this.errors)
                }
            },
    }
  }
</script>