<template>
  <div class="">
    <van-button
      :icon="isLiked === 1 ? 'good-job' : 'good-job-o'"
      @click="LikeArt"
      :loading="isLoading"
      :class="{
        Liked: isLiked === 1
      }"
    />
  </div>
</template>

<script>
import { likeArticle, cannelLikeArticle } from '@/api/article.js'

export default {
  name: 'LikeArticle',
  data() {
    return { isLoading: false }
  },
  model: {
    prop: 'isLiked',
    event: 'changeLikeState'
  },
  props: {
    isLiked: {
      type: Number,
      required: true
    },
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async LikeArt() {
      this.isLoading = true
      try {
        // 存储点赞状态
        let status = this.isLiked

        if (status !== 1) {
          // 点赞接口
          await likeArticle(this.article_id)
        } else {
          // 取消点赞接口
          await cannelLikeArticle(this.article_id)
        }

        status = 0 - status

        this.$toast(status === 1 ? '点赞成功' : '取消点赞成功')

        this.$emit('changeLikeState', status)
      } catch (error) {
        error.response && error.response.status === 401
          ? this.$toast('请先登录')
          : this.$toast('网络错误')
      }

      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .Liked {
  color: #ffa500;
  border: 0;

  .van-button {
    border: 0;
  }
}

.van-icon {
  font-size: 40px;
}
</style>
