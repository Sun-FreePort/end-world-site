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
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: 'square',
        component: () => import(/* webpackChunkName: "home_square" */ '../components/home/Square.vue'),
      },
      {
        path: 'market',
        component: () => import(/* webpackChunkName: "home_market" */ '../components/home/Market.vue'),
      },
      {
        path: 'work',
        component: () => import(/* webpackChunkName: "home_work" */ '../components/home/Work.vue'),
      },
      {
        path: 'store',
        component: () => import(/* webpackChunkName: "home_store" */ '../components/home/Store.vue'),
      },
      {
        path: 'outskirts',
        component: () => import(/* webpackChunkName: "home_outskirts" */ '../components/home/Outskirts.vue'),
      },
    ],
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
