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

    return false;
  },
  methods: {
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
