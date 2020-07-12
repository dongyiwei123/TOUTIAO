<template>
  <div>
    <div class="comment">
      <div class="title">
        <div class="avator">
          <img :src="$url(comment.user.head_img)" alt />
        </div>
        <div class="user">
          <p>{{ comment.user.nickname }}</p>
          <p>{{ comment.create_date | fromNow }}</p>
        </div>
        <span class="reply" @click="reply(comment.id,comment.user.nickname)">回复</span>
      </div>
      <myFloor v-if="comment.parent" :comment="comment.parent" :num="getNum(1, comment.parent)"></myFloor>
      <div class="content">{{ comment.content }}</div>
    </div>
  </div>
</template>

<script>
import myFloor from './myFloor'
export default {
  props: {
    comment: Object
  },
  components: {
    myFloor
  },
  methods: {
    getNum(num, obj) {
      if (obj.parent) {
        num++
        return this.getNum(num, obj.parent)
      } else {
        return num
      }
    },
    reply(id, name) {
      this.$bus.$emit('reply', id, name)
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    .avator {
      margin-right: 10px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .user {
      flex: 1;
      p {
        &:nth-child(2) {
          color: #999;
        }
      }
    }
    .reply {
      color: #999;
    }
  }
  .content {
    margin: 0 -15px;
    padding: 15px;
    border-bottom: 1px solid #999;
    font-size: 14px;
    word-wrap: break-word;
  }
}
</style>
