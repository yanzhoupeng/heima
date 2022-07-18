// 头部组件

<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar :title="title" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style></style>
