<template>
  <w-card shadow>
    <img :src="building.icon" width="64" :alt="name">

    <w-flex justify-space-between class="blue-light5--bg pa3">
      <div class="box">
        <p>{{ building.name }}</p>
      </div>
      <div class="box">
        <p>开垦中(44分钟)</p>
        <!-- 外面传进来 TODO 获取当前工作类型？ -->
      </div>
    </w-flex>

    <w-flex justify-space-between class="blue-light5--bg pa3">
      <div class="box">
        <p>精力：-10/h</p>
        <p>{{ $t('building.energyShow', { energy: building.energy }) }}</p>
      </div>
      <div class="box">
        <p>{{ $t('building.productShow', { number: goods1.product, name: goods1.name }) }}</p>
      </div>
    </w-flex>

    <template #actions>
      <div class="spacer"></div>
      <w-button bg-color="error" class="mr2">招聘</w-button>
      <w-button bg-color="warning" class="mr2">开垦</w-button>
      <w-button bg-color="success">详情</w-button>
    </template>
  </w-card>
</template>

<script>
export default {
  name: 'Building',
  props: {
    id: Number,
    index: Number, // 物品索引
    count: Number,
  },
  data() {
    return {
      goods1: {
        name: '',
        product: 0,
      },
    };
  },
  computed: {
    building() {
      return this.$store.state.config.building[this.index - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        energy: 0,
      };
    },
  },
  mounted() {
    console.info(this.building);
    // TODO i18 name
    this.goods1.name = this.$store.state.config.goods[this.building.product1 - 1].name;
    // TODO 计算本地 production 产量
    this.goods1.product = 0;
  },
};
</script>

<style scoped lang="scss">
.box {
  background-color: #001f50;
  border: 1px solid #55f;
  padding: 1px 4px 4px 1px;
  position: relative;
}

.count {
  color: #ffffff;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
