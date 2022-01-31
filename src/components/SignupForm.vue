<template>
    <form id="signup-form" v-on:submit.prevent="submit">
            <v-card-title>
                <h2 class="display-1">Create a new account</h2>
            </v-card-title>
        <div class="row">
              <v-alert
              v-if='msg'
                border="top"
                color="red lighten-2"
                dark
            >{{ msg }}</v-alert>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">First Name <span class="text-danger">*</span></label>
                <input type="text" v-model.trim="$v.firstName.$model" :class="{'is-invalid': validationStatus($v.firstName)}" class="form-control form-control-lg">
                <div v-if="!$v.firstName.required" class="invalid-feedback">The fist name field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Last Name <span class="text-danger">*</span></label>
                <input type="text" v-model.trim="$v.lastName.$model" :class="{'is-invalid': validationStatus($v.lastName)}" class="form-control form-control-lg">
                <div v-if="!$v.lastName.required" class="invalid-feedback">The last name field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Username <span class="text-danger">*</span></label>
                <input type="text" v-model.trim="$v.username.$model" :class="{'is-invalid': validationStatus($v.username)}" class="form-control form-control-lg">
                <div v-if="!$v.username.required" class="invalid-feedback">The username field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                <input type="email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                <div v-if="!$v.email.required" class="invalid-feedback">The Email field is required.</div>
                <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid.</div>

            
            </div>
            <!-- <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Country <span class="text-danger">*</span></label>
                <v-autocomplete
                    v-model.trim="$v.country.$model"
                    :items="countryList.map(a => a.country)"
                    :class="{'is-invalid':validationStatus($v.country)}"
                    dense
                    outlined
                ></v-autocomplete>
                <div v-if="!$v.country.required" class="invalid-feedback">The country field is required.</div>
            </div> -->
            <!-- <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Birth Date <span class="text-danger">*</span></label>
                <input type="date" class="form-control form-control-lg" v-model.trim="$v.birthDate.$model" :class="{'is-invalid':validationStatus($v.birthDate)}">
                <div v-if="!$v.birthDate.required" class="invalid-feedback">The birth date field is required.</div>
            </div> -->
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Password <span class="text-danger">*</span></label>
                <input type="password" v-model.trim="password" :class="{'is-invalid':validationStatus($v.password)}" class="form-control form-control-lg">
                <div v-if="!$v.password.required" class="invalid-feedback">The password field is required.</div>
                <div v-if="!$v.password.minLength" class="invalid-feedback">You must have at least {{ $v.password.$params.minLength.min }} characters.</div>
                <div v-if="!$v.password.maxLength" class="invalid-feedback">You must not have greater than {{ $v.password.$params.maxLength.min }} characters.</div>
            </div>
            <div class="col-12 form-group my-3">
                <input class="form-check-input " v-model.trim="agreeTerms" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label mx-3" for="defaultCheck1">
                    agree  to our terms of service!
                </label>                
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4">Sign Up</button>
            </div>
        </div>
    </form>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
    name: 'SignupForm',
    data: function() {
        return {
            firstName: '',
            lastName: '', 
            username: '', 
            email: '', 
            // country: '', 
            // birthDate: '',
            password: '',
            agreeTerms: '',
            // countryList: [],
            // value: null,
            msg: '',
        }
    },
    validations: {
        firstName: {required},
        lastName: {required},
        username: {required},
        email:{required,email},
        // country:{required},
        // birthDate:{required},
        password:{required, minLength: minLength(6), maxLength: maxLength(18)}
    },
    created: function() {
        if (this.$store.getters.isLoggedIn) {
            this.$router.push('/about');
        }
        // var v = this;
        // v.$http.get(`http://localhost:4600/countries`)
        // .then(function(resp) {
        //     v.countryList = resp.data;
        // })
        // .catch(function(err) {
        //     console.log(err)
        // });
    },
    methods: {
       resetData: function() {
            this.firstName = '';
            this.lastName = '';
            this.username = '';
            this.email = '';
            // this.country = '';
            // this.birthDate ='';
            this.password = '';
            this.agreeTerms = '';
        },
        validationStatus: function(validation){
            return typeof validation != "undefined" ? validation.$error:false;
        },
        async submit(){
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            try {
                const credentials = {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                };
                const response = await AuthService.signUp(credentials);
                console.log(response);
                const token = 'dfsj' //response.token;
                const user = response.user;
                this.$v.$reset();
                this.resetData();
                this.$store.dispatch('login', { token, user });
                this.$router.push('/about');
            } catch (error) {
                this.msg = error.response.data.error;
            }
        },
    }
}
</script>
<style>
.btn-vue{
    background: #53B985;
    color: #31485D;
    font-weight: bold;
}
</style>