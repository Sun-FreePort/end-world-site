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
      <w-button class="ma1 grow menu-button" bg-color="info" md
                @click="() => $router.push('/home/outskirts')">
        {{ $t('city.outskirts') }}
      </w-button>
    </div>

    <div class="box line">
      {{ user.name }}
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
        </w-progress>
      </div>
    </w-flex>

    <div class="box line">
      <w-button class="ma1 grow menu-button"
                bg-color="success"
                md>{{ $t('user.sign') }}
      </w-button>
    </div>
  </w-flex>
</template>

<script>
export default {
  name: 'Aside',
  computed: {
    user() {
      return this.$store.state.user;
    },
    happy() {
      return ((this.user.happy / this.user.happy_max) * 100);
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
};
</script>

<style lang="scss" scoped>
.line {
  margin-top: 3px;
  width: 100%;
}

.menu-button {
  width: 6em;
}
</style>
