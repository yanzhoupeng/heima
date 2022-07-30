<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        currentComment.reply_count === 0
          ? '暂无评论'
          : `${currentComment.reply_count}条评论`
      "
      fixed
    >
      <van-icon name="cross" slot="left" @click="$emit('closePop')" />
    </van-nav-bar>

    <!-- 个人评论 -->
    <comment-item :comment="currentComment" />

    <!-- 全部回复 -->
    <van-cell title="全部评论" />

    <!-- 评论回复项 -->
    <comment-list
      :source="currentComment.com_id"
      :type="'c'"
      :list="currentList"
    />

    <!-- 写回复 -->
    <div class="bottom-wrap">
      <van-button
        size="small"
        round
        class="reply-btn"
        @click="isPostShow = true"
      >
        写评论
      </van-button>

      <!-- 弹出层 -->
      <van-popup v-model="isPostShow" position="bottom">
        <post-comment :artID="currentComment.com_id" @closePop="closePop" />
      </van-popup>
    </div>
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'

export default {
  components: { CommentItem, CommentList, PostComment },
  name: 'CommentReply',
  props: {
    currentComment: {
      type: Object
    }
  },
  data() {
    return { isPostShow: false, currentList: [] }
  },
  methods: {
    closePop(val) {
      if (val) {
        this.isPostShow = false
        this.currentList.unshift(val.new_obj)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-icon {
  color: #fff;
  font-size: 40px;
}
.comment-reply {
  padding-top: 92px;
  padding-bottom: 90px;
}

.bottom-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 88px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;

  .reply-btn {
    width: 60%;
  }
}
</style>
