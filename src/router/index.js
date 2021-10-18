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
    component: () => import(/* webpackChunkName: "square" */ '../views/Home.vue'),
    children: [
      {
        path: 'square',
        component: () => import(/* webpackChunkName: "home_square" */ '../components/city/square/Index.vue'),
      },
      {
        path: 'market',
        component: () => import(/* webpackChunkName: "home_market" */ '../components/city/market/Index.vue'),
      },
      {
        path: 'work',
        component: () => import(/* webpackChunkName: "home_work" */ '../components/city/work/Index.vue'),
      },
      {
        path: 'building',
        component: () => import(/* webpackChunkName: "home_building" */ '../components/city/building/Index.vue'),
      },
      {
        path: 'store',
        component: () => import(/* webpackChunkName: "home_store" */ '../components/city/store/Index.vue'),
      },
      {
        path: 'outskirts',
        component: () => import(/* webpackChunkName: "home_outskirts" */ '../components/city/square/Index.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Guest,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
