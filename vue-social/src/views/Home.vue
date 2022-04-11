<template>
  <h1>Vue Social</h1>
  <Posts />
</template>
<script>
import Posts from '@/components/Posts.vue'

export default {
  name: 'home',
  components: {
    Posts
  }
}
</script>