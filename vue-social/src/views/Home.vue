<template>
  <section class="section">
    <div class="container">
      <h2 class="title is-2">Latest Posts</h2>
      <hr>
      <Posts />
    </div>
  </section>

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
