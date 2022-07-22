<template>
  <div class="article-list">
    <!-- list列表 -->
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successTxt"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in list"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelArt } from '@/api/home.js'

import articleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      successTxt: ''
    }
  },
  methods: {
    async onLoad() {
      try {
        const {
          data: { data }
        } = await getChannelArt({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // 抛出异常
        // if (Math.random() > 0.5) {
        //   throw new Error('Error')
        // }

        this.list.push(...data.results)

        this.loading = false

        if (data.results.length !== 0) {
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },

    async onRefresh() {
      try {
        const {
          data: { data }
        } = await getChannelArt({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // 抛出异常
        // if (Math.random() > 0.5) {
        //   throw new Error('Error')
        // }

        this.list.unshift(...data.results)

        this.successTxt = `刷新成攻，更新了${data.results.length}条数据`

        if (data.results.length !== 0) {
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.successTxt = '网络错误，请稍后重试'
      }

      this.refreshing = false
    }
  },

  components: {
    articleItem
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
