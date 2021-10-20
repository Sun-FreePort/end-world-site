<template>
  <w-card shadow class="box">
    <w-flex justify-space-between class="blue-light5--bg pa1">
      <div class="line">
        <p style="font-size: medium">{{ $t('jobName.' + work.job) }}</p>
        <p>{{ $t('work.nowWork', { money: work.profit, min: lessTime }) }}</p>
      </div>
      <div class="line">
        <p>{{ building.name }}</p>
        <p>({{ $t('building.count', { count: count }) }} / {{ process }})</p>
      </div>
    </w-flex>

    <w-flex justify-space-between class="blue-light5--bg pa1">
      <div class="line">
        <p>{{ $t('building.productShow', { number: goods1.product, name: goods1.name }) }}</p>
      </div>
      <div class="line">
        <p>{{ $t('building.energyShow', { energy: building.energy }) }}</p>
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
  name: 'Work'
};
</script>

<style scoped>

</style>
