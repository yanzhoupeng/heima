<template>
  <van-cell class="article-item" :to="`/article/${article.art_id}`">
    <!-- 标题 -->
    <template #title>
      <div class="article-title">{{ article.title }}</div>
    </template>

    <!-- 右侧图片 -->
    <template #default v-if="article.cover.type === 1">
      <van-image :src="article.cover.images[0]" />
    </template>

    <!-- 底部label -->
    <template #label class="cell-label">
      <!-- 图片 -->
      <div v-if="article.cover.type === 3" class="image-nav">
        <van-image
          v-for="(item, id) in article.cover.images"
          :key="id"
          :src="item"
          class="image-item"
        />
      </div>

      <!-- 小字 -->
      <!-- <span v-if="article.is_top === 1">置顶</span> -->
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | timeFilter }}</span>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .article-title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;

    padding-left: 25px;
  }

  .image-nav {
    display: flex;
    padding: 30px 0;
    .image-item {
      flex: 1;
      height: 146px;

      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }

  .van-cell__label > span {
    font-size: 22px;
    color: #b4b4b4;
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
