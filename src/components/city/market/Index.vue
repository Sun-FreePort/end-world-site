<template>
  <w-flex wrap class="text-center">
    <div class="xs6 pa1">
      <w-button class="ma1 py3" bg-color="warning" @click="showSell" shadow lg>
        {{ $t('market.sellButton') }}
      </w-button>
    </div>
    <div class="xs6 pa1">
      <w-button class="ma1 py3" bg-color="info" shadow lg>
        {{ $t('market.historyButton') }}
      </w-button>
    </div>

    <Order/>

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
export default {
  name: 'Market',
  data() {
    return {
      sellShow: false,
      tipShow: false,
      tip: '',
    };
  },
  methods: {
    showSell() {
      this.sellShow = true;
    },
  },
};
</script>

<style scoped>
</style>
