<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />

    <van-button
      class="post-btn"
      @click="add"
      @keyup.enter="add"
      :disabled="!message.length"
    >
      发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'

export default {
  name: 'CommentPost',
  data() {
    return { message: '' }
  },
  props: { artID: { type: [Number, String], required: true } },
  created() {},
  mounted() {},
  methods: {
    async add() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      try {
        const {
          data: { data }
        } = await await addComment({
          target: this.artID,
          content: this.message,
          art_id: null
        })
        this.message = ''
        this.$emit('closePop', data)
        this.$toast.success('评论发布成功')
      } catch (error) {
        this.$toast('网络错误，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
