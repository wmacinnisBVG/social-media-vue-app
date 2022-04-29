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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (
      // make sure the user is authenticated
      sessionStorage.getItem("username") == null &&
      // ❗️ Avoid an infinite redirect
      to.path !== '/login'
  ) {
    // redirect the user to the login page
    return { path: '/login' }
  }
})

export default router