<template>
  <CreateOrEdit :is-edit="true"></CreateOrEdit>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    CreateOrEdit: () => import('./components/CreateOrEdit.vue')
  }
})
</script>

<style scoped lang="scss">
</style>
