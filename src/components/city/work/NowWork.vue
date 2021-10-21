<template>
  <div>
    <w-card shadow class="box" v-if="work">
      <w-flex justify-start class="blue-light5--bg pa3">
        <w-progress
          class="mx1"
          circle
          color="blue"
          v-model="progress"
          size="5em"
          label>
        </w-progress>
        <w-flex basis-zero wrap>
          <div class="grow mx1">
            <w-flex column align-center justify-start class="wrapper">
              <div class="box">
                <strong style="font-size: medium">{{ $t('jobName.' + work.job) }}</strong>
              </div>
              <div class="box">
                <p>{{ $t('work.nowWork', { money: work.profit, min: lessTime }) }}</p>
              </div>
            </w-flex>
          </div>
        </w-flex>
      </w-flex>

      <template #actions>
        <div class="spacer"></div>
        <w-button bg-color="error" class="mr2">{{ $t('work.end') }}</w-button>
        <w-button bg-color="warning" class="mr2">{{ $t('work.detail') }}</w-button>
      </template>
    </w-card>
    <w-card shadow class="box" v-else>
      <w-flex justify-start class="blue-light5--bg pa3">
        <w-progress
          class="mx1"
          circle
          color="blue"
          v-model="progress"
          size="5em"
          label>
        </w-progress>
        <w-flex basis-zero wrap>
          <div class="grow mx1">
            <w-flex column align-center justify-start class="wrapper">
              <div class="box">
                <strong style="font-size: medium">-</strong>
              </div>
              <div class="box">
                <p>-</p>
              </div>
            </w-flex>
          </div>
        </w-flex>
      </w-flex>

      <template #actions>
        <div class="spacer"></div>
        {{ $t('work.needWork') }}
      </template>
    </w-card>

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
  </div>
</template>

<script>
export default {
  name: 'NowWork',
  data() {
    return {
      tipShow: false,
      tip: '',
      progress: 0,
    };
  },
  computed: {
    work() {
      if (!this.$store.state.work) return null;

      if (this.$store.state.work.end_at < this.$store.getters.tsNow) {
        this.$store.commit('setWork', null);
        return null;
      }
      return this.$store.state.work;
    },
    lessTime() {
      if (!this.$store.state.work) return 0;

      return Math.floor((this.$store.state.work.end_at - this.$store.getters.tsNow) / 60);
    },
  },
  mounted() {
    if (!this.$store.state.work) return false;

    this.refreshProgress();

    return true;
  },
  methods: {
    refreshProgress() {
      const timeAll = 3600 * this.$store.state.work.hour;
      const timeDone = timeAll - (this.$store.state.work.end_at - this.$store.getters.tsNow);
      this.progress = (timeDone / timeAll) * 100;

      if (this.progress > 100) {
        this.$store.commit('setWork', null);
        return false;
      }

      setTimeout(this.refreshProgress, 10000);
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 4px;
  text-align: left;
}
</style>
