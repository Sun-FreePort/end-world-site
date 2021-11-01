<template>
  <w-dialog
    persistent
    bg-color="amber-light5"
    :fullscreen="true">
    <div>
      <w-button
        class="mr2 title-map"
        @click="close"
        bg-color="info">
        {{ $t('default.close') }}
      </w-button>
    </div>
  </w-dialog>
</template>

<script>
export default {
  name: 'Knapsack',
  methods: {
    close() {
      this.$emit('eventname', { type: 'show' });
    },
  },
};
</script>

<style scoped>

</style>
