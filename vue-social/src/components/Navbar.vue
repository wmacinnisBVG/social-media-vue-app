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
      //Clears session and redirects to login
      sessionStorage.clear();
      window.location.href = '/';
    }
  },
  mounted(){
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }

  }
}
</script>

<style scoped>

</style>