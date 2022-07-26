<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelState">
        <span @click="$emit('delAllHistory')">全部删除</span>
        &nbsp;
        <span @click="isDelState = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelState = true" />
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, id) in searchHistory"
      :key="id"
      @click="cellItemClick(item, id)"
    >
      <van-icon slot="right-icon" name="cross" v-if="isDelState" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      isDelState: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 单元格点击事件
    cellItemClick(item, id) {
      if (this.isDelState) {
        // 处于删除状态
        this.searchHistory.splice(id, 1)
      } else {
        // 不处于删除状态
        this.$emit('search', item)
      }
    }
  },
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped></style>
