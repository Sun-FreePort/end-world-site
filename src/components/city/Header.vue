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
      {{ city.name }} ({{ $t('user.levelNumber', { level: city.level }) }})
    </div>
  </w-flex>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      city: {
        level: 1,
        name: '恒北城',
        land: 8702,
      },
    };
  },
  computed: {
    date() {
      const date = {
        year: this.$store.getters.getYear,
        month: this.$store.getters.getMonth,
        day: this.$store.getters.getDay,
        hour: this.$store.getters.getHour,
        time: '',
      };
      switch (date.hour) {
        case 20:
        case 21:
        case 22:
        case 23:
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          date.time = 'night';
          break;
        case 6:
        case 7:
          date.time = 'cockcrow';
          break;
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
          date.time = 'forenoon';
          break;
        case 13:
          date.time = 'noon';
          break;
        case 14:
        case 15:
        case 16:
        case 17:
          date.time = 'afternoon';
          break;
        case 18:
        case 19:
          date.time = 'nightfall';
          break;
        default:
          console.error(`时间不对 ${date.hour}`);
          break;
      }
      return date;
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
