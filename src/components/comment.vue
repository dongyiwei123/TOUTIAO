<template>
  <div>
    <div class="comment" v-for="item in comment" :key="item.id">
      <div class="title">
        <div class="avator">
          <img src="../assets/03.jpg" alt />
        </div>
        <div class="user">
          <p>{{item.user.nickname}}</p>
          <p>{{item.create_date | fromNow}}</p>
        </div>
        <span class="reply">回复</span>
      </div>
      <myFloor v-if="item.parent" :comment="item.parent" :num="getNum(1,item.parent)"></myFloor>
      <div class="content">{{item.content}}</div>
    </div>
  </div>
</template>

<script>
import myFloor from './myFloor'
export default {
  props: {
    comment: Array
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
  }
}
</style>
