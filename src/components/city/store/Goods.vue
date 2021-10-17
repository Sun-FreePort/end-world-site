<template>
  <div class="box">
    <img src="../../../assets/logo.png" width="64" :alt="name">
    <p class="count">4200</p>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      name: 0,
    };
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
