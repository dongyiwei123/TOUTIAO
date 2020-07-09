<template>
  <div class="postDetail">
    <header class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <span class="iconfont iconnew"></span>
      <div class="follow">
        <span v-if="postList.has_follow===true" @click="cancel">已关注</span>
        <span @click="follow" v-else>关注</span>
      </div>
    </header>
    <div class="title">
      <p>{{postList.title}}</p>
    </div>
    <div class="user">
      <span>{{postList.user.nickname}}</span>
      <span>{{postList.user.create_date | time}}</span>
    </div>
    <div class="content" v-html="postList.content" v-if="postList.type===1"></div>
    <video :src="postList.content" v-else controls loop></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: {
        user: {}
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$axios.get(`/post/${this.$route.params.id}`)
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.postList = data
      }
    },
    async follow() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true,
            id: this.postList.id
          }
        })
        return
      }
      const { data: res } = await this.$axios.get(`/user_follows/${this.postList.user.id}`)
      if (res.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getList()
      }
    },
    async cancel() {
      const { data: res } = await this.$axios.get(`/user_unfollow/${this.postList.user.id}`)
      if (res.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.postDetail {
  padding: 15px;
  color: #000;
  font-size: 16px;
}
.header {
  display: flex;
  align-items: center;
  height: 50px;
  .iconjiantou2 {
    font-size: 16px;
    font-weight: 700;
  }
  .iconnew {
    flex: 1;
    font-size: 56px;
  }
  .follow {
    display: inline-block;
    width: 60px;
    height: 24px;
    border: 1px solid #999;
    border-radius: 12px;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
  }
}
.title {
  font-weight: 700;
  font-size: 18px;
}
.user {
  font-size: 14px;
  color: #666;
  span {
    margin-right: 10px;
  }
}
.content {
  margin-top: 10px;
  font-size: 12px;
}
video {
  margin-top: 10px;
  width: 100%;
}
</style>
