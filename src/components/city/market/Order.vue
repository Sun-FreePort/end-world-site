<template>
  <div>
    <w-card shadow @click="useOrConsume">
      <w-flex wrap class="text-center">
        <div class="xs7" style="text-align: left;">
          <div class="py1">{{ $t('market.orderTitle', {
            name: $t(`goodsName.${goods.name}`),
            number: number + numberAdd }) }}</div>
        </div>
        <div class="xs5">
          <div class="py1 green-dark3">{{ timeLimit }}</div>
        </div>
        <div class="xs12">
          <div class="py1">{{ $t('market.priceUnit', { price: price }) }}</div>
        </div>

        <div class="xs6">
          <div class="py1">
            <w-button
              @click="buyShow = true"
              width="90%"
              bg-color="success"
              color="yellow-light2">
              {{ $t('market.buy') }}
            </w-button>
          </div>
        </div>
        <div class="xs6">
          <div class="py1">
            <w-button
              @click="removeSubmit"
              width="90%"
              bg-color="primary"
              color="success-light2">
              {{ $t('market.remove') }}
            </w-button>
          </div>
        </div>
      </w-flex>
    </w-card>

    <!-- 购买 -->
    <w-dialog
      v-model="buyShow"
      :title="$t('market.buy') + $t(`goodsName.${this.goods.name}`)"
      :width="320">
      <p class="pb1 detail">{{ $t('market.buyTip') }}</p>
      <w-input :label="$t('default.number')"
               type="number"
               v-model="got"></w-input>

      <template #actions>
        <div class="spacer" />
        <w-button
          class="mr2"
          @click="buySubmit"
          bg-color="success"
          color="yellow-light2">
          {{ $t('market.buySubmit') }}
        </w-button>
      </template>
      <p class="pt2 detail">{{ $t('goods.effectTitle') }}</p>
      <p v-html="effect"></p>
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
  name: 'Order',
  props: {
    id: Number,
    user_id: Number,
    index: Number,
    price: Number,
    number: Number,
    end_at: Number,
  },
  data() {
    return {
      got: null,
      numberAdd: 0,
      overdue: false,
      buyShow: false,
      tipShow: false,
      tip: '',
      effect: '',
    };
  },
  computed: {
    goods() {
      return this.$store.state.config.goods[this.index - 1] ?? {
        name: '',
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
    },
    timeLimit() {
      if (this.overdue || this.$store.getters.tsNow > this.end_at) {
        return this.$t('default.overdue');
      }
      const time = new Date(this.end_at * 1000);
      return this.$t('market.overdueTime', {
        day: time.getDate(),
        hour: time.getHours(),
        minute: time.getMinutes(),
      });
    },
  },
  methods: {
    buySubmit() {
      const { user } = this.$store.state;
      if (user < this.got * this.price) {
        this.tip = this.$t('market.buyMoneyLimit', { number: Math.floor(user / this.price) });
        this.tipShow = true;
        return false;
      }
      if (this.got < 1 || this.got > this.number) {
        this.tip = this.$t('market.buyCountLimit', { number: this.got });
        this.tipShow = true;
        return false;
      }
      if (this.$store.state.submitting) {
        this.tip = this.$t('default.quickClick');
        this.tipShow = true;
        return false;
      }
      this.$store.commit('setSubmitting');
      this.buyShow = false;

      this.$http.put('city/market', {
        id: this.id,
        number: this.got,
      }).then(() => {
        this.$store.commit('cancelSubmitting');
        this.numberAdd -= this.got;
        this.$store.commit('changeUserWeight', this.got * this.goods.weight);
        if (this.user_id !== user.id) {
          this.$store.commit('changeUserMoney', -this.got * this.price);
        }
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;

        if (error.response.data.message === 'order424') {
          // TODO 获取金币数量
        } else if (error.response.data.message === 'order412') {
          // TODO 更新本单数量
        } else if (error.response.data.message === 'order404') {
          this.numberAdd -= this.number;
        }
      });

      return true;
    },
    removeSubmit() {
      if (this.$store.state.submitting) {
        this.tip = this.$t('default.quickClick');
        this.tipShow = true;
        return false;
      }
      this.$store.commit('setSubmitting');
      this.buyShow = false;

      this.$http.delete(`city/market?id=${this.id}`).then(() => {
        this.$store.commit('cancelSubmitting');
        this.overdue = true;
        this.numberAdd -= this.number;
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });
      return true;
    },
    useOrConsume() {
      this.buyShow = true;
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

        if (this.effect === '') this.effect = this.$t('goods.effectNull');
        return true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  text-align: left;
  color: #7b828c;
}
</style>
