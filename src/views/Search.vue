<template>
  <div class="mysearch">
    <header class="header">
      <span class="iconfont iconjiantou2" @click="back"></span>
      <div class="search">
        <input
          type="text"
          placeholder="通灵术"
          @input="recommend"
          v-model="keyword"
          @keyup.enter="search"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <span @click="search">搜索</span>
    </header>
    <!-- 搜索推荐列表 -->
    <div class="recommendList" v-if="recommendList.length>0">
      <navBar
        v-for="item in recommendList"
        :key="item.id"
        @click="other_search(item.title)"
      >{{item.title}}</navBar>
    </div>
    <!-- 搜索列表 -->
    <div class="list" v-else-if="list.length>0">
      <myNew
        :post="item"
        v-for="item in list"
        :key="item.id"
        @click="$router.push(`/postDetail/${item.id}`)"
      ></myNew>
    </div>
    <div class="orgin" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="clear" @click="clear">去除搜索记录</div>
        <span
          class="one-txt-cut"
          v-for="item in historyList"
          :key="item"
          @click="other_search(item)"
        >{{item}}</span>
      </div>
      <div class="hot">
        <h3>热门搜索</h3>
        <span
          class="one-txt-cut"
          v-for="item in hotList"
          :key="item"
          @click="other_search(item)"
        >{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      list: [],
      historyList: [],
      hotList: ['办公室帕拉图', '神奇的一天', '学习免费'],
      recommendList: []
    }
  },
  created() {
    // const historyList = JSON.parse(localStorage.getItem('historyList'))
    // if (historyList) {
    //   this.historyList = historyList
    // } else {
    //   this.historyList = []
    // }
    this.historyList = JSON.parse(localStorage.getItem('historyList')) || []
  },
  methods: {
    recommend: _.debounce(async function () {
      if (!this.keyword) {
        return
      }
      const { data: res } = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      // console.log(res)
      const { data, statusCode } = res
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 100),
    async search() {
      if (this.keyword === '') return
      this.historyList = this.historyList.filter(item => item !== this.keyword)
      this.historyList.unshift(this.keyword)
      localStorage.setItem('historyList', JSON.stringify(this.historyList))
      const { data: res } = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.list = data
        this.recommendList = []
      }
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    other_search(item) {
      this.keyword = item
      this.search()
    },
    clear() {
      localStorage.removeItem('historyList')
      this.historyList = []
    }
  },
  watch: {
    keyword() {
      if (this.keyword === '') {
        this.list = []
        this.recommendList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mysearch {
  padding: 0 15px;
  font-size: 12px;
  .header {
    display: flex;
    align-items: center;
    height: 50px;
    > span {
      width: 30px;
    }
    .search {
      flex: 1;
      position: relative;
      input {
        height: 30px;
        width: 95%;
        border-radius: 20px;
        padding: 0 30px;
      }
      .iconsearch {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .history,
  .hot {
    margin-bottom: 20px;
    overflow: hidden;
    h3 {
      color: #000;
    }
    span {
      float: left;
      width: 70px;
      height: 30px;
      margin-bottom: 10px;
      margin-right: 10px;
      border: 1px solid #999;
      text-align: center;
      line-height: 30px;
      font-size: 10px;
    }
  }
}
</style>
