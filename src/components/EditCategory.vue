<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
          <v-btn 
            class="btn d-block w-25 " 
            v-bind="attrs"
            v-on="on" 
            filled 
            color="purple white--text"
          > 
            Edit Category<v-icon>mdi-file-edit</v-icon>
          </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Category Form</span>
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
                  label="Slug*"
                  v-model="slug"
                  type="text"
                  required
                ></v-text-field>
                <v-textarea
                    color="black"
                    v-model="description"
                    label="Description"
                ></v-textarea>
              </v-col>
                
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
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
        name:'EditCategory',
        props:{
            categorySlug: String,
            category: Object,
            },

        data: () => ({
            dialog: false,
            title:'',
            slug:'',
            description:'',
            msg: '',
            errors: [],
        }),
        methods:{
            async submit () {
                try{
                    const data ={
                        title: this.title,
                        slug: this.slug,
                        description: this.description
                    }
                    const token = this.$store.getters.isLoggedIn
                    this.$store.commit('setIsLoading')
                    const response = await AuthService.editCategory(data, token, this.categorySlug);
                    this.msg = response.msg
                    this.$store.commit('setIsLoading');
                    this.dialog = false;
                    this.$router.push({ path: `/${this.slug}/` })
                    // this.reset();
                    // setTimeout(this.resetMsgDialog, 2000)
                }catch (error) {
                    this.errors = error
                    console.log(this.errors)
                }
            },
            // reset(){
            //     this.title = ''
            //     this.slug = ''
            //     this.description = ''
            //     this.msg = ''
            // },
            // resetMsgDialog(){
            //     // this.dialog = false;
                
                
            // }
        },
        mounted(){
            this.title=this.category.title
            this.slug=this.category.slug
            this.description=this.category.description
        },
        watch: {
        $route(to) {
            if (to.name === 'Category') {
                location.reload();
            }
        }
    },
    }
</script>