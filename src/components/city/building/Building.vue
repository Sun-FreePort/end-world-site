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
        <w-button v-if="selfBuilding && selfBuilding.count > 1"
                  bg-color="error" class="mr2">招聘</w-button>
        <w-button bg-color="warning" class="mr2" @click="buildShow = true">开垦</w-button>
        <w-button bg-color="success">详情</w-button>
      </template>
    </w-card>

    <w-dialog
      v-model="buildShow"
      :title="$t('building.build')"
      persistent
      :width="320">
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
  },
  data() {
    return {
      process: '待开垦',
      count: 0,
      goods1: {
        name: '',
        product: 0,
      },
      buildShow: false,
      hour: 1,
      tipShow: false,
      tip: '',
    };
  },
  computed: {
    building() {
      return this.$store.state.config.building[this.index - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        energy: 0,
        product1: 1,
        number1: 0,
      };
    },
    selfBuilding() {
      for (let i = 0; i < this.$store.state.building.length; i += 1) {
        if (this.$store.state.building[i].index === this.index - 1) {
          return this.$store.state.building[i];
        }
      }
      return null;
    },
  },
  mounted() {
    if (this.selfBuilding) {
      this.count = this.selfBuilding.count;
      this.process = this.selfBuilding.land_occupy / (this.selfBuilding.land_has * 100);
      this.process += '%';
    }
    this.goods1.name = (this.building.product1 === 0) ? 'DIY'
      : this.$store.state.config.goods[this.building.product1 - 1].name;
    this.goods1.name = this.$t(`goods.${this.goods1.name}`);
    this.goods1.product = (this.building.product1 === 0) ? '?' : this.getProduct(this.index, this.building.number1);
  },
  methods: {
    buildSubmit() {
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

      this.buildShow = false;
      this.$http.post('city/build', {
        index: this.index,
        hour: this.hour,
      }).then((response) => {
        console.info(response);
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
