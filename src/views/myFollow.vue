<template>
  <div class="myFollow">
    <myHeader>我的关注</myHeader>
    <div class="follow" v-for="item in list" :key="item.id">
      <div class="avator">
        <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
      </div>
      <div class="content">
        <p>{{ item.nickname }}</p>
        <p class="time">{{ item.create_date | time }}</p>
      </div>
      <van-button round type="info" @click="cancelFollow(item.id)"
        >取消关注</van-button
      >
    </div>
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
      const { data: res } = await this.$axios.get('/user_follows')
      console.log(res)

      const { statusCode, data } = res
      if (statusCode === 200) {
        this.list = data
      }
    },
    async cancelFollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: ''
        })
        await this.$axios.get(`/user_unfollow/${id}`)
        this.getList()
        this.$toast.success('取消关注成功')
      } catch {
        this.$toast.success('放弃取消关注')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myFollow {
  .follow {
    display: flex;
    height: 80px;
    padding: 0 20px;
    border-bottom: 1px solid #999;
    align-items: center;
    .avator {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .content {
      flex: 1;
      margin-left: 15px;
      font-size: 14px;
      .time {
        color: #999;
      }
    }
    .van-button {
      height: 35px;
      .van-button__text {
        font-size: 12px;
      }
    }
  }
}
</style>
