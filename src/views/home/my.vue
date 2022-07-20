// my组件

<template>
  <div>
    <!-- 已登录 头部头图区域 -->
    <div class="head" v-if="user">
      <div class="user">
        <div class="user-left">
          <van-image
            width="66"
            height="66"
            round
            class="avater"
            fit="cover"
            :src="userMsg.photo"
          />

          <p>{{ userMsg.name }}</p>
        </div>

        <div class="user-right">编辑资料</div>
      </div>

      <div class="info">
        <div class="info-item">
          <div class="info-item-num">{{ userMsg.art_count }}</div>
          <div class="info-item-text">头条</div>
        </div>
        <div class="info-item">
          <div class="info-item-num">{{ userMsg.follow_count }}</div>
          <div class="info-item-text">关注</div>
        </div>
        <div class="info-item">
          <div class="info-item-num">{{ userMsg.fans_count }}</div>
          <div class="info-item-text">粉丝</div>
        </div>
        <div class="info-item">
          <div class="info-item-num">{{ userMsg.like_count }}</div>
          <div class="info-item-text">获赞</div>
        </div>
      </div>
    </div>

    <!-- 未登录 头部头图区域 -->
    <div class="not-login" v-else>
      <div class="head container">
        <div class="login-btn" @click="$router.push('/login')">
          <img src="@/assets/image/mobile.png" alt="" />
          <div class="text">登录 / 注册</div>
        </div>
      </div>
    </div>

    <!-- 中间信息部分 -->
    <div class="main">
      <!-- grid -->
      <van-grid clickable :column-num="2" class="grid-nav">
        <van-grid-item class="grid-item">
          <template #icon>
            <i class="heimaweb icon-shoucang"> </i>
          </template>

          <template #text>
            <span class="grid-item-text">收 藏</span>
          </template>
        </van-grid-item>

        <van-grid-item class="grid-item">
          <template #icon>
            <i class="heimaweb icon-lishi"> </i>
          </template>

          <template #text>
            <span class="grid-item-text">历 史</span>
          </template>
        </van-grid-item>
      </van-grid>

      <!-- cell -->
      <van-cell title="消息通知" is-link to="" class="cell-item" />
      <van-cell title="小智同学" is-link to="" class="cell-item" />

      <!-- 按钮 -->
      <van-button
        class="outlogin-btn"
        type="default"
        v-if="user"
        @click="outLogin"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserMsg } from '@/api/my.js'

export default {
  data() {
    return {
      isLogin: true,
      userMsg: {}
    }
  },

  computed: {
    ...mapState(['user'])
  },

  created() {
    if (this.user) {
      this.loadUserMsg()
    }
  },

  methods: {
    outLogin() {
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗'
        })
        .then(() => {
          this.$store.commit('setUserInfo', null)
        })
        .catch(() => {})
    },

    async loadUserMsg() {
      try {
        const {
          data: { data }
        } = await getUserMsg()
        this.userMsg = data
      } catch (error) {
        if (error.status === 400) {
          this.$toast.fail('用户认证失败')
        } else {
          this.$toast.fail('请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 头部
.head {
  height: 361px;
  // CSS中使用@别名需要加~
  background-image: url('~@/assets/image/banner.png');
  background-size: cover;

  // user头像和编辑信息
  .user {
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-left {
      display: flex;
      align-items: center;

      .avater {
        border: 2px solid #fff;
      }

      p {
        margin-left: 20px;
        font-size: 30px;
        font-weight: normal;
        letter-spacing: 1px;
        color: #ffffff;
      }
    }

    .user-right {
      text-align: center;
      line-height: 40px;
      width: 116px;
      height: 40px;
      background-color: #ffffff;
      border-radius: 16px;

      font-size: 20px;
      color: #666666;
    }
  }

  // 关注和粉丝等
  .info {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .info-item-text {
        font-size: 23px;
        color: #ffffff;
      }

      .info-item-num {
        font-size: 40px;
        color: #ffffff;
      }
    }
  }
}

// 主体
.main {
  // grid
  .grid-nav {
    margin-bottom: 10px;

    .grid-item {
      height: 140px;
    }

    .grid-item-text {
      font-size: 28px;
      color: #333333;
      margin-top: 6px;
    }
  }

  // cell
  .cell-item {
    height: 100px;
    line-height: 60px;

    font-size: 30px;
    color: #333333;
  }

  // button
  .outlogin-btn {
    width: 100%;
    height: 100px;

    font-size: 30px;
    color: #d86262;
  }

  // 字体图标
  .heimaweb {
    font-size: 50px;
    color: #ff9d1d;
  }
}

// 未登录
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 132px;
    }

    .text {
      font-size: 28px;
      color: #fff;
      margin-top: 15px;
    }
  }
}
</style>
