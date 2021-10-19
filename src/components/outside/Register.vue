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

    <w-dialog
      v-model="alertShow"
      :width="320">
      <p>{{ errorMessage }}</p>

      <template #actions>
        <div class="spacer" />
        <w-button
          @click="alertShow = false"
          bg-color="error"
          dark>
          Close
        </w-button>
      </template>
    </w-dialog>
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
      alertShow: false,
      errorMessage: '',
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
    register() {
      this.$http.post('register', {
        email: this.email,
        password: this.password,
        name: this.name,
        code: this.code,
      }).then((response) => {
        console.info(response);
        this.$store.commit('setUser', response.data.player);
        this.$router.push('/home');
      }).catch((error) => {
        this.errorMessage = this.$t(`error.${error.response.data.message}`);
        this.alertShow = true;
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
