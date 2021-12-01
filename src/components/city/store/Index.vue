<template>
  <div>
    <w-progress class="ma1"
                v-model="progress"
                size="1.5em"
                color="warning-light2"
                label-color="info-dark2"
                label
                outline
                round>
      <strong>{{ weight }}</strong>
    </w-progress>
    <w-flex class="blue-light5--bg pa1 wrap background">
      <Goods v-for="item in goods"
             class="mr1 mb1"
             :key="item.interim"
             :id="item.id"
             :index="item.index"
             :count="item.number"/>
    </w-flex>
  </div>
</template>

<script>
import Goods from '@/components/city/store/Goods.vue';

export default {
  name: 'Store',
  components: {
    Goods,
  },
  data() {
    return {
      interim: 1,
    };
  },
  computed: {
    weight() {
      if (this.$store.state.user.weight > 1200) {
        return this.$t('user.weightKilo', {
          weight: Math.ceil(Math.round(this.$store.state.user.weight / 100) / 10),
        });
      }
      return this.$t('user.weight', { weight: this.$store.state.user.weight });
    },
    goods() {
      const { bag } = this.$store.state;
      for (let i = 0; i < bag.length; i += 1) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.interim += 1;
        bag[i].interim = this.interim;
      }
      return bag;
    },
    progress() {
      return (this.$store.state.user.weight / this.$store.state.user.weight_max) * 100;
    },
  },
  mounted() {
    this.$http.get('user/property')
      .then((response) => {
        console.info(response.data);
        this.$store.commit('setBag', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.background {
  min-height: 100px;
  margin-left: 2px;
}
</style>
