<template>
  <div class="myStar">
    <myHeader>我的收藏</myHeader>
    <myNew :post="list"></myNew>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$axios.get('/user_star')
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.list = data
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
