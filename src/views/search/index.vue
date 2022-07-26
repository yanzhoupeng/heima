<template>
  <div class="search-page">
    <form action="/">
      <van-search
        class="search-inp"
        v-model.trim="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>

    <search-result v-if="isShowResult" :searchData="value" />

    <search-suggest v-else-if="value" :search-text="value" @search="onSearch" />

    <search-history
      v-else
      :searchHistory="searchHistory"
      @search="onSearch"
      @delAllHistory="searchHistory = []"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggest from './components/search-suggest.vue'

import { setItem, getItem } from '@/utils/storage.js'

export default {
  name: 'SearchPage',
  data() {
    return {
      value: '',
      isShowResult: false,
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },

  watch: {
    searchHistory(val) {
      setItem('TOUTIAO_SEARCH_HISTORY', val)
    }
  },

  // dom元素加载完成后
  mounted() {
    // 自动聚焦input
    document.querySelector('.van-field__control').focus()
  },

  methods: {
    // 搜索事件
    onSearch(val) {
      if (val === '') {
        return this.$toast('搜索内容不能为空')
      }
      // 显示搜索结果
      this.isShowResult = true

      // 绑定输入框数据
      this.value = val

      // 存入搜索历史
      // 无重复
      if (this.searchHistory.indexOf(val) !== -1) {
        this.searchHistory.splice(this.searchHistory.indexOf(val), 1)
      }
      // 后搜索的先显示
      this.searchHistory.unshift(val)
    },

    // 点击取消按钮
    onCancel() {
      // 返回主页
      this.$router.push('/home')
    }
  },

  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  }
}
</script>

<style lang="less" scoped>
.search-page {
  padding-top: 108px;

  .search-inp {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}

/deep/ .van-search__action {
  margin: 0 26px;
  color: #fff;
  font-size: 28px;
}
</style>
