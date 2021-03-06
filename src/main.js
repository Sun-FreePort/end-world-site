import { createApp } from 'vue';
import WaveUI from 'wave-ui';
import 'wave-ui/dist/wave-ui.css';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import store from './store';

// const axios = require('axios').default;

const app = createApp(App);

// eslint-disable-next-line no-new
const waveUI = new WaveUI(app, {
  // Some Wave UI options.
});

const url = {
  production: process.env.VUE_APP_PROD_SITE,
  development: process.env.VUE_APP_DEV_SITE,
};
app.config.globalProperties.$http = axios.create({
  baseURL: url[process.env.NODE_ENV],
});

// 请求中间件
app.config.globalProperties.$http.interceptors.request.use(
  (config) => {
    const { token } = store.state.user;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
app.config.globalProperties.$http.interceptors.response
  .use((response) => response, (error) => {
    console.info(error);
    app.config.globalProperties.$store.commit('cancelSubmitting');
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('stateUser');
        app.config.globalProperties.$store.commit('clearUser');
        app.config.globalProperties.$router.push('/');
        return null;
      case 500:
        // TODO Alert，UI 库好像没有现成组件
        break;
      default:
        break;
    }
    return Promise.reject(error);
  });

store.commit('reloadLocalStorage');
app
  .use(i18n)
  .use(store)
  .use(waveUI)
  .use(router)
  .mount('#app');
