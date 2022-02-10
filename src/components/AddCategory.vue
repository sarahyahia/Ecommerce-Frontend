<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="purple white--text"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add Category <v-icon>mdi-plus</v-icon>
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
                  :error-messages="titleErrors"
                  required
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Slug*"
                  v-model="slug"
                  type="text"
                  :error-messages="slugErrors"
                  required
                  @input="$v.slug.$touch()"
                  @blur="$v.slug.$touch()"
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
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    export default {
        name:'AddCategory',
        props:{getCategory:Function},
        mixins: [validationMixin],
        validations: {
            title: {required},
            slug: {required},

        },
        data: () => ({
            dialog: false,
            title:'',
            slug:'',
            description:'',
            msg: '',
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
                    const response = await AuthService.addCategory(data, token);
                    
                    this.msg = response.msg
                    this.$store.commit('setIsLoading');
                    // this.getCategory();
                    this.reset();
                    setTimeout(this.resetMsgDialog, 2000)
                    location.reload();
                    // this.dialog = false;
                }catch (error) {
                    this.errors = error.response.data.errors
                }
            },
            reset(){
                this.title = ''
                this.slug = ''
                this.description = ''
            },
            resetMsgDialog(){
                // this.dialog = false;
                this.msg = ''
            }
        },
        computed : {
            titleErrors () {
                const errors = []
                if (!this.$v.title.$dirty) return errors
                !this.$v.title.required && errors.push('title is required.')
                return errors
            },
            slugErrors () {
                const errors = []
                if (!this.$v.slug.$dirty) return errors
                !this.$v.slug.required && errors.push('slug is required.')
                return errors
            },
        }
    }
</script>