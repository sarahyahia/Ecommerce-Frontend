<template>
    <form id="signup-form" v-on:submit.prevent="submit">
        <div class="row">
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Full Name <span class="text-danger">*</span></label>
                <input type="text" v-model.trim="$v.fullname.$model" :class="{'is-invalid': validationStatus($v.fullname)}" class="form-control form-control-lg">
                <div v-if="!$v.fullname.required" class="invalid-feedback">The full name field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Email <span class="text-danger">*</span></label>
                <input type="email" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control form-control-lg">
                <div v-if="!$v.email.required" class="invalid-feedback">The Email field is required.</div>
                <div v-if="!$v.email.email" class="invalid-feedback">The email is not valid.</div>

            
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Country <span class="text-danger">*</span></label>
                <select class="form-control form-control-lg" v-model.trim="$v.country.$model" :class="{'is-invalid':validationStatus($v.country)}">
                    <option value="">Select Country</option>
                    <option :value="c.iso" :key="c.iso" v-for="c in countryList">{{ c.country }}</option>
                </select>
                <div v-if="!$v.country.required" class="invalid-feedback">The country field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Birth Date <span class="text-danger">*</span></label>
                <input type="date" class="form-control form-control-lg" v-model.trim="$v.birthDate.$model" :class="{'is-invalid':validationStatus($v.birthDate)}">
                <div v-if="!$v.birthDate.required" class="invalid-feedback">The birth date field is required.</div>
            </div>
            <div class="col-12 form-group">
                <label class="col-form-label col-form-label-lg">Password <span class="text-danger">*</span></label>
                <input type="password" v-model.trim="password" :class="{'is-invalid':validationStatus($v.password)}" class="form-control form-control-lg">
                <div v-if="!$v.password.required" class="invalid-feedback">The password field is required.</div>
                <div v-if="!$v.password.minLength" class="invalid-feedback">You must have at least {{ $v.password.$params.minLength.min }} characters.</div>
                <div v-if="!$v.password.maxLength" class="invalid-feedback">You must not have greater than {{ $v.password.$params.maxLength.min }} characters.</div>
            </div>
            <div class="col-12 form-group my-3">
                <input class="form-check-input " v-model.trim="remeberMe" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label mx-3" for="defaultCheck1">
                    Remember me!
                </label>                
            </div>
            <div class="col-12 form-group text-center">
                <button class="btn btn-vue btn-lg col-4">Sign Up</button>
            </div>
        </div>
    </form>
</template>
<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
    name: 'SignupForm',
    data: function() {
        return {
            fullname: '', 
            email: '', 
            country: '', 
            birthDate: '',
            password: '',
            remeberMe: '',
            countryList: []
        }
    },
    validations: {
        fullname: {required},
        email:{required,email},
        country:{required},
        birthDate:{required},
        password:{required, minLength: minLength(6), maxLength: maxLength(18)}
    },
    created: function() {
        alert('created')
        var v = this;
        v.$http.get(`http://localhost:4600/countries`)
        .then(function(resp) {
            v.countryList = resp.data;
        })
        .catch(function(err) {
            console.log(err)
        });
    },
    beforeCreate: function(){
        alert('beforeCreate');
    },
    beforeMount: function(){
        alert('beforeMount');
    },
    mounted: function(){
        alert('mounted');
    },
    beforeUpdate: function(){
        alert('beforeUpdate');
    },
    updated: function(){
        alert('updated');
    },
    methods: {
       resetData: function() {
            this.fullname = '';
            this.email = '';
            this.country = '';
            this.birthDate ='';
            this.password = '';
            this.remeberMe = '';
        },
        validationStatus: function(validation){
            return typeof validation != "undefined" ? validation.$error:false;
        },
        submit: function(){
            this.$v.$touch();
            if (this.$v.$pendding || this.$v.$error) return;
            alert('Data Submit');
            this.$v.$reset();
            this.resetData();
        }
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