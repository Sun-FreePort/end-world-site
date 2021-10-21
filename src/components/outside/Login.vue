<template>
  <w-form @success="login" v-model="valid" style="margin: 0 20px">
    <w-input :label="$t('user.email')"
             v-model="email"
             :validators="[validators.required]"></w-input>
    <w-input :label="$t('user.password')"
             v-model="password"
             :validators="[validators.required]"
             type="password"></w-input>
    <w-input :label="$t('user.name')"
             v-if="isNew"
             :validators="[validators.requiredIsNew]"
             v-model="name"></w-input>
    <w-flex class="mt4" wrap align-center justify-end>
      <w-switch class="md6"
                color="success"
                v-model="isNew">{{ $t('user.newActor') }}
      </w-switch>
    </w-flex>

    <div class="text-right mt6">
      <w-button class="my1 mr2" type="submit">
        {{ $t('user.login') }}
      </w-button>
      <w-button class="my1" type="submit" @click="gotoRegister">
        {{ $t('user.gotoRegister') }}
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
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isNew: false,
      alertShow: false,
      errorMessage: '',
      name: '',
      valid: false,
      validators: {
        required: (value) => !!value || this.$t('default.input.required'),
        requiredIsNew: (value) => (this.isNew && !!value) || this.$t('default.input.required'),
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

      const params = {
        email: this.email,
        password: this.password,
      };
      if (this.isNew) params.name = this.name;
      this.$http.post('login', params).then((response) => {
        this.$store.commit('setUser', response.data.player);
        this.$router.push('/home/square');
      }).catch((error) => {
        this.errorMessage = this.$t(`error.${error.response.data.message}`);
        this.alertShow = true;
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
