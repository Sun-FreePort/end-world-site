<template>
  <header style="margin-bottom: 6px;">
    <Header id="header" />
  </header>
  <w-flex grow>
    <aside>
      <Aside />
    </aside>
    <main class="grow main-right">
      <router-view></router-view>
    </main>
  </w-flex>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/city/Header.vue';
import Aside from '@/components/city/Aside.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      validators: {
        required: (value) => !!value || this.$t('default.input.required'),
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    if (!this.user.token) {
      return this.$router.push('/');
    }

    // 版本不同时，更新配置
    this.$http.get('ver')
      .then((response) => {
        if (this.$store.state.ver >= response.data.ver) {
          return;
        }

        this.$http.get('config')
          .then((cRes) => {
            this.$store.commit('setConfig', {
              ver: response.data.ver,
              config: cRes.data,
            });
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });

    // 每此进入页面，如果间隔 1 小时，则获取服务器最新用户信息
    const time = localStorage.getItem('upgradeTime');
    if (!time || Math.round(time) + 3600 < this.$store.getters.tsNow) {
      this.$http.get('user/info')
        .then((response) => {
          this.$store.commit('refreshUser', {
            user: response.data.user,
            building: response.data.building,
            work: response.data.work,
            city: response.data.city,
          });
          localStorage.setItem('upgradeTime', this.$store.getters.tsNow);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return false;
  },
};
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
}

.main-right {
  margin-right: 3px;
}
</style>
