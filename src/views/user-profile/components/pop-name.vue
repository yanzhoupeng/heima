<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('closePop')"
      @click-right="changeName"
    />

    <div style="padding: 10px">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpdateName',

  data() {
    return {
      message: this.value
    }
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    // 改变昵称
    async changeName() {
      // 防空
      if (!this.message.length) {
        return this.$toast('昵称不能为空')
      }
      // 修改name数据
      this.$emit('input', this.message)
      // 发起ajax请求
      this.$emit('changeUserName', { name: this.message })
    }
  }
}
</script>

<style lang="less" scoped>
.update-name {
  .van-popup {
    background: #f5f7f9;
  }
}
</style>
