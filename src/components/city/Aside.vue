<template>
  <w-flex column align-center justify-start class="wrapper">
    <div class="box"><img width="112" alt="City Avatar" src="https://img2.baidu.com/it/u=1881182452,3230762371&fm=26&fmt=auto"></div>
    <div class="box line">
      <w-button class="ma1 grow menu-button" bg-color="info" md
                @click="() => $router.push('/home/square')">
        {{ $t('city.square') }}
      </w-button>
    </div>
    <div class="box line">
      <w-button class="ma1 grow menu-button" bg-color="info" md
                @click="() => $router.push('/home/market')">
        {{ $t('city.market') }}
      </w-button>
    </div>
    <div class="box line">
      <w-button class="ma1 grow menu-button" bg-color="info" md
                @click="() => $router.push('/home/store')">
        {{ $t('city.store') }}
      </w-button>
    </div>
    <div class="box line">
      <w-button class="ma1 grow menu-button" bg-color="info" md
                @click="() => $router.push('/home/work')">
        {{ $t('city.work') }}
      </w-button>
    </div>
    <div class="box line">
      <w-button class="ma1 grow menu-button" bg-color="info" md
                @click="() => $router.push('/home/building')">
        {{ $t('city.building') }}
      </w-button>
    </div>
    <div class="box line">
      <w-button class="ma1 grow menu-button" bg-color="info" @click="gotoOutskirts" md>
        {{ $t('city.outskirts') }}
      </w-button>
    </div>

    <div class="box line">
      <h3>{{ user.name }}</h3>
    </div>
    <w-flex align-center class="wrapper line">
      <div class="box">{{ $t('user.energy') }}:</div>
      <div class="spacer">
        <w-progress
          v-model="energy"
          size="1.3em"
          outline
          round
          label
          label-color="teal-light5"
          color="light-blue"
          stripes>
          {{ user.energy }}
        </w-progress>
      </div>
    </w-flex>
    <w-flex align-center class="wrapper line">
      <div class="box">{{ $t('user.level') }}:</div>
      <div class="spacer">
        {{ $t('user.levelNumber', { level: user.level }) }}
      </div>
    </w-flex>
    <w-flex align-center class="wrapper line">
      <div class="box">{{ $t('user.exp') }}:</div>
      <div class="spacer">
        <w-progress
          v-model="exp"
          size="1.3em"
          outline
          round
          label
          label-color="teal-light5"
          color="light-blue"
          stripes>
          {{ user.exp }}
        </w-progress>
      </div>
    </w-flex>
    <w-flex align-center class="wrapper line">
      <div class="box">{{ $t('user.hungry') }}:</div>
      <div class="spacer">
        <w-progress
          v-model="hungry"
          size="1.3em"
          outline
          round
          label
          label-color="teal-light5"
          color="light-blue"
          stripes>
          {{ user.hungry }}
        </w-progress>
      </div>
    </w-flex>
    <w-flex align-center class="wrapper line">
      <div class="box">{{ $t('user.hp') }}:</div>
      <div class="spacer">
        <w-progress
          v-model="hp"
          size="1.3em"
          outline
          round
          label
          label-color="teal-light5"
          color="light-blue"
          stripes>
          {{ user.hp }}
        </w-progress>
      </div>
    </w-flex>
    <w-flex align-center class="wrapper line">
      <div class="box">{{ $t('user.happy') }}:</div>
      <div class="spacer">
        <w-progress
          v-model="happy"
          size="1.3em"
          outline
          round
          label
          label-color="teal-light5"
          color="light-blue"
          stripes>
          {{ user.happy }}
        </w-progress>
      </div>
    </w-flex>
    <w-flex column justify-center class="wrapper line">
      <p class="box">
        <img :src="goldCoin" width="16" alt="gold">
        {{ $t('user.gold', { number: user.gold }) }}
        <br>
        <img :src="copperCoin" width="16" alt="money">
        {{ $t('user.money', { number: user.money }) }}
      </p>
    </w-flex>

    <div class="box line" v-if="signShow">
      <w-button class="ma1 grow menu-button"
                bg-color="success"
                @click="sign"
                md>{{ $t('user.sign') }}
      </w-button>
    </div>

    <div class="box line">
      <w-button class="ma1 grow menu-button"
                bg-color="error"
                @click="logout"
                md>{{ $t('user.logout') }}
      </w-button>
    </div>

    <!-- 提示 -->
    <w-dialog
      v-model="tipShow"
      :width="250">
      <p>{{ tip }}</p>

      <template #actions>
        <div class="spacer" />
        <w-button @click="tipShow = false"
                  bg-color="info"
                  dark
                  lg>
          {{ $t('default.know') }}
        </w-button>
      </template>
    </w-dialog>
  </w-flex>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
      signShow: false,
      tipShow: false,
      tip: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    goldCoin() {
      if (!this.$store.state.config.goods.length) return '';
      return this.$store.state.config.goods[1].icon;
    },
    copperCoin() {
      if (!this.$store.state.config.goods.length) return '';
      return this.$store.state.config.goods[0].icon;
    },
    happy() {
      return ((this.user.happy / this.user.happy_max) * 100);
    },
    exp() {
      const expMax = (1.2 ** this.user.level) * 83.4 + 50;
      return ((this.user.exp / expMax) * 100);
    },
    hp() {
      return ((this.user.hp / this.user.hp_max) * 100);
    },
    hungry() {
      return ((this.user.hungry / this.user.hungry_max) * 100);
    },
    energy() {
      return ((this.user.energy / this.user.energy_max) * 100);
    },
  },
  mounted() {
    const signTime = localStorage.getItem('signTime');
    if (signTime && signTime > 1630000000000) { // FIXME 2021年11月 清理
      this.signShow = true;
    }
    if (!signTime || signTime < this.$store.getters.tsToday) {
      this.signShow = true;
    }

    this.userHPUpgrade();
  },
  methods: {
    gotoOutskirts() {
      const info = [{
        ts: this.$store.getters.tsNow,
        type: 1,
        text: '今日风和日丽，你来到了郊外。',
      }];
      localStorage.setItem('infoList', JSON.stringify(info));
      this.$router.push('/outskirts');
    },
    sign() {
      this.$http.get('activity/sign').then((response) => {
        switch (response.status) {
          case 200:
            this.tip = this.$t('user.signTip', { number: response.data });
            this.tipShow = true;
            this.$store.commit('changeUserMoney', response.data);
            break;
          default:
            this.tip = this.$t(`error.${response.data.message}`);
            this.tipShow = true;
            break;
        }
        localStorage.setItem('signTime', this.$store.getters.tsToday);
        this.signShow = false;
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });
    },
    logout() {
      this.$http.post('logout').then(() => {
        this.$store.commit('clearUser');
        this.signShow = false;
        this.$router.push('/');
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });
    },
    userHPUpgrade() {
      const time = localStorage.getItem('hpTime');
      if (!time || Math.round(time) < this.$store.getters.tsNow) {
        localStorage.setItem('hpTime', this.$store.getters.tsNow);
        this.$store.commit('changeUserHp', 1);
        setTimeout(this.userHPUpgrade, 1050);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  margin-top: 5px;
  width: 100%;
}

.menu-button {
  width: 6em;
}
</style>
