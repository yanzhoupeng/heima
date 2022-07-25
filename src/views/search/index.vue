<template>
  <div class="search-page">
    <form action="/">
      <van-search
        class="search-inp"
        v-model="value"
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
      @delHistory="delHistory"
    />
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggest from './components/search-suggest.vue'

export default {
  name: 'SearchPage',
  data() {
    return {
      value: '',
      isShowResult: false,
      searchHistory: []
    }
  },

  methods: {
    // 搜索事件
    onSearch(val) {
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
    },

    // 删除指定历史记录
    delHistory(val) {
      // 过滤器
      this.searchHistory = this.searchHistory.filter((item) => item !== val)
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
