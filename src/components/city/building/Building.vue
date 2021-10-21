<template>
  <div>
    <w-card shadow class="box">
      <w-flex justify-space-between class="blue-light5--bg pa1">
        <div class="line">
          <img :src="building.icon" width="64" :alt="name">
        </div>
        <div class="line">
          <p>{{ building.name }}</p>
          <p>({{ $t('building.count', { count: count }) }} / {{ process }})</p>
        </div>
      </w-flex>

      <w-flex justify-space-between class="blue-light5--bg pa1">
        <div class="line">
          <p>{{ $t('building.productShow', { number: goods1.product, name: goods1.name }) }}</p>
        </div>
        <div class="line">
          <p>{{ $t('building.energyShow', { energy: building.energy }) }}</p>
        </div>
      </w-flex>

      <template #actions>
        <div class="spacer"></div>
        <w-button v-if="workStatus == 1"
                  @click="publishJobShow = true"
                  bg-color="error"
                  class="mr2">{{ $t('building.publishJob') }}</w-button>
        <w-button v-else-if="workStatus == 2"
                  @click="endJobShow = true"
                  bg-color="error"
                  class="mr2">{{ $t('building.endJob') }}</w-button>
        <w-button bg-color="warning"
                  class="mr2"
                  v-if="buildButtonShow"
                  @click="buildShow = true">{{ $t('building.build') }}</w-button>
        <w-button bg-color="success">详情</w-button>
      </template>
    </w-card>

    <!-- 垦荒 -->
    <w-dialog
        v-model="buildShow"
        :title="$t('building.build')"
        persistent
        :width="320">
      <p style="text-align: left; color: #7b828c">{{ $t('building.buildTip') }}<br /><br /></p>
      <w-input :label="$t('default.hour')"
               type="number"
               v-model="hour"></w-input>

      <template #actions>
        <div class="spacer" />
        <w-button
            class="mr2"
            @click="buildSubmit"
            bg-color="error">
          {{ $t('default.sure') }}
        </w-button>
        <w-button
            @click="buildShow = false"
            bg-color="success">
          {{ $t('default.cancel') }}
        </w-button>
      </template>
    </w-dialog>

    <!-- 开始工作 -->
    <w-dialog
        v-model="publishJobShow"
        :title="$t('building.publishJob')"
        persistent
        :width="320">
      <p style="text-align: left; color: #7b828c">{{ $t('building.publishJobTip') }}<br /><br /></p>
      <w-input :label="$t('goodsName.copperCoin')"
               type="number"
               v-model="pay"></w-input>

      <template #actions>
        <div class="spacer" />
        <w-button
            class="mr2"
            @click="publishJob"
            bg-color="error">
          {{ $t('default.sure') }}
        </w-button>
        <w-button
            @click="publishJobShow = false"
            bg-color="success">
          {{ $t('default.cancel') }}
        </w-button>
      </template>
    </w-dialog>

    <!-- 终止工作 -->
    <w-dialog
        v-model="endJobShow"
        :title="$t('building.endJob')"
        persistent
        :width="320">
      <p style="text-align: left; color: #2c3e50">{{ $t('building.endJobTip') }}</p>

      <template #actions>
        <div class="spacer" />
        <w-button
            class="mr2"
            @click="endJob"
            bg-color="error">
          {{ $t('default.sure') }}
        </w-button>
        <w-button
            @click="endJobShow = false"
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
  </div>
</template>

<script>
export default {
  name: 'Building',
  props: {
    index: Number, // 建筑索引
    self: Object, // 我的建筑
  },
  data() {
    return {
      process: this.$t('building.progressNone'),
      count: 0,
      workStatusUpdated: false,
      workStatus: 0,
      pay: 0,
      name: '',
      goods1: {
        name: '',
        product: 0,
      },
      endJobShow: false,
      publishJobShow: false,
      buildButtonShow: true,
      buildShow: false,
      hour: 1,
      tipShow: false,
      tip: '',
    };
  },
  computed: {
    work() {
      return this.$store.state.work;
    },
    building() {
      return this.$store.state.config.building[this.index - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        energy: 0,
        product1: 1,
        number1: 0,
      };
    },
  },
  beforeUpdate() {
    if (this.self) {
      this.count = this.self.count;
      if (this.self.land_has === this.self.land_occupy * 100) {
        this.process = this.$t('building.progressDone');
      } else {
        const landUnit = (this.self.land_occupy / this.count) * 100;
        const progress = ((this.self.land_has / landUnit) * 100) % 100;
        this.process = this.$t('building.progress', { number: progress });
      }

      if (!this.workStatusUpdated) {
        if (this.self.count > 1 || (this.self.count === 1 && this.process > 1)) {
          if (this.self.has_work === 0) {
            this.workStatus = 1;
          } else if (this.self.has_work === 1) {
            this.workStatus = 0;
          } else if (this.self.has_work === 2) {
            this.workStatus = 2;
          }
        } else {
          this.workStatus = 0;
        }
      }
    }
    this.goods1.name = (this.building.product1 === 0) ? 'DIY'
      : this.$store.state.config.goods[this.building.product1 - 1].name;
    this.goods1.name = this.$t(`goodsName.${this.goods1.name}`);
    this.goods1.product = (this.building.product1 === 0) ? '?' : this.getProduct(this.index, this.building.number1);

    if (this.work && this.work.job === this.index) {
      this.buildButtonShow = false;
    }
  },
  methods: {
    publishJob() {
      if (this.pay < 1) {
        this.tip = this.$t('building.payIsInt');
        this.tipShow = true;
        return false;
      }

      this.$http.post('city/job-notice', {
        id: this.self.id,
        pay: this.pay,
      }).then(() => {
        this.workStatus = 2;
        this.publishJobShow = false;
        this.workStatusUpdated = true;
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });

      return true;
    },
    endJob() {
      this.$http.delete(`city/job-notice?id=${this.self.id}&type=1`)
        .then(() => {
          this.workStatus = 1;
          this.endJobShow = false;
          this.workStatusUpdated = true;
        })
        .catch((error) => {
          this.tip = this.$t(`error.${error.response.data.message}`);
          this.tipShow = true;
        });

      return true;
    },
    buildSubmit() {
      if (this.work) {
        this.tip = this.$t('error.work201');
        this.tipShow = true;
        return false;
      }

      if (this.hour < 1 || this.hour > 16 || this.hour !== Math.round(this.hour)) {
        this.tip = this.$t('work.hourIsInt');
        this.tipShow = true;
        return false;
      }

      this.buildShow = false;
      this.$http.post('city/build', {
        index: this.index,
        hour: this.hour,
      }).then((response) => {
        this.$store.commit('setWork', response.data);
        this.$store.commit('consumeUserEnergy', 400 * this.hour);
        this.buildButtonShow = false;
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });

      return true;
    },
    getProduct(job, standardProduct) {
      const { city } = this.$store.state;
      if (!city) {
        return -999;
      }
      switch (job) {
        case 1:
          return Math.ceil((city.water / 10000) * standardProduct);
        case 2:
          return Math.ceil((city.water / 9500 - city.mine / 10500) * standardProduct);
        case 3:
          return 1;
        default:
          console.warn('程序问题：新工作未知，无法处理');
          return 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 4px;
}

.line {
  padding: 4px;
  position: relative;
}

.count {
  color: #ffffff;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
