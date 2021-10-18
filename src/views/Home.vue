<template>
  <header style="margin-bottom: 6px;">
    <Header id="header" :version="ver" :human="human"/>
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
      console.info('123!');
      return this.$router.push('/');
    }

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
