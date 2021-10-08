import { createRouter, createWebHistory } from 'vue-router';
import Guest from '../views/Guest.vue';

const routes = [
  {
    path: '/',
    name: 'Guest',
    component: Guest,
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
