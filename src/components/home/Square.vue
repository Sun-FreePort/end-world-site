<template>
  <w-flex column align-center justify-start class="wrapper">
    <div class="box">荒地：425</div>
    <div class="box">居民：726</div>
    <div class="box">城市等级：12 级</div>
    <div class="box">委员会：暂无</div>
    <div class="box" style="color: beige">- - - - - -</div>
    <div class="box" style="margin-bottom: 4px">
      <w-button class="ma1" bg-color="info" @click="showTalk = true" shadow lg>
        {{ $t('city.talk') }}
      </w-button>
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

    <!-- 演讲输入框 -->
    <w-dialog
      v-model="showTalk"
      :width="250">
      <w-textarea
        class="mt2"
        v-model="talk"
        :placeholder="$t('city.squareTalk')">
      </w-textarea>

      <template #actions>
        <div class="spacer" />
        <w-button @click="submitTalk"
                  bg-color="info"
                  dark
                  lg>
          {{ $t('default.submit') }}
        </w-button>
      </template>
    </w-dialog>
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
      showTalk: false,
      talk: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
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
  methods: {
    submitTalk() {
      this.showTalk = false;
      this.$http.post('city/square/lecture', { talk: this.talk })
        .then((response) => {
          switch (response.status) {
            case 200:
              this.lecture.shift({
                id: response.data.id,
                like: 0,
                dis: 0,
                talk: this.talk,
                name: this.user.name,
                avatar: this.user.avatar,
              });
              break;
            default:
              this.tip = this.$t(`error.square${response.status}`);
              this.show = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>

</style>
