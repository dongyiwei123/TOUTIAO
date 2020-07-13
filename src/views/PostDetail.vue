<template>
  <div class="postDetail">
    <header class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <span class="iconfont iconnew"></span>
      <div class="follow">
        <span v-if="postList.has_follow === true" @click="cancel">已关注</span>
        <span @click="follow" v-else>关注</span>
      </div>
    </header>
    <div class="title">
      <p>{{ postList.title }}</p>
    </div>
    <div class="user">
      <span>{{ postList.user.nickname }}</span>
      <span>{{ postList.user.create_date | time }}</span>
    </div>
    <div class="content" v-html="postList.content" v-if="postList.type === 1"></div>
    <video :src="postList.content" v-else controls loop></video>
    <div class="likeShare">
      <div class="like" @click="like" :class="{ active: postList.has_like }">
        <span class="iconfont icondianzan"></span>
        <span>{{ postList.like_length }}</span>
      </div>
      <div class="weixin">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
    <!-- 评论区域 -->
    <div class="comment">
      <h3>精彩跟帖</h3>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <comment :comment="item" v-for="item in comment" :key="item.key"></comment>
      </van-list>
    </div>
    <!-- 底部区域 -->
    <footer class="footer">
      <div class="input" v-if="isShowInput">
        <div class="write">
          <input type="text" placeholder="写跟贴" @focus="focus" />
        </div>
        <span class="iconfont iconpinglun-">
          <span>{{ postList.comment_length }}</span>
        </span>
        <span class="iconfont iconshoucang" @click="star" :class="{ active: postList.has_star }"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <div class="textarea" v-else>
        <textarea :placeholder="'回复:'+replynmae" @blur="blur" ref="textarea" v-model="myComment"></textarea>
        <span @click="add">发表</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: {
        user: {}
      },
      comment: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      isShowInput: true,
      myComment: '',
      parent_id: '',
      replynmae: ''
    }
  },
  created() {
    this.getList()
    this.getComment()
    this.$bus.$on('reply', this.replyFn)
  },
  beforeDestroy() {
    this.comment = []
    this.$bus.$off('reply', this.replyFn)
  },
  methods: {
    async replyFn(id, name) {
      this.parent_id = id
      this.replynmae = name
      this.isShowInput = false
      this.myComment = ''
      // this.$nextTick().then(() => { this.$refs.textarea.focus() }).catch(err => err)
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async getList() {
      const { data: res } = await this.$axios.get(
        `/post/${this.$route.params.id}`
      )
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.postList = data
        // console.log(this.postList)
      }
    },
    async follow() {
      const token = localStorage.getItem('token')
      if (!token) {
        localStorage.setItem('routeUrl', this.$route.path)
        this.$router.push({
          path: '/login'
        })
        return
      }
      const { data: res } = await this.$axios.get(
        `/user_follows/${this.postList.user.id}`
      )
      if (res.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getList()
      }
    },
    async cancel() {
      const { data: res } = await this.$axios.get(
        `/user_unfollow/${this.postList.user.id}`
      )
      if (res.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getList()
      }
    },
    async like() {
      const token = localStorage.getItem('token')
      if (!token) {
        localStorage.setItem('routeUrl', this.$route.path)
        this.$router.push({
          path: '/login'
        })
        return
      }
      const { data: res } = await this.$axios.get(
        `/post_like/${this.postList.id}`
      )
      if (res.statusCode === 200) {
        this.$toast.success(res.message)
        this.getList()
      }
    },
    async star() {
      const token = localStorage.getItem('token')
      if (!token) {
        localStorage.setItem('routeUrl', this.$route.path)
        this.$router.push({
          path: '/login'
        })
        return
      }
      const { data: res } = await this.$axios.get(
        `/post_star/${this.postList.id}`
      )
      if (res.statusCode === 200) {
        this.$toast.success(res.message)
        this.getList()
      }
    },
    async getComment() {
      //   const { data: res } = await this.$axios.get(
      //     `/post_comment/${this.$route.params.id}`)
      const { data: res } = await this.$axios.get(
        `/post_comment/${this.$route.params.id}`,
        {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        }
      )
      const { statusCode, data } = res
      if (statusCode === 200) {
        // console.log(this.comment)
        this.comment = [...this.comment, ...data]
        // this.comment = this.comment.concat(data)
        // this.comment = data
        // console.log(this.comment)
        this.loading = false
        if (this.pageSize > data) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.pageIndex++
      this.getComment()
    },
    async focus() {
      this.isShowInput = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    blur() {
      if (this.myComment) {
        return
      }
      this.isShowInput = true
      this.replynmae = ''
    },
    async add() {
      await this.$nextTick()
      const token = localStorage.getItem('token')
      if (!token) {
        localStorage.setItem('routeUrl', this.$route.path)
        this.$router.push({
          path: '/login'
        })
        return
      }
      const { data: res } = await this.$axios.post(`/post_comment/${this.$route.params.id}`, {
        content: this.myComment,
        parent_id: this.parent_id
      })
      const { statusCode, message } = res
      if (statusCode === 200) {
        this.getList()
        this.getComment()
        this.isShowInput = true
        this.myComment = ''
        this.$toast.success(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.postDetail {
  padding: 0 15px 50px;
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
.likeShare {
  display: flex;
  justify-content: space-around;
  margin: 0 -15px;
  padding: 20px 0;
  box-shadow: 0 2px 2px #999;
  .like,
  .weixin {
    width: 80px;
    height: 30px;
    border: 1px solid #999;
    border-radius: 15px;
    line-height: 28px;
    text-align: center;
  }
  .like {
    .icondianzan {
      font-size: 16px;
    }
    span {
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .weixin {
    .iconweixin {
      font-size: 16px;
      color: #0bc90b;
    }
    span {
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .active {
    color: #f00;
    border-color: #f00;
  }
}
.comment {
  h3 {
    padding: 15px 0;
    text-align: center;
    font-size: 18px;
  }
}
.footer {
  .input {
    display: flex;
    position: fixed;
    height: 50px;
    width: 100%;
    margin-left: -15px;
    padding: 0 15px;
    background-color: #ccc;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    .write {
      input {
        width: 180px;
        height: 30px;
        border-radius: 15px;
        font-size: 14px;
        padding: 0 20px;
      }
    }
    > span {
      font-size: 25px;
    }
    .iconpinglun- {
      position: relative;
      > span {
        position: absolute;
        right: -20px;
        top: -2px;
        font-size: 12px;
        padding: 0 10px;
        background-color: #f00;
        border-radius: 12px;
        color: #fff;
      }
    }
    .active {
      color: red;
    }
  }
  .textarea {
    display: flex;
    position: fixed;
    width: 100%;
    padding: 20px 15px 10px;
    margin-left: -15px;
    background-color: #ccc;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    textarea {
      width: 260px;
      height: 90px;
      border-radius: 15px;
      padding: 10px;
    }
    span {
      width: 60px;
      height: 30px;
      margin-bottom: -60px;
      line-height: 30px;
      border-radius: 15px;
      text-align: center;
      background-color: #f00;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
