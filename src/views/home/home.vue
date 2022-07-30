// home组件

<template>
  <div class="home-main">
    <!-- navbar导航栏 -->
    <van-nav-bar class="navbar-nav" fixed>
      <template #title>
        <van-button round type="info" class="navbar-btn" to="/search">
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
        <div class="hamburger-btn" @click="showPopup">
          <i class="heimaweb icon-gengduo"></i>
        </div>
        <!-- placeholder占位符 -->
        <div class="placeholder"></div>
      </template>
    </van-tabs>

    <van-popup
      v-model="show"
      closeable
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <channel-edit
        :channel="channels"
        :active="active"
        @toggleChannel="toggleChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChennels, removeUserChannel } from '@/api/home.js'
import { setItem, getItem } from '@/utils/storage.js'

import ArticleList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/components/channel-edit'

export default {
  data() {
    return {
      active: 0,
      channels: {},
      show: false
    }
  },

  created() {
    this.getUserChennels()
  },

  methods: {
    // 获取用户频道
    async getUserChennels() {
      try {
        if (this.$store.state.user) {
          // 已登录
          const {
            data: {
              data: { channels }
            }
          } = await getUserChennels()

          this.channels = channels
        } else {
          // 未登录
          const localChannels = getItem('TOUTIAO_CHANNELS')

          if (localChannels) {
            this.channels = localChannels
          } else {
            const {
              data: {
                data: { channels }
              }
            } = await getUserChennels()

            this.channels = channels
          }
        }
      } catch (error) {
        this.$toast.fail('请稍后重试')
      }
    },

    showPopup() {
      this.show = true
    },

    toggleChannel(value, id, status) {
      if (status !== true) {
        // 高亮切换
        this.active = id
        this.show = false
      } else {
        // 删除
        // 排除推荐
        if (id === 0) {
          return 0
        }
        // 删除数组元素
        this.channels.splice(id, 1)
        // 判断id 小于等于active时 active前移
        if (id <= this.active) {
          this.active -= 1
        }

        this.removeChannel(value.id)
      }
    },

    // 删除频道后的数据持久化
    async removeChannel(id) {
      try {
        if (this.$store.state.user) {
          await removeUserChannel(id)
        } else {
          setItem('TOUTIAO_CHANNELS', this.channels)
        }
      } catch (error) {
        this.$toast.fail('操作失败，请稍后重试')
      }
    }
  },

  components: {
    ArticleList,
    ChannelEdit
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

/deep/ .van-popup__close-icon--top-right {
  top: 0.32rem;
}

// 导航栏公共样式设置
/deep/.van-nav-bar__content {
  height: 90px;
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
    font-size: 32px;
  }
  .heimaweb {
    color: #fff;
    font-size: 20px !important;
  }
}
</style>
