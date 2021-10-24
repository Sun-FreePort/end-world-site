<template>
  <w-flex basis-zero>
    <w-flex column justify-center class="wrapper">
      <NowWork />
      <div>
        <w-switch
          class="ma2"
          v-model="onlyMe"
          @update:model-value="workList"
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

    <!-- 提示 -->
    <w-dialog
      v-model="tipShow"
      :width="250">
      <p>{{ tip }}</p>

      <template #actions>
        <div class="spacer" />
        <w-button @click="tipShow = false"
                  bg-color="info"
                  dark
                  lg>
          {{ $t('default.know') }}
        </w-button>
      </template>
    </w-dialog>
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
      onlyMe: false,
      jobsCount: 0,
      jobs: [],
      tipShow: false,
      tip: '',
    };
  },
  computed: {
    workNow() {
      return this.$store.state.work;
    },
  },
  mounted() {
    this.workList();

    if (this.$store.state.work
      && this.$store.state.work.end_at < this.$store.getters.tsToday) {
      this.$http.get('user/work')
        .then((response) => {
          console.info(response.data);
          this.$store.commit('setWork', response.data);
        })
        .catch((error) => {
          this.tip = this.$t(`error.${error.response.data.message}`);
          this.tipShow = true;
        });
    }
  },
  methods: {
    workList() {
      let url = `work/list?page=${this.page}&number=${this.number}`;
      if (this.onlyMe) {
        url += '&self=1';
      }
      this.$http.get(url)
        .then((response) => {
          this.jobs = response.data.data;
          this.jobsCount = response.data.count;
        })
        .catch((error) => {
          this.tip = this.$t(`error.${error.response.data.message}`);
          this.tipShow = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 4px;
  text-align: left;
}
</style>
