// 我的页面开发

<template>
  <div>
    <div class="head">
      <div class="user">
        <img src="@/assets/image/avatar.png" alt="" />

        <p>黑马头条君</p>

        <van-button round type="default">默认按钮</van-button>
      </div>
      <div class="info">
        <van-grid class="hd-info">
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
      </div>
    </div>

    <div class="container">
      <!-- 导航 -->
      <van-grid clickable :column-num="2">
        <van-grid-item text="收藏" to="">
          <template #icon>
            <i class="heimaweb icon-shoucang"> </i>
          </template>
        </van-grid-item>
        <van-grid-item text="历史" url="">
          <template #icon>
            <i class="heimaweb icon-lishi"> </i>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 导航 -->
      <van-cell title="消息通知" is-link url="/vant/mobile.html" />
      <van-cell title="小智同学" is-link to="index" />

      <!-- 按钮 -->
      <van-button type="default">默认按钮</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.head {
  width: 750px;
  height: 401px;
  background-image: url(../../assets/image/banner.png);

  .user {
    display: flex;
  }
}
.heimaweb {
  font-size: 50px;
  color: #ff9d1d;
}
</style>
