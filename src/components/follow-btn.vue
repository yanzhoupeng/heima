<template>
  <!-- 关注按钮 -->
  <van-button v-if="isFollow" round size="small" @click="onFollow">
    已关注
  </van-button>
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="isLoading"
  >
    关注
  </van-button>
</template>

<script>
import { followUser, cannelFollowUser } from '@/api/article.js'

export default {
  name: 'FollowBtn',

  data() {
    return { isLoading: false }
  },

  model: {
    prop: 'isFollow',
    event: 'changeFollowState'
  },

  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    userID: {
      type: [Number, String, Object]
    }
  },

  methods: {
    // 关注按钮点击事件
    async onFollow() {
      this.isLoading = true
      try {
        // 判断关注状态 确定使用接口
        if (!this.isFollow) {
          // 未关注
          await followUser(this.userID)
        } else {
          // 已关注
          await cannelFollowUser(this.userID)
        }

        // 关注状态更换
        this.$emit('changeFollowState', !this.isFollow)
      } catch (error) {
        // 使用变量存储弹出信息
        let msg = '请求失败'

        // 关注用户自己时 接口会返回400报错
        if (error.response && error.response.status === 400) {
          msg = '不能关注自己'
        }

        this.$toast(msg)
      }

      // 关闭按钮的 loading 状态
      this.isLoading = false
    }
  }
}
</script>

<style scoped></style>
