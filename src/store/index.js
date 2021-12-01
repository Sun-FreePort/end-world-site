import { createStore } from 'vuex';

export default createStore({
  state: {
    ver: 0,
    humanWorld: 0,
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
      bag_id: 0,
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
    bag: [],
    fight: {},
    building: [],
    work: null,
    city: {},
    square: {
      lastID: 0,
      showID: 0,
    },
    config: {
      building: [],
      monster: [],
      goods: [],
      maps: [],
    },
  },
  getters: {
    getYear: () => new Date().getFullYear() - 2020,
    getMonth: () => new Date().getMonth(),
    getDay: () => new Date().getDate(),
    getHour: () => new Date().getHours(),
    getMinute: () => new Date().getMinutes(),
    getSecond: () => new Date().getSeconds(),

    tsNow: () => Math.ceil(new Date().getTime() / 1000),
    tsToday: () => Math.ceil(new Date(new Date().toLocaleDateString()).getTime() / 1000),
  },
  mutations: {
    // 读取本地缓存状态
    reloadLocalStorage(state) {
      console.info('ReloadLocalStorage!');
      state.ver = localStorage.getItem('version') ?? 0;

      let config = localStorage.getItem('config');
      if (config) {
        config = JSON.parse(config);
        state.config.monster = config.monsters;
        state.config.goods = config.goods;
        state.config.building = config.building;
        state.config.maps = config.maps;
      }

      const city = localStorage.getItem('stateCity');
      if (city) {
        state.city = JSON.parse(city);
      }

      const user = localStorage.getItem('stateUser');
      if (user) {
        state.user = JSON.parse(user);
      } else {
        state.user = {
          id: 0,
          token: null,
          name: '',
        };
      }

      const work = localStorage.getItem('stateWork');
      if (work) {
        state.work = JSON.parse(work);
      }

      const building = localStorage.getItem('stateBuilding');
      if (building) {
        state.building = JSON.parse(building);
      }

      const square = localStorage.getItem('stateSquare');
      if (square) {
        state.square = JSON.parse(square);
      }
    },
    // 检测版本
    setConfig(state, playload) {
      console.info('SetConfig!');
      state.ver = playload.ver;
      state.humanWorld = playload.human;
      state.config.monster = playload.config.monsters;
      state.config.goods = playload.config.goods;
      state.config.building = playload.config.building;
      state.config.maps = playload.config.maps;

      localStorage.setItem('version', playload.ver);
      localStorage.setItem('config', JSON.stringify(playload.config));
    },
    // 设置用户状态
    setUser(state, loginData) {
      state.user = loginData;
      state.user.token = loginData.api_token;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 重置背包
    setBag(state, bagData) {
      console.info(bagData);
      console.info(bagData.length);
      console.info('---------');
      state.bag = bagData;
    },
    // 锁住提交状态
    setSubmitting(state) {
      state.submitting = true;
    },
    // 清理提交状态
    cancelSubmitting(state) {
      state.submitting = false;
    },
    // 清理用户状态
    clearUser(state) {
      state.user.id = 0;
      state.user.token = '';
      localStorage.removeItem('upgradeTime');
      localStorage.removeItem('stateUser');
      localStorage.removeItem('stateCity');
      localStorage.removeItem('stateWork');
      localStorage.removeItem('stateBuilding');
    },
    // 刷新用户全部缓存
    refreshUser(state, playload) {
      state.work = playload.work;
      state.building = playload.building;
      state.city = playload.city;
      state.user = playload.user;
      state.user.token = playload.user.api_token;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
      localStorage.setItem('stateCity', JSON.stringify(playload.city));
      localStorage.setItem('stateWork', JSON.stringify(playload.work));
      localStorage.setItem('stateBuilding', JSON.stringify(playload.building));
    },
    // 设置用户工作
    setWork(state, work) {
      state.work = work;
      localStorage.setItem('stateWork', JSON.stringify(work));
    },
    // 设置建筑缓存
    setBuilding(state, building) {
      state.building = building;
      localStorage.setItem('stateBuilding', JSON.stringify(building));
    },
    // 改变用户饥饿
    changeUserHungry(state, val) {
      state.user.hungry += val;
      if (state.user.hungry > state.user.hungry_max) {
        state.user.hungry = state.user.hungry_max;
      }
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 改变用户体力
    changeUserEnergy(state, val) {
      state.user.energy += val;
      if (state.user.energy > state.user.energy_max) {
        state.user.energy = state.user.energy_max;
      }
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 改变用户生命
    changeUserHp(state, val) {
      state.user.hp += val;
      if (state.user.hp > state.user.hp_max) {
        state.user.hp = state.user.hp_max;
      }
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户铜币
    changeUserMoney(state, val) {
      state.user.money += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户快乐
    changeUserHappy(state, val) {
      state.user.happy += val;
      if (state.user.happy > state.user.happy_max) {
        state.user.happy = state.user.happy_max;
      }
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户最大攻击
    changeUserAttackMax(state, val) {
      state.user.attack_max += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户最小攻击
    changeUserAttackMin(state, val) {
      state.user.attack_min += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户闪避
    changeUserNimble(state, val) {
      state.user.nimble += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户防御
    changeUserDefence(state, val) {
      state.user.defence += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户负重
    changeUserWeight(state, val) {
      state.user.weight += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 更新用户金币
    changeUserGold(state, val) {
      state.user.gold += val;
      localStorage.setItem('stateUser', JSON.stringify(state.user));
    },
    // 设置广场最新 ID
    setSquareID(state, val) {
      state.square.lastID = val;
      state.square.showID = val;
      localStorage.setItem('stateSquare', JSON.stringify(state.square));
    },
    // 设置广场已看
    setSquareLastID(state, val) {
      state.square.lastID = val;
      localStorage.setItem('stateSquare', JSON.stringify(state.square));
    },
    // 设置广场已看
    setTime(state, val) {
      state.time = val;
    },
  },
  actions: {
  },
  modules: {
  },
});
