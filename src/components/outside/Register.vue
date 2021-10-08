<template>
  <w-form @success="register" style="margin: 0 20px">
    <w-input :label="$t('user.email')"
             v-model="email"
             :validators="[validators.required]"></w-input>
    <w-input :label="$t('user.password')"
             v-model="password"
             :validators="[validators.required]"
             type="password"></w-input>
    <w-input :label="$t('user.name')"
             v-model="name"
             :validators="[validators.required]"></w-input>
    <w-input :label="$t('user.code')"
             model-value="code"
             :validators="[validators.required]"></w-input>

    <div class="text-right mt6">
      <w-button class="my1 mr2" type="submit">
        {{ $t('user.register') }}
      </w-button>
      <w-button class="my1" type="submit" @click="gotoLogin">
        {{ $t('user.gotoLogin') }}
      </w-button>
    </div>
  </w-form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      code: '',
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
    // 注册
    register(event, ax) {
      console.info(event);
      console.info(ax);
      if (!this.valid) return false;

      this.$http.post('register', {
        email: this.email,
        password: this.password,
        name: this.name,
        code: this.code,
      }).then((resonse) => {
        console.info(resonse);
        this.$store.commit('setUser', resonse.data.player);
        this.$router.push('/home');
      }).catch((error) => {
        console.error(error);
      });
      return true;
    },
    // 去登录
    gotoLogin() {
      this.$parent.convertShow();
    },
  },
};
</script>

<style scoped>

</style>
