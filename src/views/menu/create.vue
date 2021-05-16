<template>
  <CreateOrEdit :is-edit="false"></CreateOrEdit>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit: () => import('./components/CreateOrEdit.vue')
  }
})
</script>

<style scoped lang="scss">
</style>
