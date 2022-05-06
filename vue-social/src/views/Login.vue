<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div  style="text-align: center">
            <h1 class="title is-1"><strong>dadjokes.com</strong></h1>
            <p>The internet's biggest collection of dad jokes.</p>
            <br>
            <img src="https://media1.giphy.com/media/VM01S5yIaKCgqg1bSF/giphy.gif">
          </div>
          <br>
          <br>
        </div>
        <div class="column">

          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                Login
              </p>
            </header>
            <div class="card-content">
              <div v-show="error">
                <div class="notification is-danger">
                  {{ error_msg }}
                </div>
              </div>
              <br>
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
          </div>
          <br>
          <p><small>dadjokes.com is supported by:</small></p>
          <a href="https://www.basspro.com/shop/en" target="_blank">
          <img src="https://dynl.mktgcdn.com/p/qY7eNNADJ4eZYP01saMISG_0djUHzFxqNhyqL9uSIRo/1900x475.jpg">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Import bcrypt for password hashing
 */
import bcrypt from 'bcryptjs'
export default {
  data() {
    return {
      users: [],
      error_msg: "",
      error: false,
      email: "",
      password: "",
    };
  },
  methods: {
    /**
     * Fetch all users from db
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     */
    async fetchUsers() {
      const res = await fetch('api/users')
      const data = await res.json()
      return data
    },
    /**
     * Attempts to log user into site
     */
    login() {
      const email = this.email;
      //Checks if user exists in db
      if(this.users.some(user => user.email === this.email)){
        //finds index of user in db array
        const user_index = this.users.findIndex(user => user.email === this.email)
        //Checks the plaintext password against hash in the db
        bcrypt.compare(this.password, this.users[user_index].password, function(err, result) {
          if (result) {
            //If passwords match
            sessionStorage.setItem("username", email);
            window.location.href = '/';
          }
          else {
            //If passwords do not match
            this.error = true
            this.error_msg = "Invalid username or password."
          }
        });
      } else {
        //If email is not found in db
        this.error = true
        this.error_msg = "Invalid username or password."
      }
    },
  },
  async created() {
    this.users = await this.fetchUsers()
  },
};
</script>

<style scoped>

</style>