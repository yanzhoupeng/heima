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

    <comment-list :source="currentComment.com_id" :type="'c'" />
  </div>
</template>

<script>
import commentItem from '@/components/comment-item.vue'
import CommentList from './comment-list.vue'

export default {
  components: { commentItem, CommentList },
  name: 'CommentReply',
  props: {
    currentComment: {
      type: Object
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.van-icon {
  color: #fff;
  font-size: 40px;
}
.comment-reply {
  padding-top: 92px;
}
</style>
