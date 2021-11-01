<template>
  <header>
    <Header />
  </header>
  <main style="margin: 0 10px;">
    <Map v-if="mapShow" :id="mapIndex" @eventname="mapChange"/>
    <Knapsack v-if="knapsackShow" @eventname="knapsackChange"/>
    <w-flex wrap class="text-center my5">
      <div class="xs6 pa1">
        <w-progress
          v-model="hpMonsterProgress"
          size="1.3em"
          round
          color="warning"
          label-color="warning-light3"
          label>
          {{ monster.hp }}
        </w-progress>
        <img width="140"
             height="170"
             alt="Enemy"
             class="pt1"
             src="../assets/monster1.png">
      </div>
      <div class="xs6 pa1">
        <w-progress
          v-model="hpProgress"
          size="1.3em"
          round
          color="error"
          label-color="warning-light3"
          label>
          {{ user.hp }}
        </w-progress>
        <img width="140"
             height="170"
             class="pt1"
             style="transform: scaleX(-1);"
             alt="Player"
             src="../assets/player.png">
      </div>
    </w-flex>
    <w-divider class="my3" color="blue-grey-light1">Player</w-divider>
    <w-flex align-center class="my3">
      <div class="title5">{{ $t('user.energy') }}：</div>
      <div class="spacer">
        <w-progress
          v-model="energyProgress"
          size="1.3em"
          round
          color="info-light3"
          label-color="blue"
          label>
          {{ user.energy }} / {{ user.energy_max }}
        </w-progress>
      </div>
    </w-flex>
    <w-flex align-center class="my3">
      <div class="title5">{{ $t('user.exp') }}：</div>
      <div class="spacer">
        <w-progress
          v-model="expProgress"
          size="1.3em"
          round
          color="success-light2"
          label-color="blue"
          label>
          {{ user.exp }} / {{ expMax }}
        </w-progress>
      </div>
    </w-flex>
    <div v-if="fighting">
      <w-button class="ma4">{{ $t('outskirts.fight') }}</w-button>
      <w-button class="ma4">{{ $t('outskirts.runaway') }}</w-button>
    </div>
    <div v-else>
      <w-button class="mx4"
                bg-color="success"
                color="yellow-light2"
                lg>{{ $t('outskirts.adventure') }}</w-button>
      <w-button class="mx4"
                @click="showMap"
                bg-color="error"
                color="amber-light2"
                lg>{{ $t('outskirts.map') }}</w-button>
      <w-button class="mx4"
                @click="showKnapsack"
                bg-color="primary"
                color="success-light2"
                lg>{{ $t('outskirts.knapsack') }}</w-button>
    </div>
    <w-divider class="my4" color="blue-grey-light1">Story</w-divider>
    <div v-for="item in info"
       :key="item.ts"
       class="my1 paragraph">
      <p v-if="item.type === 1">{{item.text}}</p>
      <p v-if="item.type === 2" v-html="item.text"></p>
    </div>
  </main>
</template>

<script>
import Header from '@/components/outskirts/Header.vue';
import Map from '@/components/outskirts/Map.vue';
import Knapsack from '@/components/outskirts/Knapsack.vue';

export default {
  name: 'Outskirts',
  components: {
    Header,
    Map,
    Knapsack,
  },
  data() {
    return {
      validators: {
        required: (value) => !!value || this.$t('default.input.required'),
      },
      fighting: false,
      mapShow: false,
      knapsackShow: false,
      info: [{
        ts: 2254428,
        type: 1,
        text: '今日风和日丽，你来到了郊外。',
      }, {
        ts: 2254452,
        type: 1,
        text: '你发现了一只壮岩兽，正当你准备避开它时，它却注意到了你。',
      }, {
        ts: 2254552,
        type: 2,
        text: '你抢先进攻，对壮岩兽造成了 <strong class="red">47</strong> 点伤害，血飙了出来，它怒吼一声，声震云霄。',
        value: 42,
      }, {
        ts: 2254652,
        type: 1,
        text: '壮岩兽愤怒的给了你一巴掌，却被你灵巧的避让开了。',
      }],
      mapIndex: 1,
      monster: {
        hp: 442,
        hp_max: 750,
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    hpMonsterProgress() {
      return (this.monster.hp / this.monster.hp_max) * 100;
    },
    hpProgress() {
      return (this.user.hp / this.user.hp_max) * 100;
    },
    energyProgress() {
      return (this.user.energy / this.user.energy_max) * 100;
    },
    expMax() {
      return Math.floor((1.2 ** this.user.level) * 83.4 + 50);
    },
    expProgress() {
      return ((this.user.exp / this.expMax) * 100);
    },
  },
  methods: {
    showKnapsack() {
      this.knapsackShow = true;
    },
    showMap() {
      this.mapShow = true;
    },
    knapsackChange(result) {
      switch (result.type) {
        case 'show':
          this.knapsackShow = false;
          break;
        case 'change':
          // TODO 改变外貌？
          break;
        default:
          console.error('不存在的类型');
      }
      console.info(result);
    },
    mapChange(result) {
      switch (result.type) {
        case 'show':
          this.mapShow = false;
          break;
        case 'change':
          this.mapIndex = result.val;
          break;
        case 'backHome':
          // TODO 清理本地缓存
          this.$router.push('/home');
          break;
        default:
          console.error('不存在的类型');
      }
      console.info(result);
    },
  },
};
</script>

<style lang="scss" scoped>
.paragraph {
  text-align: left;
  color: #3b5875;
  text-indent: 2em;
}
</style>
