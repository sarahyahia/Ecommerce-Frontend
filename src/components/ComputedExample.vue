<template>
    <v-card class="p-3">   
        <div id="demo">{{ this.$store.state.user.username }}</div>
        <div>from computed {{ fromComputed }} </div>
        <div>from vuex store {{ this.$store.state.count }}</div>
    </v-card>  
</template>

<script>
var initial= 0
export default ({
    data: function(){
        return {
            firstName: 'first',
            lastName: 'last',
            
            fromComputed: null,
            question: '',
            answer: 'I cannot give you an answer until you ask a question!'
        }
    },
    created() {
      this.setFromComputed();
    },
    computed: {
        fullName: function () {
        return this.firstName + ' ' + this.lastName
        },
        computed() {
            initial= initial+1;
          return initial;
        },
    },
    methods: {
      setFromComputed() {
          this.fromComputed = this.computed;
      },
    }


})
</script>
