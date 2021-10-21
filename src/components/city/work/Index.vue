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
      <div v-if="jobsCount !== 0">
        <Job v-for="item in jobs"
             :key="item.id"
             :id="item.id"
             :boss_id="item.boss_id"
             :building_id="item.building_id"
             :amount="item.amount"
             :job="item.job"
             :product="item.product"
             :profit="item.profit"/>
      </div>
      <div v-else class="mb-8 pa3 blue-grey-dark2">
        {{ $t('work.zeroJob') }}
      </div>
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
        this.jobs = response.data.data;
        this.jobsCount = response.data.count;
      })
      .catch((err) => {
        console.error(err);
      });

    if (this.$store.state.work
      && this.$store.state.work.end_at < this.$store.getters.tsToday) {
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
