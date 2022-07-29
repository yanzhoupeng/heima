<template>
  <!-- 单元格 -->
  <van-cell class="comment-item">
    <!-- 头像 -->
    <van-image
      slot="icon"
      round
      class="avatar"
      fit="cover"
      :src="comment.aut_photo"
    />

    <div slot="title" class="title-wrap">
      <!-- 用户名 -->
      <div class="user-name">
        {{ comment.aut_name }}
      </div>
      <!-- 点赞图标 -->
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="onlike()"
        :loading="likeLoading"
      >
        {{ comment.like_count || '赞' }}
      </van-button>
    </div>

    <div slot="label">
      <!-- 评论内容 -->
      <p class="comment-content">
        {{ comment.content }}
      </p>
      <!-- 时间 -->
      <div class="bottom-info">
        <span class="comment-pubdate">
          {{ comment.pubdate | timeFilter }}
        </span>
        <van-button class="reply-btn" round @click="$emit('onReply', comment)">
          回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { likeComment, canelLikeComment } from '@/api/comment.js'

export default {
  name: 'CommentItem',
  data() {
    return {
      likeLoading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onlike() {
      this.likeLoading = true

      try {
        if (this.comment.is_liking) {
          await canelLikeComment(this.comment.com_id)
          this.comment.like_count--
        } else {
          await likeComment(this.comment.com_id)
          this.comment.like_count++
        }
      } catch (error) {
        this.$toast('网络错误，点赞失败')
      }

      this.likeLoading = false
      this.comment.is_liking = !this.comment.is_liking
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
