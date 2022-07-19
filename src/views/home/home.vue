<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="navbar-nav">
      <template #title>
        <van-button round type="info" class="navbar-btn">
          <template #icon>
            <i class="heimaweb icon-sousuo"></i>
          </template>

          <span class="navbar-btn-text">搜索</span>
        </van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
</style>
