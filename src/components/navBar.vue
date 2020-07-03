<template>
  <div class="navBar" @click="$emit('click')">
    <div class="main">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <span class="iconfont iconjiantou1"></span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.navBar {
  display: flex;
  height: 49px;
  padding-right: 10px;
  line-height: 50px;
  border-bottom: 1px solid #999;
  font-size: 14px;
  color: #999;
  .main {
    color: #000;
  }
  .content {
    flex: 1;
    text-align: right;
  }
}
</style>
