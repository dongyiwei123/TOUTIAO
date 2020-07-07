<template>
  <div class="myNew">
    <div class="new" v-for="item in post" :key="item.id">
      <!-- 一张图 -->
      <div class="singleStar" v-if="item.cover.length<3">
        <div class="right">
          <p>{{item.title}}</p>
          <div class="reply">
            <span>{{item.user.nickname}}</span>
            <span>{{item.comment_length}}跟帖</span>
          </div>
        </div>
        <div class="left">
          <img :src="$url(item.cover[0].url)" alt />
        </div>
      </div>
      <!-- 多张图 -->
      <div class="multipleStar" v-else>
        <p>{{item.title}}</p>
        <div class="avator">
          <img :src="$url(item.cover[0].url)" alt />
          <img :src="$url(item.cover[1].url)" alt />
          <img :src="$url(item.cover[2].url)" alt />
        </div>
        <div class="reply">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comment_length}}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Array
  }
}
</script>

<style lang="less" scoped>
.new {
  .singleStar {
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
  .multipleStar {
    padding: 10px;
    font-size: 16px;
    color: #000;
    border-bottom: 1px solid #999;
    .avator {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      img {
        width: 112px;
        height: 74px;
        object-fit: cover;
      }
    }
    .reply {
      font-size: 14px;
      color: #999;
      > span {
        margin-right: 10px;
      }
    }
  }
}
</style>
