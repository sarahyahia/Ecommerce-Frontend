// src/views/Home.vue

<template>
  <div class="m-5 p-3">
    <h1>Hi {{ username }}</h1>
    <p>your token is {{ secretMessage }}</p>
    <input type="button" class="btn btn-danger" value="Logout" @click="logout" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      secretMessage: '',
      username: ''
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/signin');
    }

    this.username = this.$store.getters.getUser.username;

    this.secretMessage = this.$store.getters.isLoggedIn;
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/signin');
    }
  }
};
</script>