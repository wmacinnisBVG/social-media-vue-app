<template>
  <div v-if="shouldRender">
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">

        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>

        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-primary" to="/posts/create"><strong>New Joke</strong></router-link>
              <a class="button is-danger" @click="logout()">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>


</template>

<script>
export default {
  name: "Navbar",
  props: ['shouldRender'],
  methods:{
    logout(){
      sessionStorage.clear();
      window.location.href = '/';
    }
  }
}
</script>

<style scoped>

</style>