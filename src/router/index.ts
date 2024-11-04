import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/Article/Index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/create',
      name: 'articles-create',
      component: () => import('../views/Article/Create.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/:id',
      name: 'articles-show',
      component: () => import('../views/Article/Show.vue'),
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/articles/edit/:id',
      name: 'articles-edit',
      component: () => import('../views/Article/Update.vue'),
      props: true,
      meta: { requiresAuth: true },
    },
  ]
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Refresh auth state from localStorage before each navigation
  if (!authStore.user && localStorage.getItem('user')) {
    authStore.user = JSON.parse(localStorage.getItem('user')!);
  }

  // Check if the user is already authenticated and is trying to access the login page
  if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' });
  } 
  // Check if the route requires authentication
  else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } 
  else {
    next();
  }
});

export default router
