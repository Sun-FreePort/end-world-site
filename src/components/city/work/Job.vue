<template>
  <w-card shadow class="box">
    <w-flex justify-space-between class="blue-light5--bg pa1">
      <div class="line">
        <strong>{{ $t('jobName.' + job) }}</strong>
        <p>{{ $t('work.amountShow', { number: amountNow }) }}</p>
      </div>
      <div class="line">
        <p>{{ $t('work.energyShow', { energy: building.energy }) }}</p>
        <p>{{ $t('work.profitShow', { number: profit }) }}</p>
      </div>
    </w-flex>

    <template #actions>
      <div class="spacer"></div>
      <w-button bg-color="error"
                class="mr2"
                @click="jobStartShow">{{ $t('work.start') }}</w-button>
      <w-button bg-color="success">{{ $t('default.detail') }}</w-button>
    </template>

    <!-- 应聘 -->
    <w-dialog
      v-model="jobShow"
      :title="$t('jobName.' + job)"
      persistent
      :width="320">
      <p style="text-align: left; color: #7b828c">
        {{ $t('work.workTip', { profit: profit, energy: building.energy }) }}
        <br><br>
      </p>
      <w-input :label="$t('default.hour')"
               type="number"
               v-model="hour"></w-input>

      <template #actions>
        <div class="spacer" />
        <w-button
          class="mr2"
          @click="jobStart"
          bg-color="error">
          {{ $t('default.sure') }}
        </w-button>
        <w-button
          @click="jobShow = false"
          bg-color="success">
          {{ $t('default.cancel') }}
        </w-button>
      </template>
    </w-dialog>

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
  name: 'Job',
  data() {
    return {
      tipShow: false,
      tip: '',
      jobShow: false,
      hour: 1,
      amountAdd: 0,
    };
  },
  props: {
    id: Number,
    boss_id: Number,
    building_id: Number,
    amount: Number,
    job: Number,
    product: Number,
    profit: Number,
  },
  computed: {
    amountNow() {
      return this.amount + this.amountAdd;
    },
    building() {
      return this.$store.state.config.building[this.job - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        energy: 0,
        product1: 1,
        number1: 0,
      };
    },
  },
  methods: {
    jobStartShow() {
      if (this.$store.state.work) {
        this.tip = this.$t('error.work201');
        this.tipShow = true;
        return false;
      }
      this.jobShow = true;
      return true;
    },
    jobStart() {
      if (this.$store.state.work) {
        this.tip = this.$t('error.work201');
        this.tipShow = true;
        return false;
      }

      if (this.hour < 1 || this.hour > 16 || this.hour !== Math.round(this.hour)) {
        this.tip = this.$t('work.hourIsInt');
        this.tipShow = true;
        return false;
      }

      this.jobShow = false;
      this.$http.post('work/job', {
        id: this.id,
        hour: this.hour,
      }).then((response) => {
        this.$store.commit('setWork', response.data);
        this.$store.commit('changeUserEnergy', -this.building.energy * this.hour);
        this.amountAdd -= 1;
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });

      return true;
    },
  },
};
</script>

<style scoped>

</style>
