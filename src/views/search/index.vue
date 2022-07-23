<template>
  <div class="search-page">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      value: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.$toast(val)
    },
    onCancel() {
      this.$toast('取消')
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-search__action {
  margin: 0 26px;
  color: #fff;
  font-size: 28px;
}
</style>
