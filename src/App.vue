<template>
  <w-app>
    <router-view/>
  </w-app>
</template>

<script>
import MD5 from 'crypto-js/md5';

export default {
  name: 'App',
  mounted() {
    // 版本不同时，更新配置
    this.$http.get('ver')
      .then((response) => {
        const hash = MD5(localStorage.getItem('config')).toString();
        console.info(`Config hash is: ${hash}`);
        if (this.$store.state.ver >= response.data.ver) {
          return;
        }

        this.$http.get('config')
          .then((cRes) => {
            this.$store.commit('setConfig', {
              human: parseInt(response.data.human, 10),
              ver: response.data.ver,
              config: cRes.data,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    this.userRefresh(true);
    this.userHPUpgrade();
    return false;
  },
  methods: {
    // 定时获取最新用户信息
    userRefresh(first = false) {
      const time = localStorage.getItem('upgradeTime');
      setTimeout(this.userRefresh, 2900);
      localStorage.setItem('upgradeTime', this.$store.getters.tsNow);

      if (first || !time || Math.round(time) + 360 < this.$store.getters.tsNow) {
        if (!this.$store.state.user || !this.$store.state.user.token) {
          return false;
        }
        this.$http.get('user/info')
          .then((response) => {
            this.$store.commit('setTime', response.data.ts);
            this.$store.commit('setSquareLastID', response.data.lecture_id);
            this.$store.commit('refreshUser', {
              user: response.data.user,
              building: response.data.building,
              work: response.data.work,
              city: response.data.city,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      return true;
    },
    // 更新用户生命
    userHPUpgrade() {
      const time = localStorage.getItem('hpTime');
      if (!time || Math.round(time) < this.$store.getters.tsNow) {
        setTimeout(this.userHPUpgrade, 1050);
        if (!this.$store.state.user || !this.$store.state.user.token) {
          return false;
        }
        localStorage.setItem('hpTime', this.$store.getters.tsNow);
        this.$store.commit('changeUserHp', 1);
      }
      return true;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
