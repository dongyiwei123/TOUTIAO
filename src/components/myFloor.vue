<template>
  <div>
    <floor :num="num-1" :comment="comment.parent" v-if="comment.parent"></floor>
    <div class="myFloor">
      <div class="title">
        <div class="user">
          <span>{{num}}楼</span>
          <span>{{comment.user.nickname}}</span>
        </div>
        <div class="time">{{comment.create_date | fromNow}}</div>
        <div class="reply">
          <span>回复</span>
        </div>
      </div>
      <div class="content">
        <p>{{comment.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'floor',
  props: {
    comment: Object,
    num: Number
  }
}
</script>

<style lang="less" scoped>
.myFloor {
  border: 1px solid #999;
  padding: 10px;
  margin-bottom: -1px;
}
.title {
  display: flex;
  font-size: 14px;
  .user {
    span {
      margin-right: 10px;
    }
  }
  .time {
    flex: 1;
    color: #999;
  }
  .reply {
    span {
      color: #999;
    }
  }
}
.content {
  margin: 15px 0;
  p {
    font-size: 14px;
  }
}
</style>
