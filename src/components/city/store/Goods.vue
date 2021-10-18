<template>
  <div class="box">
    <img :src="iconBase64" width="64" :alt="name">
    <p class="count">{{ count }}</p>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  props: {
    id: Number,
    index: Number, // 物品索引
    count: Number,
  },
  data() {
    return {
      name: 0,
      iconBase64: '',
    };
  },
  computed: {
    goods() {
      return this.$store.state.config.goods[this.index - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
    },
  },
  mounted() {
    // TODO i18 name
    this.name = this.goods.name;
    this.iconBase64 = this.goods.icon;
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
