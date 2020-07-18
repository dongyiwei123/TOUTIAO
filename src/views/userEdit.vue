<template>
  <div class="userEdit">
    <myHeader>编辑资料</myHeader>
    <div class="avator">
      <img :src="$axios.defaults.baseURL + user.head_img" alt />
      <!-- 上传 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="main">
      <!-- 昵称 -->
      <navBar @click="nicknameFn">
        <template>昵称</template>
        <template #content>{{ user.nickname }}</template>
      </navBar>
      <!-- 密码 -->
      <navBar @click="passwordFn">
        <template>密码</template>
        <template #content>******</template>
      </navBar>
      <!-- 性别 -->
      <navBar @click="genderFn">
        <template>性别</template>
        <template #content>{{ user.gender === 1 ? '男' : '女' }}</template>
      </navBar>

      <!-- 昵称弹出框 -->
      <van-dialog
        v-model="showNickName"
        title="修改昵称"
        show-cancel-button
        @confirm="editNickName"
      >
        <van-cell-group>
          <van-field v-model="nickname" placeholder="请输入昵称" />
        </van-cell-group>
      </van-dialog>
      <!-- 密码弹出框 -->
      <van-dialog
        v-model="showPsd"
        title="修改密码"
        show-cancel-button
        @confirm="editPsd"
      >
        <van-cell-group>
          <van-field v-model="password" placeholder="请输入昵称" />
        </van-cell-group>
      </van-dialog>
      <!-- 性别弹出框 -->
      <van-dialog
        v-model="showGender"
        title="修改性别"
        show-cancel-button
        @confirm="editGender"
      >
        <van-radio-group v-model="gender">
          <van-cell-group>
            <van-cell title="男" clickable @click="gender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="gender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
    </div>
    <div class="mask" v-if="isShow">
      <van-icon name="success" @click="crop" />
      <van-icon name="cross" @click="cancel" />
      <vueCropper
        ref="cropper"
        :img="imgUrl"
        autoCrop
        autoCropWidth="150px"
        autoCropHeight="150px"
        fixed
        :fixedNumber="[1, 1]"
      >
      </vueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: {},
      showNickName: false,
      nickname: '',
      showPsd: false,
      password: '',
      showGender: false,
      gender: 1,
      isShow: false,
      imgUrl: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取用户信息
    async getList() {
      const id = window.localStorage.getItem('userId')
      const { data: res } = await this.$axios.get(`/user/${id}`)
      const { statusCode } = res
      if (statusCode === 200) {
        this.user = res.data
        // console.log(this.user)
      }
    },
    // 修改信息
    async userEdit(data) {
      const id = window.localStorage.getItem('userId')
      const { data: res } = await this.$axios.post(`/user_update/${id}`, data)
      const { statusCode, message } = res
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getList()
      }
    },
    // 昵称
    nicknameFn() {
      this.showNickName = true
      this.nickname = this.user.nickname
    },
    editNickName() {
      this.userEdit({
        nickname: this.nickname
      })
    },
    // 密码
    passwordFn() {
      this.showPsd = true
      this.password = this.user.password
    },
    editPsd() {
      this.userEdit({
        password: this.password
      })
    },
    // 性别
    genderFn() {
      this.showGender = true
      this.gender = this.user.gender
    },
    editGender() {
      this.userEdit({
        gender: this.gender
      })
    },
    // 上传
    afterRead(file) {
      // if (file.file.size > 1024 * 20) return this.$toast.fail('图片需小于20kb')
      // if (file.file.name.split('.')[1] !== ('jpg' || 'png' || 'gif')) {
      //   return this.$toast.fail('图片格式为jpg/png/gif')
      // }
      // const db = new FormData()
      // db.append('file', file.file)
      // const { data: res } = await this.$axios.post('/upload', db)
      // if (res.statusCode === 200) {
      //   // console.log(res)
      //   this.userEdit({
      //     head_img: res.data.url
      //   })
      // }
      this.isShow = true
      this.imgUrl = file.content
    },
    crop() {
      // 获取截图的blob数据
      this.$refs.cropper.getCropBlob(async data => {
        const db = new FormData()
        db.append('file', data)
        const { data: res } = await this.$axios.post('/upload', db)
        if (res.statusCode === 200) {
          // console.log(res)
          this.userEdit({
            head_img: res.data.url
          })
          this.isShow = false
        }
      })
    },
    cancel() {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.userEdit {
  .avator {
    padding: 30px 0;
    display: flex;
    box-shadow: 0 2px 2px #ccc;
    img {
      margin: 0 auto;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }
  .main {
    padding-left: 15px;
    /deep/ .van-dialog__content {
      padding: 0 10px;
    }
    .van-cell-group {
      border: 1px solid #999;
    }
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 666;
    .van-icon {
      position: absolute;
      color: #000;
      font-size: 30px;
      z-index: 99999;
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        right: 0;
      }
    }
  }
}
</style>
