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
    <w-flex justify-space-between class="blue-light5--bg pa1 wrap background">
      <Goods v-for="item in goods"
             :key="item.id"
             :id="item.id"
             :index="item.prop_id"
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
      goods: [],
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
    progress() {
      return (this.$store.state.user.weight / this.$store.state.user.weight_max) * 100;
    },
  },
  mounted() {
    this.$http.get('user/property')
      .then((response) => {
        this.goods = response.data;
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
