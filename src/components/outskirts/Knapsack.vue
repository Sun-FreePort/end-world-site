<template>
  <div>
    <!-- 装备栏 -->
    <w-dialog
      persistent
      bg-color="amber-light5"
      :fullscreen="true">
      <div>
        <w-button
          class="mb2 title-map"
          @click="close"
          style="width: 40%"
          bg-color="info">
          {{ $t('default.close') }}
        </w-button>
      </div>
      <w-list
        :items="items"
        color="pink"
        style="font-size: medium"
        hover>
      </w-list>

      <w-divider class="mx6" color="pink">Equip</w-divider>
      <w-flex justify-center class="blue-light5--bg pa3 mt2">
        <div class="box">
          <w-flex column class="wrapper">
            <div class="slot mt12"><img
              width="48"
              :src="getImgForGoods(bag.icon)"
              @click="showEquip('bag')"
              alt="背   包"></div>
            <div class="slot mt8"><img
              width="48"
              :src="getImgForGoods(weapon.icon)"
              @click="showEquip('weapon')"
              alt="武   器"></div>
          </w-flex>
        </div>
        <div class="box">
          <w-flex column justify-space-between class="wrapper">
            <div class="slot"><img
              width="48"
              :src="getImgForGoods(helmet.icon)"
              @click="showEquip('helmet')"
              alt="头  部"></div>
            <div class="slot"><img
              width="48"
              :src="iconBlank"
              alt="上  身"></div>
            <div class="slot"><img
              width="48"
              :src="iconBlank"
              alt="下  身"></div>
            <div class="slot"><img
              width="48"
              :src="iconBlank"
              alt="足  部"></div>
          </w-flex>
        </div>
        <div class="box">
          <w-flex column justify-center class="wrapper">
            <div class="slot mt12"><img
              width="48"
              :src="getImgForGoods(shield.icon)"
              @click="showEquip('shield')"
              alt="副   手"></div>
            <div class="slot mt8"><img
              width="48"
              :src="iconBlank"
              alt="配   饰"></div>
          </w-flex>
        </div>
      </w-flex>

      <w-divider class="mx6" color="pink">Store</w-divider>
      <Index />
    </w-dialog>

    <!-- 细节面板 -->
    <w-dialog
      v-model="equipShow"
      :persistent="false"
      :width="250">
      <p>{{ equipNow.name }}</p>

      <template #actions>
        <div class="spacer" />
        <w-button @click="equipShow = false"
                  bg-color="info"
                  dark
                  lg>
          {{ $t('default.know') }}
        </w-button>
        <w-button @click="undress"
                  class="ml2"
                  bg-color="info"
                  dark
                  lg>
          {{ $t('goods.undress') }}
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
import Index from '@/components/city/store/Index.vue';

export default {
  name: 'Knapsack',
  components: {
    Index,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    weapon() {
      const item = {
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
      if (this.user.weapon_id) {
        const cache = this.user.weapon_cache;
        item.id = cache.id;
        item.area = 2;
        item.name = this.$t(`goodsName.${this.$store.state.config.goods[cache.index - 1].name}`) ?? '';
        item.icon = this.$store.state.config.goods[cache.index - 1].icon;
      }
      return item;
    },
    helmet() {
      const item = {
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
      if (this.user.helmet_id) {
        const cache = this.user.helmet_cache;
        item.id = cache.id;
        item.area = 3;
        item.name = this.$t(`goodsName.${this.$store.state.config.goods[cache.index - 1].name}`);
        item.icon = this.$store.state.config.goods[cache.index - 1].icon;
      }
      return item;
    },
    shield() {
      const item = {
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
      if (this.user.shield_id) {
        const cache = this.user.shield_cache;
        item.id = cache.id;
        item.area = 4;
        item.name = this.$t(`goodsName.${this.$store.state.config.goods[cache.index - 1].name}`);
        item.icon = this.$store.state.config.goods[cache.index - 1].icon;
      }
      return item;
    },
    bag() {
      const item = {
        icon: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      };
      if (this.user.bag_id) {
        const cache = this.user.bag_cache;
        item.id = cache.id;
        item.area = 5;
        item.name = this.$t(`goodsName.${this.$store.state.config.goods[cache.index - 1].name}`);
        item.icon = this.$store.state.config.goods[cache.index - 1].icon;
      }
      return item;
    },
    items() {
      return [
        { label: this.$t('knapsack.hp', { number: this.user.hp, max: this.user.hp_max }) },
        { label: this.$t('knapsack.attack', { max: this.user.attack_max, min: this.user.attack_min }) },
        { label: this.$t('knapsack.defence', { number: this.user.defence }) },
        { label: this.$t('knapsack.nimble', { number: this.user.nimble }) },
        { label: this.$t('knapsack.vision', { number: this.user.vision }) },
      ];
    },
  },
  data() {
    return {
      equipShow: false,
      tipShow: false,
      tip: '',
      iconBlank: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
      equipNow: {
        name: '',
        icon: '',
      },
    };
  },
  methods: {
    getImgForGoods(name) {
      if (!name) return '';

      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(`@/assets/goods/${name}`);
    },
    close() {
      this.$emit('eventname', { type: 'show' });
    },
    // 展示细节面板
    showEquip(name) {
      const item = this[name];
      if (!item.id) {
        return false;
      }
      // if (this.price < 1) {
      //   this.tip = this.$t('market.priceLimit');
      //   this.tipShow = true;
      //   return false;
      // }
      this.equipNow = {
        id: item.id,
        key: name,
        icon: item.icon,
        name: item.name,
        area: item.area,
      };
      this.equipShow = true;
      return true;
    },
    // 卸装
    undress() {
      this.equipShow = false;
      this.$http.post('user/undress', {
        area: this.equipNow.area,
      }).then((response) => {
        this.$store.commit('setUser', response.data);

        this.$http.get('user/property')
          .then((response2) => {
            this.$store.commit('setBag', response2.data);
          })
          .catch((error) => {
            console.error(error);
          });
        return true;
      }).catch((error) => {
        this.tip = this.$t(`error.${error.response.data.message}`);
        this.tipShow = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 4px;
}

.slot {
  background-color: #f9ec9b;
  border: 1px solid #ffc955;
}

.wrapper {
  background-color: #eef7ff;
  padding: 12px;
  height: 340px;
}
</style>
