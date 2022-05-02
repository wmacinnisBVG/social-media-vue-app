<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">Login</h1>
      <hr>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" v-model="email" name="email" type="email">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" v-model="password" name="password" type="password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button @click="login()" class="button is-link">Login</button>&nbsp;&nbsp;
          <router-link to="/signup" class="button is-dark">Signup</router-link>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
      sessionStorage.setItem("username", this.email);
      console.log(sessionStorage.getItem("username"));
      window.location.href = '/';

    }
  },
};
</script>

<style scoped>

</style>