import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('@/views/Home.vue')

  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/Login.vue')

  },
  {
    path: '/posts/create',
    name: 'create_post',
    component: ()=>import('@/views/posts/Create.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: ()=>import('@/views/Signup.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: ()=>import('@/views/Profile.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
   if (to.path == '/' && sessionStorage.getItem("username") == null && to.path !== '/login') {
    // redirect the user to the login page
    return { path: '/login' }
  }

})

export default router