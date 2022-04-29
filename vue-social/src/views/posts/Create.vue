<template>
  <div class="post-container">
    <h2>New Post</h2>
    <hr>
    <form @submit="onSubmit">
      <v-text-field name="title" v-model="title" label="Title"></v-text-field>
      <v-textarea name="content" v-model="content"
          label="Content"
          color="teal"
      >
      </v-textarea>
      <v-btn
          elevation="2" type="submit"
      >Post</v-btn>

    </form>
  </div>

</template>
<script>
export default {
  name: 'home',
  data(){
    return {
      title: '',
      content : ''
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
      const newPost = {
        title: this.title,
        content: this.content,
      };
      this.createPost(newPost);
      this.title = '';
      this.content = '';
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
    },


  }
}
</script>
