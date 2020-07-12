<template>
  <div class="mysearch">
    <header class="header">
      <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      <div class="search">
        <input type="text" placeholder="通灵术" @input="recommend" v-model="keyword" />
        <span class="iconfont iconsearch"></span>
      </div>
      <span>搜索</span>
    </header>
    <div class="history">
      <h3>历史记录</h3>
      <span>美女</span>
    </div>
    <div class="hot">
      <h3>热门搜索</h3>
      <span>办公室小野否认解散</span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: ''
    }
  },
  created() { },
  methods: {
    recommend: _.debounce(async function () {
      const { data: res } = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      console.log(res)
    }, 500)
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
    h3 {
      color: #000;
    }
    span {
      font-size: 10px;
    }
  }
}
</style>
