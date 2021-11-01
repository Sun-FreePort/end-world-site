<template>
  <w-dialog
    persistent
    bg-color="amber-light5"
    :fullscreen="true">
    <w-flex justify-space-between class="pa3">
      <div class="title3 title-map">
        现在位置【{{ $t('mapName.' + map.name) }}】
      </div>
      <div>
        <w-button
          class="mr2 title-map"
          @click="close"
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
          <strong>{{ $t('mapName.' + item.name) }}</strong>
          <br><br>
          {{ $t('outskirts.danger' + item.danger) }}
        </div>
        <div class="xs6">
          <span v-if="item.isBack" style="color: #009999">{{ $t('outskirts.homeTarget') }}</span>
          <br><br>
          {{ item.goto }}
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
    id: Number,
  },
  data() {
    return {
      backHomeShow: false,
    };
  },
  computed: {
    map() {
      return this.$store.state.config.maps[this.id - 1];
    },
    maps() {
      const { maps } = this.$store.state.config;

      const mapsNow = [];
      for (let i = 0; i < maps.length; i += 1) {
        if (maps[i].linked.includes(this.id)) {
          maps[i].isBack = false;
          mapsNow.push(maps[i]);
        }
      }

      let isBackDeep = 9999;
      let isBackIndex = 9999;
      for (let i = 0; i < mapsNow.length; i += 1) {
        let linkText = '';
        mapsNow[i].linked.map((id) => {
          if (id !== this.id) {
            linkText += `${this.$t(`mapName.${maps[id - 1].name}`)}、`;
          }
          return true;
        });
        mapsNow[i].goto = this.$t('outskirts.canGoto') + linkText.slice(0, -1);

        if (isBackDeep > mapsNow[i].deep) {
          isBackDeep = mapsNow[i].deep;
          isBackIndex = i;
        }
      }
      // 翻译：通往大道之森、黑森林、荆棘谷地、黑暗池潭

      if (this.id !== 1) {
        mapsNow[isBackIndex].isBack = true;
      }

      return mapsNow;
    },
  },
  mounted() {
    if (this.id === 1) {
      this.backHomeShow = true;
    }
  },
  methods: {
    close() {
      this.$emit('eventname', { type: 'show' });
    },
    backHome() {
      this.$emit('eventname', { type: 'backHome' });
      this.close();
    },
    changeMap(id) {
      this.$emit('eventname', { type: 'change', val: id });
      this.close();
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
  line-height: 46px;
  height: 46px;
}
</style>
