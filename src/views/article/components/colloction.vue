<template>
  <div class="">
    <van-button
      :icon="isCollected ? 'star' : 'star-o'"
      @click="CollectArt"
      :loading="isLoading"
      :class="{
        collected: isCollected
      }"
    />
  </div>
</template>

<script>
import { collectArticle, cannelCollectArticle } from '@/api/article.js'

export default {
  name: 'CollectArticle',
  data() {
    return { isLoading: false }
  },
  model: {
    prop: 'isCollected',
    event: 'changeFollowState'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async CollectArt() {
      this.isLoading = true
      try {
        if (this.isCollected) {
          // 取消收藏接口
          await cannelCollectArticle(this.article_id)
        } else {
          // 收藏接口
          await collectArticle(this.article_id)
        }

        this.$toast(!this.isCollected ? '收藏成功' : '取消收藏成功')

        this.$emit('changeFollowState', !this.isCollected)
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
/deep/ .collected {
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
