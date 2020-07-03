<template>
  <div class="login">
    <!-- 顶部组件 -->
    <myHeader>登录</myHeader>
    <!-- 图标组件 -->
    <myLoge></myLoge>
    <!-- 输入框 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.nameRule"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.psdRule"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p class="tips">
      没有账号？去<router-link to="/Register">注册</router-link>
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
            message: '字母开头，允许5-16字节，允许字母数字下划线组合',
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
              '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
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
      if (res.data.statusCode === 200) {
        this.$router.push('/')
        localStorage.setItem('token', res.data.token)
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
