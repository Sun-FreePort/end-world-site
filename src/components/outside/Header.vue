<template>
  <div id="header">
    <span>😎️居民：{{ human }}</span>
    <span>☘️版本：{{ version }}</span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    human: Number,
    version: String,
  },
};
</script>

<style lang="scss" scoped>
div {
  background: #ffee99;
  margin: 0;
  padding: 0;
  height: 40px;
}

span {
  padding: 0 20px;
  line-height: 40px;
}
</style>
