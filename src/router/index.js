// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Users from "../views/Users.vue";
import Workspace from "../views/Workspace.vue";

const routes = [
  { path: "/", component: Workspace, name: "Workspace" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/users", component: Users, name: "Users" },
  { path: "/workspace", component: Workspace, name: "Workspace" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
