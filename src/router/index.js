import { createRouter, createWebHistory } from 'vue-router';
import Guest from '../views/Guest.vue';

const routes = [
  {
    path: '/',
    name: 'Guest',
    component: Guest,
  },
  {
    path: '/square',
    name: 'Home',
    component: () => import(/* webpackChunkName: "square" */ '../views/Home.vue'),
    children: [
      {
        path: 'square',
        component: () => import(/* webpackChunkName: "home_square" */ '../components/city/square/Square.vue'),
      },
      {
        path: 'market',
        component: () => import(/* webpackChunkName: "home_market" */ '../components/city/market/Market.vue'),
      },
      {
        path: 'work',
        component: () => import(/* webpackChunkName: "home_work" */ '../components/city/work/Work.vue'),
      },
      {
        path: 'building',
        component: () => import(/* webpackChunkName: "home_building" */ '../components/city/building/Building.vue'),
      },
      {
        path: 'store',
        component: () => import(/* webpackChunkName: "home_store" */ '../components/city/store/Store.vue'),
      },
      {
        path: 'outskirts',
        component: () => import(/* webpackChunkName: "home_outskirts" */ '../components/city/square/Outskirts.vue'),
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
