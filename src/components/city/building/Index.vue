<template>
  <w-flex column justify-center class="wrapper background">
    <Building v-for="item in building"
              :key="item.id"
              :index="item.id"/>
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
};
</script>

<style lang="scss" scoped>
.background {
  min-height: 100px;
  margin-left: 4px;
}
</style>
