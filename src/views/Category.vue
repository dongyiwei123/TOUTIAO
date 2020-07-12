<template>
  <div class="category">
    <myHeader>栏目管理</myHeader>
    <div class="main">
      <h5>点击删除以下标签</h5>
      <div class="delete">
        <span @click="del(index)" v-for="(item, index) in active" :key="item.id">{{item.name}}</span>
      </div>
      <h5>点击添加以下标签</h5>
      <div class="add">
        <span @click="add(index)" v-for="(item, index) in deactive" :key="item.id">{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: [],
      deactive: []
    }
  },
  async created() {
    const active = JSON.parse(localStorage.getItem('active'))
    const deactive = JSON.parse(localStorage.getItem('deactive'))
    if (active) {
      this.active = active
      this.deactive = deactive
      return
    }
    const { data: res } = await this.$axios.get('/category')
    const { statusCode, data } = res
    if (statusCode === 200) {
      this.active = data
      // console.log(this.active)
    }
  },
  methods: {
    del(index) {
      if (this.active.length <= 4) {
        return this.$toast.success('至少保留4个')
      }
      this.deactive.push(this.active[index])
      this.active.splice(index, 1)
    },
    add(index) {
      this.active.push(this.deactive[index])
      this.deactive.splice(index, 1)
    }
  },
  watch: {
    active: {
      deep: true,
      handler() {
        localStorage.setItem('active', JSON.stringify(this.active))
        localStorage.setItem('deactive', JSON.stringify(this.deactive))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.category {
  .main {
    padding: 0 5px 0 15px;
    font-size: 16px;
    h5 {
      font-size: 12px;
      color: #666;
      margin-bottom: 10px;
    }
    .delete,
    .add {
      overflow: hidden;
      span {
        float: left;
        width: 70px;
        height: 30px;
        margin-bottom: 10px;
        margin-right: 10px;
        border: 1px solid #999;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>
