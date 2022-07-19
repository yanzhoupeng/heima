// layout 底部布局开发

<template>
  <div>
    <!-- 标签导航栏 -->
    <van-tabbar class="layout-tabbar" route>
      <!-- 首页 -->
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon>
          <i class="heimaweb icon-shouye"></i>
        </template>
      </van-tabbar-item>

      <!-- 问答 -->
      <van-tabbar-item to="/qa">
        <span>问答</span>
        <template #icon>
          <i class="heimaweb icon-wenda"></i>
        </template>
      </van-tabbar-item>

      <!-- 视频 -->
      <van-tabbar-item to="/video">
        <span>视频</span>
        <template #icon>
          <i class="heimaweb icon-shipin"></i>
        </template>
      </van-tabbar-item>

      <!-- 我的 -->
      <van-tabbar-item to="/my">
        <span>{{ $store.state.user ? '我的' : '未登录' }}</span>
        <template #icon>
          <i class="heimaweb icon-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 子路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-tabbar {
  .heimaweb {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>
