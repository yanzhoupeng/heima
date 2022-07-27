<template>
  <van-list
    class="comment-list"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <comment-item v-for="(item, id) in list" :key="id" :comment="item" />
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment.js'
import commentItem from '../../../components/comment-item.vue'

export default {
  components: { commentItem },
  data() {
    return {
      list: [],
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
    }
  },

  methods: {
    async onLoad() {
      try {
        const {
          data: { data }
        } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: 10
        })

        this.list.push(...data.results)

        this.loading = false

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
