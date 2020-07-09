<template>
  <div class="myContent">
    <myHeader>我的跟贴</myHeader>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="comment" v-for="(item,index) in list" :key="item.id">
        <p class="time">{{ item.create_date | time('YYYY-MM-DD HH:mm') }}</p>
        <div class="father" v-if="item.parent">
          <p class="reply">回复: &nbsp;{{ item.parent.user.nickname }}</p>
          <p>{{ item.parent.content }}</p>
        </div>
        <div class="oneComment">{{ item.content }}</div>
        <div class="article one-txt-cut">
          <p @click="goDetail(index)">原文: &nbsp;{{ item.post.title }}</p>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      const { data: res } = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res
      if (statusCode === 200) {
        // this.list = [...this.list, ...data]
        this.list = this.list.concat(data)
        this.pageIndex++
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      this.getComments()
    },
    goDetail(index) {
      this.$router.push(`/postDetail/${this.list[index].post.id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.myContent {
  .comment {
    position: relative;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid #999;
    .time {
      line-height: 40px;
    }
    .father {
      padding: 10px;
      background-color: #ddd;
      .reply {
        margin-bottom: 10px;
      }
    }
    .oneComment {
      padding: 20px 0 10px;
      color: #000;
    }
    .article {
      margin-bottom: 10px;
      width: 80%;
    }
    > span {
      position: absolute;
      bottom: 8px;
      right: 20px;
    }
  }
}
</style>
