<template>
  <div class="app">
    <!-- include: 指定需要缓存的组件， include中指定的是组件的名字 -->
    <keep-alive :include="stateList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['stateList'])
  }
}
</script>

<style></style>
