import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebaseConfig";
import Login from "@/views/Login.vue";
import AddUser from "@/views/AddUser.vue";
import Members from "@/views/Members.vue";
import Workspace from "@/views/Workspace.vue";
import LeaderApprentices from "@/views/LeaderApprentices.vue";

const routes = [
  {
    path: "/",
    name: "Workspace",
    component: Workspace,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/add-user",
    name: "AddUser",
    component: AddUser,
    meta: { requiresAuth: false },
  },
  {
    path: "/members",
    name: "Members",
    component: Members,
    meta: { requiresAuth: false },
  },
  {
    path: "/members/:leaderId",
    name: "LeaderApprentices",
    component: LeaderApprentices,
    props: true,
    meta: { requiresAuth: false },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Set up the authentication guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (to.path === "/login" && currentUser) {
    next("/");
  } else {
    next();
  }
});

export default router;
