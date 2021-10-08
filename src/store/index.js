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
          point: 0,
          attack_max: 0,
          attack_min: 0,
          exp: 0,
          gold: 0,
          helmet_id: 0,
          hp: 0,
          hp_max: 0,
          level: 0,
          money: 0,
          slot: 0,
          slot_max: 0,
          updated_at: 0,
          vip: 0,
          vip_at: 0,
          weapon_id: 0,
        };
      }
    },
    // 更新用户状态
    setUser(state, loginData) {
      state.user.token = loginData.api_token;
      state.user.attack_max = loginData.attack_max;
      state.user.attack_min = loginData.attack_min;
      state.user.exp = loginData.exp;
      state.user.gold = loginData.gold;
      state.user.helmet_id = loginData.helmet_id;
      state.user.hp = loginData.hp;
      state.user.hp_max = loginData.hp_max;
      state.user.id = loginData.id;
      state.user.level = loginData.level;
      state.user.money = loginData.money;
      state.user.name = loginData.name;
      state.user.slot = loginData.slot;
      state.user.slot_max = loginData.slot_max;
      state.user.updated_at = loginData.updated_at;
      state.user.vip = loginData.vip;
      state.user.vip_at = loginData.vip_at;
      state.user.weapon_id = loginData.weapon_id;
      state.user.point = loginData.point;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
  },
  actions: {
  },
  modules: {
  },
});
