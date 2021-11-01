<template>
  <div class="home">
    <Header id="header" :version="ver" :human="human" />
    <img alt="Vue logo" src="../assets/logo.png" />

    <div>
      <Login v-if="isLogin" />
      <Register v-else />
      <hr style="margin-top: 18px;" />
      <footer style="margin: 20px;">
        <w-flex align-center class="wrapper">
          <div class="footer-box">
            <w-select :items="items"
                      v-model="$i18n.locale"
                      @item-click="selectLang"
                      outline>{{ $t('default.' + local) }}</w-select>
          </div>
          <div class="spacer"></div>
          <div class="footer-box">
            <w-button
              class="ma2"
              @click="clearConfig"
              bg-color="warning"
              shadow
              lg>
              {{ $t('config.clear') }}
            </w-button>
          </div>
        </w-flex>
      </footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/outside/Register.vue';
import Header from '@/components/outside/Header.vue';
import Login from '@/components/outside/Login.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Login,
    Register,
  },
  data() {
    return {
      isLogin: true,
      human: 0,
      ver: '?',
      local: localStorage.getItem('local') ?? 'en',
      items: [
        { label: this.$t('default.en'), value: 'en' },
        { label: this.$t('default.cns'), value: 'cns' },
      ],
    };
  },
  mounted() {
    if (this.$store.state.user.token) {
      return this.$router.push('/home');
    }

    this.$http.get('ver')
      .then((response) => {
        this.human = response.data.human;
        this.ver = response.data.ver.toString();
      })
      .catch((err) => {
        console.error(err);
      });

    return false;
  },
  methods: {
    // 清理缓存
    clearConfig() {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    },
    // 切换显示
    convertShow() {
      this.isLogin = !this.isLogin;
    },
    // 选择语言
    selectLang() {
      console.info(this.$i18n.locale);
      if (this.$i18n.locale === undefined) {
        this.$i18n.locale = localStorage.getItem('local') ?? 'en';
        this.local = localStorage.getItem('local') ?? 'en';
      }
      if (this.$i18n.locale !== localStorage.getItem('local')) {
        localStorage.setItem('local', this.$i18n.locale);
        this.local = this.$i18n.locale;
        this.items = [
          {
            label: this.$t('default.en'),
            value: 'en',
          },
          {
            label: this.$t('default.cns'),
            value: 'cns',
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#header {
  top: 0;
  width: 100%;
}
</style>
