<template>
  <div class="register">
    <myHeader>注册</myHeader>
    <myLoge></myLoge>
    <van-form @submit="onSubmit">
      <van-field v-model="user.username" label="用户名" placeholder="用户名" :rules="rules.nameRule" />
      <van-field v-model="user.nickname" label="昵称" placeholder="昵称" :rules="rules.nickRule" />
      <van-field
        v-model="user.password"
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
      已有账号？去
      <router-link to="/">登录</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
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
        nickRule: [
          {
            required: true,
            message: '请填写昵称',
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
      const res = await this.$axios.post('/register', this.user)
      if (res.data.statusCode === 200) {
        this.$router.push({
          name: 'Login',
          params: {
            username: this.user.username,
            password: this.user.password
          }
        })
        this.$toast.success(res.data.message)
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.register {
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
