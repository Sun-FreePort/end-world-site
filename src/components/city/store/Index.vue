<template>
  <w-flex justify-space-between class="blue-light5--bg pa1 wrap background">
    <Goods v-for="item in goods"
           :key="item.id"
           :id="item.id"
           :index="item.prop_id"
           :count="item.number"/>
  </w-flex>
</template>

<script>
import Goods from '@/components/city/store/Goods.vue';

export default {
  name: 'Store',
  components: {
    Goods,
  },
  data() {
    return {
      goods: [],
    };
  },
  mounted() {
    this.$http.get('user/property')
      .then((response) => {
        this.goods = response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

<style lang="scss" scoped>
.background {
  min-height: 100px;
  margin-left: 2px;
}
</style>
