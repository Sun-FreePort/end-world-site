<template>
  <w-flex justify-space-between class="blue-light5--bg pa3 background">
    <div class="box">{{
        $t('default.date', {
          year: date.year,
          month: date.month,
          day: date.day,
          time: $t('time.' + date.time)
        })
      }}
    </div>
    <div class="box city">
      {{ city.name }} ({{ $t('mapName.' + map.name) }})
    </div>
  </w-flex>
</template>

<script>
export default {
  name: 'Header',
  props: {
    id: Number,
  },
  data() {
    return {
      date: {
        year: 7,
        month: 6,
        day: 15,
        time: 'nightfall',
      },
      city: {
        level: 1,
        name: '恒北城',
        land: 8702,
      },
    };
  },
  computed: {
    map() {
      return this.$store.state.config.maps[this.id - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: #fae5c7;
}

.city {
  color: #d10000;
}
</style>
