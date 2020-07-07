<template>
  <div class="myStar">
    <myHeader>我的收藏</myHeader>
    <div class="star" v-for="item in list" :key="item.id">
      <div class="right">
        <p>{{item.title}}</p>
        <div class="reply">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="left">
        <img :src="$url(item.cover[0].url)" alt />
      </div>
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
.myStar {
  .star {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #999;
    font-size: 16px;
    color: #000;
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .reply {
        font-size: 14px;
        color: #999;
        > span {
          margin-right: 10px;
        }
      }
    }
    .left {
      img {
        width: 121px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
