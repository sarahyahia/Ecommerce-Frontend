<template>
    <v-card class="p-3">   
        <div id="demo">{{ fullName }}</div>
        <div> {{ fromComputed }} </div>
        <!-- <div id="watch-example">
            <v-p>
                Ask a yes/no question:
                <v-text-field
                    v-model="question"
                    label="Write a question"
                    outlined
                    dense
                    rounded
                ></v-text-field>
            </v-p>
            <p>{{ answer }}</p>
        </div> -->
    </v-card>  
</template>

<script>
export default ({
    data: function(){
        return {
            firstName: 'first',
            lastName: 'last',
            initial: 1,
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
          return this.initial + 1;
        },
    },
    methods: {
      setFromComputed() {
          this.fromComputed = this.computed;
      },
    }
//     watch: {
//     // whenever question changes, this function will run
//     question: function (newQuestion, oldQuestion) {
//       this.answer = 'Waiting for you to stop typing...'
//       this.debouncedGetAnswer()
//     }
//     },
//     created: function () {
//         this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
//     },
//     methods: {
//         getAnswer: function () {
//         if (this.question.indexOf('?') === -1) {
//             this.answer = 'Questions usually contain a question mark. ;-)'
//             return
//         }
//         this.answer = 'Thinking...'
//         var vm = this
//          vm.$http.get('https://yesno.wtf/api')
//             .then(function (response) {
//             vm.answer = _.capitalize(response.data.answer)
//             })
//             .catch(function (error) {
//             vm.answer = 'Error! Could not reach the API. ' + error
//             })
//         }
//   }

})
</script>
