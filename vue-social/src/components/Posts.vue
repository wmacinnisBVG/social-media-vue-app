<template>
  <div  :key="post.id" v-for="post in posts">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ post.title }}
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <p>{{ post.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: []
    }
  },
  name: 'Posts',
  components: {},
  methods: {
    async fetchPosts() {
      const res = await fetch('api/posts')
      const data = await res.json()
      console.log('test');
      return data
    },
  /**
    async deleteContact(id) {
      if (confirm('Are you sure?')) {
        const res = await fetch(`api/contacts/${id}`, {
          method: 'DELETE',

        })
        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error deleting task')


      }
    }
    */
  },
  async created() {
    this.posts = await this.fetchPosts()
  }
}
</script>