<template>
  <div class="channel-edit">
    <!-- cell 我的频道 -->
    <van-cell title="我的频道">
      <!-- 频道编辑按钮 -->
      <van-button plain round size="mini" type="warning" class="edit-btn"
        >编辑</van-button
      >
    </van-cell>

    <!-- grid 频道 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(value, id) in channel"
        :key="id"
        :text="value.name"
        icon="close"
        :class="{ red: active === id }"
      />
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="recommend-channel" />

    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item
        class="channel-item"
        v-for="(value, id) in commendChannels"
        :key="id"
        :text="value.name"
        icon="plus"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChennels } from '@/api/home.js'

export default {
  name: 'channelEdit',
  data() {
    return {
      allChannels: []
    }
  },
  props: {
    channel: {
      type: Array,
      require: true
    },

    active: {
      type: Number
    }
  },
  computed: {
    // 使用filter遍历数组
    commendChannels() {
      return this.allChannels.filter(
        (element) => !this.channel.find((item) => item.name === element.name)
      )
    }

    // 使用foreach遍历数组

    // commendChannels() {
    //   const channel = []
    //   this.allChannels.forEach((item) => {
    //     if (!this.channel.find((element) => element.name === item.name)) {
    //       channel.push(item)
    //     }
    //   })
    //   return channel
    // }
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
        this.allChannels = channels
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 根元素样式
.channel-edit {
  padding: 86px 0;

  // cell title标题 样式
  .van-cell__title {
    font-size: 32px;
    color: #333333;
  }

  // 编辑按钮
  .edit-btn {
    width: 100px;
    font-size: 28px;
  }

  // grid 每一个单元格
  .channel-item {
    height: 86px;
    max-width: 180px;

    // 穿透 内部盒子样式
    /deep/ .van-grid-item__content {
      white-space: nowrap;
      background-color: #f5f5f6;

      // 文字样式
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
        margin-left: 6px;
        margin: 0;
      }
    }

    // 穿透 关闭图标样式
    /deep/ .van-icon-close {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 36px;
      color: #ccc;
      z-index: 20;
    }

    // 穿透 加号图标样式
    /deep/ .van-icon-plus {
      font-size: 28px;
    }
  }

  // 频道推荐 设置向上的距离
  .recommend-channel {
    margin-top: 50px;
  }

  // 高亮样式
  /deep/ .red {
    .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
