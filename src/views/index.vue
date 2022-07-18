// layout

<template>
  <div>
    <!-- tab-tar -->
    <van-tabbar v-model="active">
      <!-- 首页 -->
      <van-tabbar-item icon="heimaweb icon-shouye" to="/">
        <span>首页</span>
        <template #icon>
          <i class="heimaweb icon-shouye"></i>
        </template>
      </van-tabbar-item>

      <!-- 问答 -->
      <van-tabbar-item icon="search" to="/qa">
        <span>问答</span>
        <template #icon>
          <i class="heimaweb icon-wenda"></i>
        </template>
      </van-tabbar-item>

      <!-- 视频 -->
      <van-tabbar-item icon="friends-o" to="/video">
        <span>视频</span>
        <template #icon>
          <i class="heimaweb icon-shipin"></i>
        </template>
      </van-tabbar-item>

      <!-- 我的 -->
      <van-tabbar-item icon="setting-o" to="/my">
        <span>我的</span>
        <template #icon>
          <i class="heimaweb icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 挂载路由 -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },

  mounted() {
    this.hightLigth()
  },

  methods: {
    // 解决了刷新后tabtar高亮移动的小bug
    hightLigth() {
      const navBarActive = window.location.hash

      if (navBarActive.includes('#/my')) {
        this.active = 3
      } else if (navBarActive.includes('#/qa')) {
        this.active = 1
      } else if (navBarActive.includes('#/video')) {
        this.active = 2
      } else if (navBarActive.includes('#/')) {
        this.active = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.heimaweb {
  font-size: 34px;
}
</style>
