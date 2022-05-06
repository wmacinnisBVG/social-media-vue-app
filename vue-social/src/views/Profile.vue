<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div v-for="post in posts" :key="post.id">
            <article class="media card">
              <div class="media-content card-content">
                <div class="content">
                  <h6 class="is-3 title">{{ post.title }}</h6>
                  <p>
                    <small>{{ post.author }}</small>
                    <br><br>
                    {{ post.content }}
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-small" @click="laugh()"><i class="fas fa-laugh-beam"></i></span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
            <br>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <div class="card-content">
              <h3 v-if="profile[0]" class="title is-3">{{ profile[0].name }}</h3>
              <p>Followers: <span v-if="profile[0]" class="tag is-black">{{ num_of_followers }}</span></p>
              <br>
              <p>Laughs: <span v-if="profile[0]" class="tag is-black">{{ profile[0].laughs }}</span></p>
            </div>
          </div>
          <br>
          <div v-if="able_to_follow">
            <div v-if="user_is_following_profile">
              <button class="button is-fullwidth is-danger" @click="unfollowUser()">Unfollow</button>
            </div>
            <div v-if="user_is_following_profile == false">
              <button class="button is-fullwidth is-link" @click="followUser()">Follow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
      profile: [],
      author: "",
      able_to_follow: true,
      followers: [],
      user_is_following_profile: false,
      num_of_followers: 0,
    }
  },
  name: 'Profile',
  components: {},
  methods: {
    /**
     * Used when user wants to laugh at a joke
     * @returns {Promise<void>}
     */
    async laugh() {
      //Get current laugh count and add 1
      const newLikes = this.profile[0].laughs+1;
      const request = {
        laughs: newLikes
      }
      //PATCH request to db
      const res = await fetch(`api/users/${this.profile[0].id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(request)
      })
      if(res.status === 200){
        //If request was sent to db
        alert(`You sent a laugh to ${this.profile[0].name}!`)
        window.location.reload()
      }
    },
    /**
     * Fetch all posts for selected user
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     */
    async fetchPosts() {
      const res = await fetch(`api/posts?author=${this.author}`)
      const data = await res.json()
      return data
    },
    /**
     * Fetch user profile data for selected user
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     */
    async fetchProfile(){
      const res = await fetch(`api/users?email=${this.author}`)
      const data = await res.json()
      return data
    },
    /**
     * Used when viewing user wants to follow another user
     */
    followUser(){
      const user = sessionStorage.getItem("username")
      const newFollower = {
        user_profile: this.author,
        user_follower: user,
      }
      this.follow(newFollower)
    },
    /**
     * Used when user wants to unfollow profile
     * @returns {Promise<void>}
     */
    async unfollowUser(){
      const follower_index = this.followers.findIndex(follower => follower.user_follower === sessionStorage.getItem("username"))
      const record_id = this.followers[follower_index].id
      const res = await fetch(`api/followers/${record_id}`, {
        method: 'DELETE',
      })
      if(res.status === 200){
        window.location.reload()
      }
    },
    /**
     * Sends a POST request to db when a user wants to follow another use
     * @param content
     * @returns {Promise<void>}
     */
    async follow(content) {
      const res = await fetch('/api/followers', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(content)
      })
      const data = await res.json()
      window.location.reload()
    },
    /**
     * Fetches followers for selected user
     * @returns {Promise<Response<any, Record<string, any>, number>>}
     */
    async fetchFollowers() {
      const res = await fetch(`api/followers?user_profile=${this.author}`)
      const data = await res.json()
      return data
    },
  },
  async created() {
    //Gets GET params in URL
    let url = new URL(window.location.href)
    let params = new URLSearchParams(url.search);
    this.author = params.get('user')

    this.posts = await this.fetchPosts()
    this.profile = await this.fetchProfile()
    this.followers = await this.fetchFollowers()

    //Checks if user is already following profile
    if(this.followers.some(follower => follower.user_follower === sessionStorage.getItem("username"))){
      this.user_is_following_profile = true
    }

    //Checks if viewing user is looking at their own profile
    if(params.get('author') == sessionStorage.getItem("username")){
      this.able_to_follow = false
    }
    this.num_of_followers = this.followers.length
  }
}
</script>