<template>
          <Navbar :should-render="showNavBar"></Navbar>

        <router-view></router-view>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar
  },

  methods: {
    toggleTopBar () {
      if(sessionStorage.getItem("username") == null){
        this.showNavBar = false

      }
    }
  },
  mounted(){
    this.toggleTopBar()
  },

  data: () => ({

    showNavBar: true

    }),
}
</script>
