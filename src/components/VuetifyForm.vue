<template>
    
        <v-card class="p-3 mt-5">
            <v-card-title>
                <h2 class="display-1">Login</h2>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-alert
                        v-if='msg'
                        border="top"
                        color="red lighten-2"
                        dark
                    >{{ msg }}</v-alert>
                    <v-alert
                        v-if='this.$store.state.msg'
                        type="success"
                    >{{this.$store.state.msg}}</v-alert>
                    <v-text-field 
                        label="Username"
                        v-model="username"
                        :error-messages="usernameErrors"
                        required
                        @input="$v.username.$touch()"
                        @blur="$v.username.$touch()"
                        prepend-icon="mdi-account-circle"
                    />
                    <v-text-field 
                        :type="showPassword ? 'text' : 'password'" 
                        label="Password"
                        v-model="password"
                        :error-messages="passwordErrors"
                        required
                        prepend-icon="mdi-lock"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                    />
                    <!-- <v-checkbox
                        v-model="checkbox"
                        :error-messages="checkboxErrors"
                        label="Do you agree?"
                        required
                        @change="$v.checkbox.$touch()"
                        @blur="$v.checkbox.$touch()"
                    ></v-checkbox> -->
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="ml-3 mb-3">
                <v-btn @click="submit" color="success">Login</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </v-card-actions>
        </v-card>
</template>
<script>
    import AuthService from '@/services/AuthService.js';
    import { validationMixin } from 'vuelidate'
    import { required, maxLength } from 'vuelidate/lib/validators'
    export default{
        name: "VuetifyForm",
        mixins: [validationMixin],
        validations: {
            username: {required, maxLength:maxLength(10)},
            password: {required},
            // checkbox: {
            //     checked (val) {
            //     return val
            //     }
            // }
        },
        data: ()=>({
            username:'',
            password:'',
            showPassword : false,
            // checkbox: false,
            msg: '',
        }),
        created() {
            if (this.$store.getters.isLoggedIn) {
                this.$router.push('/about');
            }
        },
        computed : {
            usernameErrors () {
                const errors = []
                if (!this.$v.username.$dirty) return errors
                // !this.$v.username.maxLength && errors.push('Username must be at most 10 characters long')
                !this.$v.username.required && errors.push('username is required.')
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required.')
                return errors
            },
            // checkboxErrors () {
            //     const errors = []
            //     if (!this.$v.checkbox.$dirty) return errors
            //     !this.$v.checkbox.checked && errors.push('You must agree to continue!')
            //     return errors
            //         },
            },
        methods: {
            async submit () {
                this.$v.$touch()
                if (this.$v.$pendding || this.$v.$error) return;
                try {
                    
                    const credentials ={
                        username: this.username,
                        password: this.password
                    };
                    const response = await AuthService.login(credentials);
                    const msg = response.msg;
                    const token = response.token;
                    const user = response.user;
                    this.$store.dispatch('login', { token, user, msg });
                    window.history.back()
                }catch (error) {
                    this.msg = error.response.data.error;
                }
            },
            clear () {
                this.$v.$reset()
                this.username = ''
                this.password = ''
                this.showPassword = false
                // this.checkbox = false
            },
            

        },
        }
</script>
