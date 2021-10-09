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
import Header from '@/components/home/Header.vue';
import Aside from '@/components/home/Aside.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      human: 0,
      ver: '?',
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
        this.human = response.data.human;
        this.ver = response.data.ver;
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
