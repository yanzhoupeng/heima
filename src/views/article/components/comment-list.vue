<template>
  <van-list
    class="comment-list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    :immediate-check="false"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <comment-item
      v-for="(item, id) in list"
      :key="id"
      :comment="item"
      @onReply="$emit('onReply', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from '@/components/comment-item.vue'

export default {
  components: { CommentItem },
  data() {
    return {
      // list: [],
      error: false,
      loading: false,
      finished: false,
      offset: null
    }
  },

  props: {
    source: {
      type: [Number, String],
      required: true
    },
    list: { type: Array, default: () => [] },
    type: {
      type: String,
      default: 'a',
      validator(val) {
        return ['a', 'c'].includes(val)
      }
    }
  },

  created() {
    this.onLoad()
  },

  methods: {
    async onLoad() {
      try {
        const {
          data: { data }
        } = await getComments({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: 10
        })

        this.list.push(...data.results)

        this.loading = false

        this.$emit('onload-success', data.total_count)

        if (data.results.length) {
          this.offset = data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
