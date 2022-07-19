// 登录组件开发

<template>
  <div class="login-content">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.meta.title">
      <template #left>
        <i class="heimaweb icon-guanbi" @click="$router.back()"></i>
      </template>
    </van-nav-bar>

    <!-- 表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 手机号码 输入框 -->
      <van-field
        v-model.trim="user.mobile"
        name="mobile"
        type="number"
        placeholder="请输入手机号"
        :rules="userInfoRules.mobile"
        maxlength="11"
        @change="isShowCount = false"
      >
        <template #left-icon>
          <i class="heimaweb icon-shouji"></i>
        </template>
      </van-field>

      <!-- 验证码 输入框 -->
      <van-field
        v-model.trim="user.code"
        type="password"
        name="code"
        placeholder="请输入短信验证码"
        :rules="userInfoRules.code"
      >
        <!-- 左侧插槽：图标 -->
        <template #left-icon>
          <i class="heimaweb icon-yanzhengma"></i>
        </template>
        <!-- 右侧插槽：获取验证码的按钮 -->
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isShowCount"
            @finish="isShowCount = false"
          >
          </van-count-down>
          <van-button
            class="send-code-btn"
            size="small"
            type="default"
            @click="getCode"
            native-type="button"
            v-else
          >
            获取验证码
          </van-button>
        </template>
      </van-field>

      <!-- 表单内登录按钮 -->
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

    <!-- 底部栏 -->
    <p class="login-extra">隐私条款</p>
  </div>
</template>

<script>
import { postUserMsg, getCode } from '@/api/login.js'

export default {
  name: 'LoginIndex',

  data() {
    return {
      // 使用对象存储表单信息
      user: {
        mobile: '13333333333',
        code: '246810'
      },

      // 校验规则
      userInfoRules: {
        // rules 手机号
        mobile: [
          { required: true, message: '手机号不能为空' },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '请输入正确的手机号'
          }
        ],

        // rules 验证码
        code: [
          { required: true, message: '验证码不能为空' },
          {
            pattern: /^\d{4}|\d{6}$/,
            message: '请输入正确的验证码'
          }
        ]
      },

      // 控制倒计时按钮是否开启
      isShowCount: false
    }
  },

  methods: {
    // 登录方法
    async onSubmit() {
      // 加载 禁用按钮
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // try和catch
      try {
        // 解构token
        const {
          data: { data }
        } = await postUserMsg(this.user)
        // 加载成功
        this.$toast.success('登录成功')
        // 处理token
        this.$store.commit('setUserInfo', data)
        // 跳转页面
        this.$router.back()
      } catch (error) {
        // 打印错误日志
        error.response.status === 400
          ? this.$toast.fail('手机号或验证码错误')
          : this.$toast.fail('请稍后重试')
      }
    },

    // 获取验证码
    async getCode() {
      // 单独验证mobile表单项
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return this.$toast.fail('请输入正确的手机号')
      }

      // 发起ajax请求
      try {
        await getCode(this.user.mobile)
        this.$toast.success('发送成功')
        this.isShowCount = true
      } catch (error) {
        this.isShowCount = false
        if (error.response.status === 404) {
          this.$toast.fail('手机号不正确')
        } else if (error.response.status === 429) {
          this.$toast.fail('请求次数过多，请稍后重试')
        } else {
          this.$toast.fail('发送失败，请稍后重试')
        }
      }
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
