// 登录组件开发
<template>
  <div class="login-content">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.meta.title" />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <!-- 输入框 -->
      <van-field v-model="telephone" name="手机号" placeholder="请输入手机号" />

      <!-- 验证码 -->
      <van-field v-model="sms" center clearable placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>

      <!-- 按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data() {
    return { telephone: '', sms: '' }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.van-field__label {
  span {
    // padding: 0 20px;
  }
}
</style>
