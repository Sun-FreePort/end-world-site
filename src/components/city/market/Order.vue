<template>
  <w-card shadow>
    <p>
      {{ localName }}
      {{ $t('market.count', { number: number }) }}
      <br>
      {{ $t('market.price', { price: price }) }}
      {{ timeLimit }}
    </p>
  </w-card>
</template>

<script>
export default {
  name: 'Order',
  props: {
    name: String,
    price: Number,
    number: Number,
    end_at: Number,
  },
  computed: {
    localName() {
      return this.$t(`goodsName.${this.name}`);
    },
    timeLimit() {
      if (this.$store.getter.tsNow > this.end_at) {
        return this.$t('default.overdue');
      }
      const time = new Date(this.end_at);
      return this.getDate() + time.getHours() + this.getMinutes();
    },
  },
};
</script>

<style scoped>

</style>
