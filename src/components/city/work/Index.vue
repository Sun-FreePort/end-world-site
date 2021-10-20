<template>
  <div>
    <NowWork />
  </div>
</template>

<script>
import NowWork from '@/components/city/work/NowWork.vue';

export default {
  name: 'Work',
  components: {
    NowWork,
  },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    workNow() {
      return this.$store.state.work;
    },
  },
  mounted() {
    const time = new Date(new Date().toLocaleDateString()).getTime();
    if (this.$store.state.work
      && this.$store.state.work.end_at < time / 1000) {
      this.$http.get('user/work')
        .then((response) => {
          console.info(response.data);
          this.$store.commit('setWork', response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
