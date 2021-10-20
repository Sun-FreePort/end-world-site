<template>
  <w-flex column justify-center class="wrapper background">
    <Building v-for="item in building"
              :key="item.id"
              :index="item.id"
              :self="selfBuilding(item.id)"/>
  </w-flex>
</template>

<script>
import Building from '@/components/city/building/Building.vue';

export default {
  name: 'Index',
  components: {
    Building,
  },
  data() {
    return {
    };
  },
  computed: {
    building() {
      return this.$store.state.config.building;
    },
  },
  mounted() {
    this.$http.get('city/building')
      .then((response) => {
        this.$store.commit('setBuilding', response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    selfBuilding(index) {
      for (let i = 0; i < this.$store.state.building.length; i += 1) {
        if (this.$store.state.building[i].index === index) {
          return this.$store.state.building[i];
        }
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  min-height: 100px;
  margin-left: 4px;
}
</style>
