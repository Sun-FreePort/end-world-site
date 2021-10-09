<template>
  <w-form @success="login" v-model="valid" style="margin: 0 20px">
    <w-input :label="$t('user.email')"
             v-model="email"
             :validators="[validators.required]"></w-input>
    <w-input :label="$t('user.password')"
             v-model="password"
             :validators="[validators.required]"
             type="password"></w-input>

    <div class="text-right mt6">
      <w-button class="my1 mr2" type="submit">
        {{ $t('user.login') }}
      </w-button>
      <w-button class="my1" type="submit" @click="gotoRegister">
        {{ $t('user.gotoRegister') }}
      </w-button>
    </div>
  </w-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      validators: {
        required: (value) => !!value || this.$t('default.input.required'),
        email: (value) => {
          const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!emailRegex.test(String(value).toLowerCase())) {
            return this.$t('default.input.need_email');
          }

          return !!value || this.$t('default.input.need_email');
        },
      },
    };
  },
  methods: {
    // 登录
    login() {
      if (!this.valid) return false;

      this.$http.post('login', {
        email: this.email,
        password: this.password,
      }).then((resonse) => {
        this.$store.commit('setUser', resonse.data.player);
        this.$router.push('/home');
      }).catch((error) => {
        console.error(error);
      });
      return true;
    },
    // 去注册
    gotoRegister() {
      this.$parent.convertShow();
    },
  },
};
</script>

<style scoped>

</style>
