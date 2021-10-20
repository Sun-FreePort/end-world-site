<template>
  <w-card shadow class="box">
    <w-flex justify-space-between class="blue-light5--bg pa1">
      <div class="line">
        <p>{{ $t('jobName.' + job) }}</p>
      </div>
      <div class="line">
        <p>{{ $t('work.energyShow', { energy: building.energy }) }}</p>
        <p>{{ $t('work.profitShow', { number: profit }) }}</p>
      </div>
    </w-flex>

    <template #actions>
      <div class="spacer"></div>
      <w-button v-if="selfBuilding && selfBuilding.count > 1"
                bg-color="error" class="mr2">招聘</w-button>
      <w-button bg-color="warning"
                class="mr2"
                v-if="buildButtonShow"
                @click="buildShow = true">{{ $t('building.build') }}</w-button>
      <w-button bg-color="success">详情</w-button>
    </template>
  </w-card>
</template>

<script>
export default {
  name: 'Job',
  props: {
    id: Number,
    boss_id: Number,
    building_id: Number,
    amount: Number,
    job: Number,
    product: Number,
    pay: Number,
    profit: Number,
  },
  computed: {
    building() {
      return this.$store.state.config.building[this.job - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        energy: 0,
        product1: 1,
        number1: 0,
      };
    },
  },
};
</script>

<style scoped>

</style>
