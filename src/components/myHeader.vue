<template>
  <div class="myHeader">
    <div class="myHeader_box">
      <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      <div class="title">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.myHeader {
  height: 49px;
  .myHeader_box {
    position: fixed;
    display: flex;
    padding-right: 25px;
    height: 49px;
    width: 100%;
    line-height: 49px;
    background-color: #ccc;
    font-size: 20px;
    z-index: 555;
    span {
      padding-left: 10px;
    }
    .title {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
