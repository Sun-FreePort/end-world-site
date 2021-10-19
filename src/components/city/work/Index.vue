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
