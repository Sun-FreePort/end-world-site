<template>
  <div class="box" @click="useOrConsume">
    <img :src="iconBase64" width="64" :alt="name">
    <p class="count">{{ countNow }}</p>

    <!-- 消耗 -->
    <w-dialog
      v-model="useShow"
      :title="name"
      persistent
      :width="320">
      <p style="text-align: left; color: #7b828c">
        {{ $t('goods.consumeTip') }}<br /><br />
        {{ $t('goods.effectTitle') }}
      </p>
      <p v-html="effect"></p>
      <w-input :label="$t('default.number')"
               type="number"
               v-model="number"></w-input>

      <template #actions>
        <div class="spacer" />
        <w-button
          class="mr2"
          @click="consumeSubmit"
          bg-color="error">
          {{ $t('goods.consume') }}
        </w-button>
        <w-button
          class="mr2"
          @click="discardSubmit"
          bg-color="warning">
          {{ $t('default.discard') }}
        </w-button>
        <w-button
          @click="useShow = false"
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
  name: 'Goods',
  props: {
    id: Number,
    index: Number, // 物品索引
    count: Number,
  },
  data() {
    return {
      name: 0,
      number: 1,
      countAdd: 0,
      iconBase64: '',
      effect: '',
      useShow: false,
      tipShow: false,
      tip: '',
    };
  },
  computed: {
    goods() {
      return this.$store.state.config.goods[this.index - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
    },
    countNow() {
      return this.count + this.countAdd;
    },
  },
  mounted() {
    this.name = this.$t(`goodsName.${this.goods.name}`);
    this.iconBase64 = this.goods.icon;
  },
  methods: {
    useOrConsume() {
      this.useShow = true;
      this.effect = '';
      Object.keys(this.goods.effect).map((key) => {
        switch (key) {
          case 'hp-p':
            this.effect += this.$t('goods.effectHpP', { number: this.goods.effect[key] });
            break;
          case 'hungry-p':
            this.effect += this.$t('goods.effectHungryP', { number: this.goods.effect[key] });
            break;
          case 'energy-p':
            this.effect += this.$t('goods.effectEnergyP', { number: this.goods.effect[key] });
            break;
          case 'happy-p':
            this.effect += this.$t('goods.effectHappyP', { number: this.goods.effect[key] });
            break;
          case 'att-a':
            this.effect += this.$t('goods.effectAttA', { number: this.goods.effect[key] });
            break;
          case 'att-i':
            this.effect += this.$t('goods.effectAttI', { number: this.goods.effect[key] });
            break;
          case 'def':
            this.effect += this.$t('goods.effectDef', { number: this.goods.effect[key] });
            break;
          case 'money':
            this.effect += this.$t('goods.effectMoney', { number: this.goods.effect[key] });
            break;
          case 'gold':
            this.effect += this.$t('goods.effectGold', { number: this.goods.effect[key] });
            break;
          default:
            console.error(`${key} is new effect in goods config`);
            break;
        }
        return true;
      });
    },
    discardSubmit() {
      this.tip = '本功能尚未开通';
      // this.tip = this.$t(`error.${error.response.data.message}`);
      this.tipShow = true;
    },
    consumeSubmit() {
      if (this.number < 0 || this.number > this.countNow) {
        this.tip = this.$t('goods.useLimit', { number: this.countNow });
        this.tipShow = true;
        return false;
      }

      this.useShow = false;
      this.$http.post('user/consume', {
        index: this.index,
        number: this.number,
      }).then((response) => {
        this.countAdd -= response.data;

        Object.keys(this.goods.effect).map((key) => {
          const val = this.goods.effect[key];
          switch (key) {
            case 'hp-p':
              this.$store.commit('changeUserHp', val * response.data);
              break;
            case 'hungry-p':
              this.$store.commit('changeUserHungry', val * response.data);
              break;
            case 'energy-p':
              this.$store.commit('changeUserEnergy', val * response.data);
              break;
            case 'happy-p':
              this.$store.commit('changeUserHappy', val * response.data);
              break;
            case 'att-a':
              // $user['attack_max'] += val * response.data;
              break;
            case 'att-i':
              // $user['attack_min'] += val * response.data;
              break;
            case 'def':
              // $user['nimble'] += val * response.data;
              break;
            case 'money':
              this.$store.commit('changeUserMoney', val * response.data);
              break;
            case 'gold':
              this.$store.commit('changeUserGold', val * response.data);
              break;
            default:
              console.error(`${key} is new effect in goods config`);
              break;
          }
          return true;
        });

        if (this.countNow <= 0) {
          this.$destroy();
          this.$el.parentNode.removeChild(this.$el);
        }
        return true;
      }).catch((error) => {
        console.info(error);
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });

      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.box {
  background-color: #fff8cd;
  border: 1px solid #55f;
  padding: 1px 4px 4px 1px;
  position: relative;
}

.count {
  color: #ff0000;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
