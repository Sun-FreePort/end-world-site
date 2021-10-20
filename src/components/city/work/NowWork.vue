<template>
  <w-card shadow class="box" v-if="work">
    <w-flex justify-space-between class="blue-light5--bg pa1">
      <p style="font-size: medium">{{ $t('jobName.' + work.job) }}</p>
    </w-flex>
    <w-flex justify-space-between class="blue-light5--bg pa1">
      <p>{{ $t('work.nowWork', { money: work.profit, min: lessTime }) }}</p>
    </w-flex>
    <w-flex column justify-center class="wrapper">
      <div>
        <w-progress
          value="50.3"
          size="2em"
          outline
          round
          label
          label-color="indigo-light4">
        </w-progress>
      </div>
    </w-flex>

    <template #actions>
      <div class="spacer"></div>
      <w-button bg-color="error" class="mr2">{{ $t('work.start') }}</w-button>
      <w-button bg-color="warning" class="mr2">{{ $t('work.end') }}</w-button>
    </template>

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
  </w-card>
</template>

<script>
export default {
  name: 'NowWork',
  data() {
    return {
      tipShow: false,
      tip: '',
    };
  },
  computed: {
    work() {
      if (this.$store.state.work.end_at < this.$store.getters.tsNow) {
        this.$store.commit('setWork', null);
        return null;
      }
      return this.$store.state.work;
    },
    progress() {
      if (!this.$store.state.work) return 0;

      const timeAll = 3600 * this.$store.state.work.hour;
      const timeDone = timeAll - (this.$store.state.work.end_at - this.$store.getters.tsNow);
      return (timeDone / timeAll) * 100;
    },
    lessTime() {
      if (!this.$store.state.work) return 0;

      return Math.floor((this.$store.state.work.end_at - this.$store.getters.tsNow) / 60);
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 4px;
}
</style>
