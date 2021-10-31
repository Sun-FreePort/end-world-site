<template>
  <w-dialog
    persistent
    bg-color="amber-light5"
    :fullscreen="true">
    <w-flex justify-space-between class="pa3">
      <div class="title3 title-map">
        你能去以下地方：
      </div>
      <div>
        <w-button
          class="mr2 title-map"
          @click="closeMap"
          bg-color="info">
          {{ $t('default.close') }}
        </w-button>
      </div>
    </w-flex>
    <w-button v-if="backHomeShow"
              class="mb2 back-button"
              bg-color="success"
              color="yellow-light2"
              @click="backHome"
              shadow>{{ $t('outskirts.backHome') }}</w-button>
    <w-card v-for="item in maps"
            :key="item.id"
            class="my2"
            tile>
      <w-flex wrap class="text-left">
        <div class="xs3">
          <strong>{{ item.name }}</strong>
          <br><br>
          {{ $t('outskirts.danger' + item.danger) }}
        </div>
        <div class="xs6">
          <span v-if="item.isBack" style="color: #009999">{{ $t('outskirts.homeTarget') }}</span>
          <br><br>
          {{ item.goTo }}
        </div>
        <div class="xs3 text-right">
          <w-button
            @click="changeMap(item.id)"
            style="height: 100%;"
            bg-color="error"
            shadow>
            {{ $t('outskirts.goto') }}
          </w-button>
        </div>
      </w-flex>
    </w-card>
  </w-dialog>
</template>

<script>
export default {
  name: 'Map',
  props: {
    index: Number,
  },
  data() {
    return {
      backHomeShow: false,
    };
  },
  computed: {
    maps() {
      const mapsNow = [{
        id: 1,
        name: '西郊密林',
        monsters: [1, 2, 3],
        danger: 1,
        boss: 0,
        deep: 1,
        linked: [2],
      }, {
        id: 2,
        name: '林中小屋',
        monsters: [4, 5, 6],
        danger: 2,
        boss: 0,
        deep: 2,
        linked: [3],
      }, {
        id: 3,
        name: '藏尸处',
        monsters: [7, 8, 9],
        danger: 3,
        boss: 10,
        deep: 3,
        linked: [],
      }];

      let isBackDeep = 9999;
      let isBackIndex = 9999;
      for (let i = 0; i < mapsNow.length; i += 1) {
        if (isBackDeep > mapsNow[i].deep) {
          isBackDeep = mapsNow[i].deep;
          isBackIndex = i;
        }
      }
      // 翻译：通往大道之森、黑森林、荆棘谷地、黑暗池潭

      mapsNow[isBackIndex].isBack = true;

      return mapsNow;
    },
  },
  mounted() {
    if (this.index === 1) {
      this.backHomeShow = true;
    }
  },
  methods: {
    closeMap() {
      this.$emit('eventname', { type: 'show' });
    },
    backHome() {
      this.$emit('eventname', { type: 'backHome' });
      this.closeMap();
    },
    changeMap(index) {
      this.$emit('eventname', { type: 'change', val: index });
      this.closeMap();
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  text-align: left;
}

.back-button {
  width: 90%;
  height: 30px;
}

.title-map {
  line-height: 36px;
  height: 36px;
}
</style>
