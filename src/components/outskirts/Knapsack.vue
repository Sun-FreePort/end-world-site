<template>
  <w-dialog
    persistent
    bg-color="amber-light5"
    :fullscreen="true">
    <div>
      <w-button
        class="mb2 title-map"
        @click="close"
        style="width: 40%"
        bg-color="info">
        {{ $t('default.close') }}
      </w-button>
    </div>
    <w-list
      :items="items"
      color="pink"
      style="font-size: medium"
      hover>
    </w-list>

    <w-divider class="mx6" color="pink">Equip</w-divider>
    <w-flex justify-center class="blue-light5--bg pa3 mt2">
      <div class="box">
        <w-flex column class="wrapper">
          <div class="slot mt12"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="背   包"></div>
          <div class="slot mt8"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="武   器"></div>
        </w-flex>
      </div>
      <div class="box">
        <w-flex column justify-space-between class="wrapper">
          <div class="slot"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="头  部"></div>
          <div class="slot"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="上  身"></div>
          <div class="slot"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="下  身"></div>
          <div class="slot"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="足  部"></div>
        </w-flex>
      </div>
      <div class="box">
        <w-flex column justify-center class="wrapper">
          <div class="slot mt12"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="副   手"></div>
          <div class="slot mt8"><img
            width="48"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            alt="配   饰"></div>
        </w-flex>
      </div>
    </w-flex>

    <w-divider class="mx6" color="pink">Store</w-divider>
    <Index />
  </w-dialog>
</template>

<script>
import Index from '@/components/city/store/Index.vue';

export default {
  name: 'Knapsack',
  components: {
    Index,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    items() {
      return [
        { label: this.$t('knapsack.hp', { number: this.user.hp }) },
        { label: this.$t('knapsack.attack', { max: this.user.attack_max, min: this.user.attack_min }) },
        { label: this.$t('knapsack.nimble', { number: this.user.nimble }) },
      ];
    },
  },
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$emit('eventname', { type: 'show' });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 4px;
}

.slot {
  background-color: #f9ec9b;
  border: 1px solid #ffc955;
}

.wrapper {
  background-color: #eef7ff;
  padding: 12px;
  height: 340px;
}
</style>
