<template>
  <div>
    <p>work</p>
    <Job />
  </div>
</template>

<script>
import Job from '@/components/city/store/Goods.vue';

export default {
  name: 'Work',
  components: {
    Job,
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

</style>
