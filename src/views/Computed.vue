<template>
    <v-app class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-md-3 mt-3 vue-bg h-100 d-flex justify-content-center align-items-center">
          <img alt="Vue logo" src="../assets/logo.png" width="100">
        </div>
        <div class="col-md-9 h-100 d-flex justify-content-center align-items-center">
          <div class="col-md-8 rounded px-5 py-5 shadow bg-white text-left">
            
            <ComputedExample/>

          </div>
        </div>
      </div>
    </v-app>
</template>

<script>

import ComputedExample from '../components/ComputedExample.vue'
export default {
  name: 'Computed',
  components: {
    ComputedExample,
  },
  data() {
    return {
      // value: 'Sarah',
    }
  },
  mounted () {
    // this.$store.commit('changeUsernameValue', this.value);
    console.log(this.$store.state.user.username);
    this.$store.dispatch('increment')
},
}
</script>
