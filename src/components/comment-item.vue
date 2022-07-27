<template>
  <!-- 单元格 -->
  <van-cell class="comment-item">
    <!-- 头像 -->
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="comment.aut_photo"
    />

    <div slot="title" class="title-wrap">
      <!-- 用户名 -->
      <span style="color: #466b9d">
        {{ comment.aut_name }}
      </span>
      <!-- 点赞图标 -->
      <van-button
        class="like-btn"
        :class="{ liked: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
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
        <van-button class="reply-btn" round>
          回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
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
