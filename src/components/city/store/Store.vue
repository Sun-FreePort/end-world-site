<template>
  <div>
    <w-flex justify-space-between class="blue-light5--bg pa1 wrap">
      <Goods></Goods>
      <Goods></Goods>
      <Goods></Goods>
    </w-flex>
  </div>
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
      human: 0,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
