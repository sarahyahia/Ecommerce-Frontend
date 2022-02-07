<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn 
            class="btn d-block w-75" 
            v-bind="attrs"
            v-on="on" 
            filled 
            color="purple white--text"
          > 
            Edit Product<v-icon>mdi-file-edit</v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-alert
                v-if='msg'
                border="top"
                color="success"
                dark
                class="mt-2"
              >{{ msg }}</v-alert>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  v-model="title"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Vendor*"
                  v-model="vendor"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price*"
                  v-model="price"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity Available*"
                  v-model="quantity_available"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                    chips
                    show-size
                    :rules="rules"
                    accept="image/png, image/jpeg, image/bmp"
                    truncate-length="15"
                ></v-file-input>    
              </v-col> 
              <!-- <v-col cols="12">
                <v-text-field
                  label="Slug*"
                  v-model="slug"
                  type="text"
                  required
                ></v-text-field>
              </v-col> -->
              <v-col cols="12">
                  <v-textarea
                    color="black"
                    v-model="description"
                    label="Description"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                    v-model="status"
                    :items="['available','sold out']"
                    label="Status*"
                    required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="purple darken-1 white--text"
            text
            @click="submit"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import AuthService from '@/services/AuthService.js';

  export default {
      name:'EditProduct',
    //   props: {
    //       product: Object,
    //   },
    data: () => ({
        dialog: false,
        title:'',
        // slug:'',
        description:'',
        category: '',
        status: 'available',
        quantity_available:1,
        vendor: '',
        price:500,
        image:'',
        msg: '',
        errors: [],
        rules: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
    }),
    mounted(){
        this.product = this.$store.getters.getProduct
        console.log(this.product.image);
        this.title=this.product.title;
        // this.slug=this.product.slug;
        this.description=this.product.description;
        this.category=this.product.category;
        this.status=this.product.status;
        this.quantity_available=this.product.quantity_available;
        this.vendor=this.product.vendor;
        this.price=this.product.price;
        this.image=this.product.image;
        //event.target.files[0]
    },
    methods: {
        async submit () {
            try{
                const data ={
                    title: this.title,
                    slug: this.product.slug,
                    description: this.description,
                    status: this.status,
                    category: this.category,
                    vendor: this.vendor,
                    quantity_available: this.quantity_available,
                    price: this.price,
                    // image: this.image,
                }
                console.log(data);
                const token = this.$store.getters.isLoggedIn
                this.$store.commit('setIsLoading')
                const response = await AuthService.editProduct(data, token, this.product.id);
                this.msg = response.msg
                this.$store.commit('setIsLoading');
                location.reload();
                // this.dialog = false;
                // this.reset();
                // this.$router.push({ path: this.product.get_absolute_url })
                setTimeout(this.dialog = false, 2000)
            }catch (error) {
                this.errors = error
                console.log(error.response)
            }
        },
        reset(){
            this.title = ''
            this.slug = ''
            this.description = ''
            this.msg = ''

        },
    }
  }
</script>