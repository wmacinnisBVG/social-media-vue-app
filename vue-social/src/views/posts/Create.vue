<template>
    <section class="section">
      <div class="container">
        <h2 class="title is-2">New Post</h2>
        <hr>

        <form @submit="onSubmit">
          <div class="field">
            <label class="label">Joke Set-Up</label>
            <div class="control">
              <input class="input" name="title" v-model="title" type="text" placeholder="">
            </div>
          </div>
          <div class="field">
            <label class="label">Punchline</label>
            <div class="control">
              <textarea class="textarea" name="content" v-model="content"></textarea>

            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-black" type="submit">Post</button>

            </div>
          </div>


        </form>
      </div>
    </section>


</template>
<script>
export default {
  name: 'home',
  data(){
    return {
      title: '',
      content : '',
      author: ''
    }
  },
  components: {

  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      if(!this.content){
        alert('Please add some content')
        return
      }
      const user = sessionStorage.getItem("username")
      const newPost = {
        title: this.title,
        content: this.content,
        author: user
      };
      this.createPost(newPost);

    },
    async createPost(content) {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(content)
      })
      const data = await res.json()
      this.title = '';
      this.content = '';
      window.location.href = '/';
    },


  }
}
</script>
