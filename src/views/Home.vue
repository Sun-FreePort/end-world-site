<template>
  <div class="home">
    <Header id="header" :version="ver" :human="human" />
    <img alt="Vue logo" src="../assets/logo.png">

    <div>
      <div>{{i}}</div>
      <w-form style="margin: 0 20px">
        <w-input :label="$t('user.email')" :validators="[validators.required]"></w-input>
        <w-input :label="$t('user.password')" :validators="[validators.required]"></w-input>

        <div class="text-right mt6">
          <w-button
            class="my1 mr2"
            type="submit">{{ $t('user.login') }}</w-button>
          <w-button
            class="my1"
            type="submit">{{ $t('user.gotoRegister') }}</w-button>
        </div>
      </w-form>

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/outside/Header.vue';

export default {
  name: 'Home',
  components: {
    Header,
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
  mounted() {
    if (!this.$store.state.user.token) {
      console.info('123!');
      return this.$router.push('/');
    }

    this.$http.get('ver').then((response) => {
      this.human = response.data.human;
      this.ver = response.data.ver;
    }).catch((err) => {
      console.error(err);
    });

    return false;
  },
};
</script>

<style lang="scss" scoped>
#header {
  //position: absolute;
  top: 0;
  width: 100%;
}
</style>
