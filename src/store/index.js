import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      id: 0,
      token: null,
      name: '',
      point: 0,
      attack_max: 0,
      attack_min: 0,
      exp: 0,
      gold: 0,
      helmet_id: 0,
      hp: 0,
      hp_max: 0,
      energy: 0,
      energy_max: 0,
      hungry: 0,
      hungry_max: 0,
      happy: 0,
      happy_max: 0,
      level: 0,
      money: 0,
      slot: 0,
      slot_max: 0,
      updated_at: 0,
      vip: 0,
      vip_at: 0,
      weapon_id: 0,
    },
  },
  mutations: {
    // 读取本地缓存状态
    reloadLocalStorage(state) {
      if (localStorage.getItem('stateUser')) {
        state.user = JSON.parse(localStorage.getItem('stateUser'));
      } else {
        state.user = {
          id: 0,
          token: null,
          name: '',
        };
      }
    },
    // 更新用户状态
    setUser(state, loginData) {
      state.user = loginData;
      state.user.token = loginData.api_token;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 刷新用户缓存
    refreshUser(state) {
      this.$http.get('user/info').then((resonse) => {
        console.info(resonse.data);
        const { token } = state.user;
        state.user = resonse.data;
        state.user.token = token;
        localStorage.setItem('stateUser', JSON.stringify(state.user));
      });
    },
    // 更新用户体力
    consumeUserEnergy(state, val) {
      state.user.energy -= val;
      // TODO 节流
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
  },
  actions: {
  },
  modules: {
  },
});
