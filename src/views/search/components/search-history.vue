<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete" />
    </van-cell>

    <van-cell :title="item" v-for="(item, id) in searchHistory" :key="id">
      <van-icon
        slot="right-icon"
        name="cross"
        @click="$emit('delHistory', item)"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped></style>
