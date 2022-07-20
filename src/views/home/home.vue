// home组件

<template>
  <div class="home-main">
    <!-- navbar导航栏 -->
    <van-nav-bar class="navbar-nav" fixed>
      <template #title>
        <van-button round type="info" class="navbar-btn">
          <template #icon>
            <i class="heimaweb icon-sousuo"></i>
          </template>

          <span class="navbar-btn-text">搜索</span>
        </van-button>
      </template>
    </van-nav-bar>

    <!-- tab标签页 -->
    <van-tabs
      v-model="active"
      title-inactive-color="#777777"
      title-active-color="#333333"
      swipeable
      animated
      class="tab-nav"
    >
      <!-- tabs -->
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
        class="tab-item"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
      </van-tab>

      <!-- 组件插槽 -->
      <template #nav-right>
        <!-- hamburger按钮 -->
        <div class="hamburger-btn">
          <i class="heimaweb icon-gengduo"></i>
        </div>
        <!-- placeholder占位符 -->
        <div class="placeholder"></div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getAllChennels } from '@/api/home.js'

import ArticleList from '@/views/home/components/article-list.vue'

export default {
  data() {
    return {
      active: 0,
      channels: {}
    }
  },

  created() {
    this.getAllChennels()
  },

  methods: {
    async getAllChennels() {
      try {
        const {
          data: {
            data: { channels }
          }
        } = await getAllChennels()

        this.channels = channels
      } catch (error) {
        this.$toast.fail('请稍后重试')
      }
    }
  },

  components: {
    ArticleList
  }
}
</script>

<style lang="less" scoped>
.home-main {
  padding-top: 88px;
  padding-bottom: 100px;
}

.navbar-nav {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .navbar-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;

    .heimaweb {
      font-size: 32px !important;
    }
  }
}

/deep/ .van-tabs__wrap {
  position: fixed;
  top: 88px;
  z-index: 999;
  width: 100%;
}

/deep/ .van-tabs__content {
  padding-top: 88px;
}

/deep/ .van-tabs__nav {
  height: 80px;
  padding: 0;

  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 66px;
    height: 82px;
    background-color: #ffffff;
    opacity: 0.9;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url('~@/assets/image/gradient-gray-line.png');
      background-size: contain;
    }

    .heimaweb {
      font-size: 33px;
    }
  }

  .van-tab {
    min-width: 200px;
    height: 80px;
    border-right: 1px solid #edeff3;
    .van-tab__text {
      font-size: 30px;
    }
  }

  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    bottom: 8px;
  }
}
</style>
