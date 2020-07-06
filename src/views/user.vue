<template>
  <div class="user">
    <myHeader>个人中心</myHeader>
    <div class="header" @click="$router.push('/UserEdit')">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <div class="content">
        <div class="detail">
          <span
            style="color:blue"
            class="iconfont iconxingbienan"
            v-if="info.gender === 1"
          ></span>
          <span style="color:red" class="iconfont iconxingbienv" v-else></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | time }}</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>
    <div class="main">
      <navBar @click="$router.push('/myFollow')">
        <template>我的关注</template>
        <template #content>关注的用户</template>
      </navBar>
      <navBar @click="$router.push('/myComment')">
        <template>我的跟帖</template>
        <template #content>跟帖/回复</template>
      </navBar>
      <navBar>
        <template>我的收藏</template>
        <template #content>视频/关注</template>
      </navBar>
      <navBar @click="$router.push('/UserEdit')">设置</navBar>
      <navBar @click="edit">退出</navBar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: ''
    }
  },
  async created() {
    const id = window.localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${id}`)
    // console.log(res)
    const { data, statusCode } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  },
  methods: {
    async edit() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '是否确认退出'
        })
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userId')
        this.$router.push('/Login')
        this.$toast.success('退出成功')
      } catch (e) {
        this.$toast.success('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 130px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  box-shadow: 0 3px 2px #ccc;
  > img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .content {
    flex: 1;
    margin-left: 10px;
    .iconfont {
      margin-right: 5px;
    }
    .time {
      color: #999;
    }
  }
}
.main {
  padding-left: 15px;
}
</style>
