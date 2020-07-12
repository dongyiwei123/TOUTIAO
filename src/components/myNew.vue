<template>
  <div class="myNew">
    <div class="new" @click="$emit('click',post.id)">
      <div class="video" v-if="post.type === 2">
        <p>{{ post.title }}</p>
        <div class="video_box">
          <img :src="$url(post.cover[0].url)" alt />
          <span class="iconfont iconshipin"></span>
        </div>
        <div class="reply">
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <!-- 一张图 -->
      <div class="singleStar" v-else-if="post.cover.length < 3">
        <div class="right">
          <p>{{ post.title }}</p>
          <div class="reply">
            <span>{{ post.user.nickname }}</span>
            <span>{{ post.comment_length }}跟帖</span>
          </div>
        </div>
        <div class="left">
          <img :src="$url(post.cover[0].url)" alt />
        </div>
      </div>
      <!-- 多张图 -->
      <div class="multipleStar" v-else>
        <p>{{ post.title }}</p>
        <div class="avator">
          <img :src="$url(post.cover[0].url)" alt />
          <img :src="$url(post.cover[1].url)" alt />
          <img :src="$url(post.cover[2].url)" alt />
        </div>
        <div class="reply">
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
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
  }
  .video {
    padding: 10px;
    border-bottom: 1px solid #999;
    font-size: 16px;
    color: #000;
    .video_box {
      position: relative;
      width: 100%;
      > span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background-color: rgba(0, 0, 0, 0.2);
        text-align: center;
        line-height: 50px;
        font-size: 30px;
        color: #fff;
        border-radius: 50%;
      }
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
</style>
