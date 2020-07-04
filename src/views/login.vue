<template>
  <div class="login">
    <!-- 顶部组件 -->
    <myHeader>登录</myHeader>
    <!-- 图标组件 -->
    <myLoge></myLoge>
    <!-- 输入框 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" label="用户名" placeholder="用户名" :rules="rules.nameRule" />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.psdRule"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <p class="tips">
      没有账号？去
      <router-link to="/Register">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$route.params.username,
      password: this.$route.params.password,
      rules: {
        nameRule: [
          {
            required: true,
            message: '请填写用户名',
            trigger: 'onChange'
          },
          {
            pattern: /^\d{5,11}$/,
            message: '允许5-11字节',
            trigger: 'onChange'
          }
        ],
        psdRule: [
          {
            required: true,
            message: '请填写密码',
            trigger: 'onChange'
          },
          {
            pattern: /^\w{3,9}$/,
            message:
              '3-9',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.$router.push({
        //   path: '/User',
        //   query: {
        //     id: data.user.id
        //   }
        // })
        this.$router.push('/User')
        window.localStorage.setItem('token', data.token)
        window.localStorage.setItem('userId', data.user.id)
        this.$toast.success('登录成功')
      } else {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .tips {
    font-size: 14px;
    text-align: right;
    padding-right: 20px;
    a {
      color: orange;
    }
  }
}
</style>
