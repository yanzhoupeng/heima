// 登录组件开发
<template>
  <div class="login-content">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.meta.title" />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 输入框 -->
      <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号">
        <i slot="left-icon" class="heimaweb icon-shouji"></i>
      </van-field>

      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        placeholder="请输入短信验证码"
      >
        <i slot="left-icon" class="heimaweb icon-yanzhengma"></i>

        <template #button>
          <van-button class="send-code-btn" size="small" type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>

      <!-- 按钮 -->
      <div style="margin: 16px" class="submit-btn">
        <van-button
          class="submit-msg-btn"
          block
          type="default"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { postUserMsg } from '@/api/login.js'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      const data = await postUserMsg(this.user)
      console.log(data)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.login-content {
  .send-code-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
    color: #666666;
    border-radius: 23px;
  }
  .heimaweb {
    font-size: 37px;
  }
  .submit-btn {
    padding: 27px 14px;
    .submit-msg-btn {
      background-color: #6db4fb;
      border-radius: 10px;
      font-size: 30px;
      color: #ffffff;
    }
  }
}
</style>
