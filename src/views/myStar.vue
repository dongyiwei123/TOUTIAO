<template>
  <div class="myStar">
    <myHeader>我的收藏</myHeader>
    <myNew :post="item" @click="getDetail" v-for="item in list" :key="item.id"></myNew>
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
        data.forEach(item => {
          item.comment_length = item.comments.length
        })
        this.list = data
      }
    },
    getDetail(id) {
      this.$router.push(`/postDetail/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
