// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebaseConfig';
import Dashboard from '../views/Workspace.vue';
import Login from '../views/Login.vue';
import AddUser from '@/views/AddUser.vue';
import Members from '@/views/Members.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser,
  },
  {
    path: '/members',
    name: 'Members',
    component: Members,
  },
  // Optional: Redirect all unmatched routes to Dashboard
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set up the authentication guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (to.path === '/login' && currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
