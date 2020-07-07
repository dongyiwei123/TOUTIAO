<template>
  <div class="home">
    <header class="header">
      <div class="loge">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <span class="iconfont iconsearch"></span>
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="$router.push('/User')">
        <span class="iconfont iconwode"></span>
      </div>
    </header>
    <!-- tab栏 -->
    <nav class="category">
      <van-tabs v-model="active" sticky animated swipeable>
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
        <van-tab :title="item.name" v-for="item in categoryList" :key="item.id">
          <myNew :post="postList"></myNew>
        </van-tab>
        <!-- </van-list> -->
      </van-tabs>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      categoryList: [],
      pageIndex: 1,
      pageSize: 10,
      postList: [],
      total: '',
      loading: false,
      finished: false
    }
  },
  created() {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const { data: res } = await this.$axios.get('/category')
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.categoryList = data
        // console.log(this.categoryList)
        this.getPostList(0)
      }
    },
    async getPostList(id) {
      const { data: res } = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      // console.log(res)
      const { statusCode, data, total } = res
      if (statusCode === 200) {
        this.postList = data
        this.total = total
      }
    }
    // onLoad() {

    // }
  },
  watch: {
    active(value) {
      const id = this.categoryList[value].id
      this.getPostList(id)
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  .header {
    display: flex;
    // align-items: center;
    line-height: 50px;
    height: 50px;
    padding: 0 10px;
    background-color: #f00;
    text-align: center;
    color: #fff;
    .loge,
    .user {
      width: 50px;
    }
    .loge {
      span {
        font-size: 50px;
      }
    }
    .user {
      span {
        font-size: 20px;
      }
    }
    .search {
      flex: 1;
      margin: 8px 15px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 17px;
      span {
        &:nth-child(1) {
          font-size: 18px;
        }
        margin-right: 5px;
        font-size: 14px;
      }
    }
  }
  .category {
    /deep/ .van-tabs__line {
      background-color: pink;
    }
  }
}
</style>
