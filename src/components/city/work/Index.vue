<template>
  <w-flex basis-zero>
    <w-flex column justify-center class="wrapper">
      <NowWork />
      <div>
        <w-switch
          class="ma2"
          :value="true"
          thin
          color="warning"
          :label="$t('work.onlyMe')">
        </w-switch>
      </div>
      <Job v-for="item in jobs"
               :key="item.id"
               :id="item.id"
               :boss_id="item.boss_id"
               :building_id="item.building_id"
               :amount="item.amount"
               :job="item.job"
               :product="item.product"
               :pay="item.pay"
               :profit="item.profit"/>
    </w-flex>
  </w-flex>
</template>

<script>
import NowWork from '@/components/city/work/NowWork.vue';
import Job from '@/components/city/work/Job.vue';

export default {
  name: 'Work',
  components: {
    NowWork,
    Job,
  },
  data() {
    return {
      page: 1,
      number: 10,
      jobsCount: 0,
      jobs: [],
    };
  },
  computed: {
    workNow() {
      return this.$store.state.work;
    },
  },
  mounted() {
    this.$http.get(`work/list?page=${this.page}&number=${this.number}`)
      .then((response) => {
        console.info(response.data);
        this.jobs = response.data.data;
        this.jobsCount = response.data.count;
      })
      .catch((err) => {
        console.error(err);
      });

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
.box {
  margin-bottom: 4px;
  text-align: left;
}
</style>
