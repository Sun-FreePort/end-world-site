<template>
  <w-card class="card">
    <span class="name">{{ name }}</span>: {{ talk }}

    <template #actions>
      <w-flex justify-space-between>
        <div class="box">
          <w-button bg-color="success" class="mr2" @click="feel(1)">
            喝彩 ({{ like + likeAdd }})
          </w-button>
        </div>
        <div class="box">
          <w-button bg-color="error" @click="feel(-1)">
            嘘声 ({{ dis + disAdd }})
          </w-button>
        </div>
      </w-flex>
    </template>

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
  </w-card>
</template>

<script>
export default {
  name: 'Lecture',
  props: {
    id: Number,
    like: Number,
    dis: Number,
    name: String,
    avatar: String,
    talk: String,
  },
  data() {
    return {
      tipShow: false,
      tip: '',
      likeAdd: 0,
      disAdd: 0,
    };
  },
  methods: {
    feel(val) {
      this.$http.post('city/square/feel', {
        id: this.id,
        feel: val,
      })
        .then(() => {
          if (val === 1) {
            this.likeAdd += 1;
          } else {
            this.disAdd += 1;
          }
        })
        .catch((error) => {
          this.tip = this.$t(`error.${error.response.data.message}`);
          this.tipShow = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 4px;
  text-align: left;
}

.name {
  color: #42b983;
}
</style>
