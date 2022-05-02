<template>

  <div  :key="post.id" v-for="post in posts">
    <br>
    <article class="media card">
      <div class="media-content card-content">
        <div class="content">
          <h6 class="is-3 title">{{ post.title }}</h6>
          <p>
            <small>@{{ post.author }}</small> <small>31m</small>
            <br><br>
         {{ post.content }}

          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-retweet"></i></span>
            </a>
            <a class="level-item">
              <span class="icon is-small"><i class="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
    <br>
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