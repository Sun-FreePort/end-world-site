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
                @click="() => $router.push('/home/outskirts')">
        {{ $t('city.outskirts') }}
      </w-button>
    </div>

    <div class="box line">
      {{ user.name }}
    </div>
    <div class="box line">
      {{ $t('user.energy') }}：{{ user.energy }}
      ({{ Math.round(user.energy / user.energy_max * 100) }}%)
    </div>
    <div class="box line">
      {{ $t('user.hungry') }}：{{ user.hungry }}
      ({{ Math.round(user.hungry / user.hungry_max * 100) }}%)
    </div>
    <div class="box line">
      {{ $t('user.hp') }}：{{ user.hp }}
      ({{ Math.round(user.hp / user.hp_max * 100) }}%)
    </div>
    <div class="box line">
      {{ $t('user.happy') }}：{{ user.happy }}
      ({{ Math.round(user.happy / user.happy_max * 100) }}%)
    </div>

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
  },
};
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
}

.menu-button {
  width: 6em;
}
</style>
