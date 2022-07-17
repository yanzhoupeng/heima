// 登录组件开发
<template>
  <div class="login-content">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.meta.title" />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 输入框 -->
      <van-field
        v-model.trim="user.mobile"
        name="mobile"
        type="tel"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '请输入正确的手机号'
          }
        ]"
      >
        <i slot="left-icon" class="heimaweb icon-shouji"></i>
      </van-field>

      <!-- 验证码 -->
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        placeholder="请输入短信验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{4}|\d{6}$/,
            message: '请输入正确的验证码'
          }
        ]"
      >
        <i slot="left-icon" class="heimaweb icon-yanzhengma"></i>

        <template #button>
          <van-button
            class="send-code-btn"
            size="small"
            type="default"
            @click="getCode"
            native-type="button"
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

    <p class="login-extra">隐私条款</p>
  </div>
</template>

<script>
import { postUserMsg, getCode } from '@/api/login.js'
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
  methods: {
    async onSubmit() {
      const data = await postUserMsg(this.user)
      console.log(data)
    },

    async getCode() {
      const data = await getCode(this.user.mobile)
      console.log(data)
    }
  }
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
  .login-extra {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 26px;

    color: #666666;
  }
}
</style>
