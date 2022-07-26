<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
        v-for="(item, id) in searchResult"
        :key="id"
        :article="item"
      ></article-item>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
import articleItem from '@/components/article-item.vue'

export default {
  components: { articleItem },
  name: 'SearchResult',
  data() {
    return {
      searchResult: [],
      loading: false,
      finished: false,
      page: 1,
      prePage: 10
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const {
          data: { data }
        } = await getSearchResult({
          page: this.page,
          per_page: this.prePage,
          q: this.searchData
        })

        this.searchResult.push(...data.results)

        // 加载状态结束
        this.loading = false

        if (data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('网络错误，请稍后重试')
      }
    }
  },

  props: {
    searchData: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.search-result {
  height: 92vh;
  overflow-y: auto;
}
</style>
