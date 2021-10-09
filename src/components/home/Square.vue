<template>
  <w-flex column align-center justify-start class="wrapper">
    <div class="box">荒地：425</div>
    <div class="box">居民：726</div>
    <div class="box">城市等级：12 级</div>
    <div class="box">委员会：暂无</div>
    <div class="box" style="color: beige">- - - - - -</div>
    <div class="box" style="margin-bottom: 4px">
      <w-button class="ma1" bg-color="info" shadow lg>我 要 演 讲</w-button>
    </div>
    <div class="box">
      <Lecture v-for="item in lecture"
               :key="item.id"
               :id="item.id"
               :dis="item.dis"
               :like="item.like"
               :name="item.name"
               :avatar="item.avatar"
               :message="item.message"/>
    </div>
  </w-flex>
</template>

<script>
import Lecture from '@/components/home/Lecture.vue';

export default {
  name: 'Square',
  components: {
    Lecture,
  },
  data() {
    return {
      city: {
        land: 0,
        human: 0,
        level: 0,
        manage: 'null',
      },
      lecture: [],
    };
  },
  mounted() {
    this.$http.get('city/square')
      .then((response) => {
        this.city = response.data.city;
        this.lecture = response.data.lecture;
      })
      .catch((err) => {
        console.error(err);
      });

    return false;
  },
};
</script>

<style scoped>

</style>
