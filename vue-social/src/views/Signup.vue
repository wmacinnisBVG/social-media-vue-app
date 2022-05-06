<template>
  <section class="section">
    <div class="container">
      <h1 class="title is-1">Become a Member</h1>
      <hr>
      <br>
      <div v-show="error">
        <div class="notification is-danger">
          {{ error_msg }}
        </div>
      </div>
      <br>
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" v-model="name" name="name" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" v-model="email" name="email" type="text">
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" v-model="password" name="password" type="password">
        </div>
      </div>
      <div class="field">
        <label class="label">Retype Password</label>
        <div class="control">
          <input class="input" v-model="password2" name="password2" type="password">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button @click="signup()" class="button is-primary">Signup</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import bcrypt from 'bcryptjs'

export default {
  name: "Signup",
  data() {
    return {
      error_msg: "",
      error: false,
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  methods: {

    signup() {

      if(this.name != "" && this.email != "" && this.password != "" && this.password2 != ""){
        if(this.password == this.password2){
          const new_user = {
            name: this.name,
            email: this.email,
            laughs: 0,
            password: this.encryptPassword(this.password)
          }
          this.create_user(new_user)
        } else {
          this.error = true
          this.error_msg = "Sorry we could not sign you up, please make sure your passwords match."
        }
      } else {
        this.error = true
        this.error_msg = "Sorry we could not sign you up, please make sure you fill out all the required fields."
      }
    },
    encryptPassword(password){

      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(password, salt)
    },
    async create_user(user) {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user)
      })
      const data = await res.json()
      sessionStorage.setItem("username", this.email);
      window.location.href = '/';
    },
  },
};
</script>


<style scoped>

</style>