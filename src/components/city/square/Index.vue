<template>
  <w-flex column align-center justify-start class="wrapper">
    <div class="box">荒地：{{ city.land }}</div>
    <div class="box">居民：{{ city.human }}</div>
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
               :talk="item.talk"/>
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

    <!-- 提示 -->
    <w-dialog
      v-model="tipShow"
      :width="250">
      <p>{{ tip }}</p>

      <template #actions>
        <div class="spacer" />
        <w-button @click="tipShow = false"
                  bg-color="info"
                  dark
                  lg>
          {{ $t('default.know') }}
        </w-button>
      </template>
    </w-dialog>
  </w-flex>
</template>

<script>
import Lecture from '@/components/city/square/Lecture.vue';

export default {
  name: 'Square',
  components: {
    Lecture,
  },
  data() {
    return {
      lecture: [],
      showTalk: false,
      talk: '',
      tipShow: false,
      tip: '',
      count: 0,
      page: 1,
      number: 10,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    city() {
      return this.$store.state.city;
    },
  },
  mounted() {
    this.$http.get(`city/square?page=${this.page}&number=${this.number}`)
      .then((response) => {
        this.count = response.data.count;
        this.lecture = response.data.data;
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
          this.count += 1;
          this.$store.commit('changeUserEnergy', -60);
          this.lecture.unshift({
            id: response.data,
            like: 0,
            dis: 0,
            talk: this.talk,
            name: this.user.name,
            avatar: this.user.avatar,
          });
        })
        .catch((error) => {
          this.tip = this.$t(`error.${error.response.data.message}`);
          this.tipShow = true;
        });
    },
  },
};
</script>

<style scoped>

</style>
