<template>
  <h1 class="title is-1"></h1>
  <div  :key="post.id" v-for="post in posts">
    <br>
    <article class="media card">
      <div class="media-content card-content">
        <div class="content">
          <h6 class="is-3 title">{{ post.title }}</h6>
          <p>
            <router-link :to="'/profile?user='+post.author"><small>{{ post.author }}</small></router-link>
            <br><br>
         {{ post.content }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-small" @click="laugh(post.author)"><i class="fas fa-laugh-beam"></i></span>
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
      posts: [],
    }
  },
  name: 'Posts',
  components: {},
  methods: {

    async laugh(author) {
      const profile =  await this.fetchLaughs(author)
      const newLikes = profile[0].laughs+1
      const request = {
        laughs: newLikes
      }
      const res = await fetch(`api/users/${profile[0].id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(request)
      })
      if(res.status === 200){
        alert(`You sent a laugh to ${profile[0].name}!`)
        window.location.reload()
      }
    },
    async fetchLaughs(user) {
      const res = await fetch(`api/users?email=${user}`)
      const data = await res.json()
      console.log(data)
      return data
    },
    async fetchPosts() {
      const res = await fetch(`api/posts`)
      const data = await res.json()
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