<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      class="navbar-nav"
    />

    <!-- 单元格 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
    </van-cell>

    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isNamePopShow = true"
    />

    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isGenderShow = true"
    />

    <van-cell
      @click="isBirthdayShow = true"
      title="生日"
      :value="userInfo.birthday"
      is-link
    />

    <!-- Name弹出层 -->
    <van-popup
      v-model="isNamePopShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <pop-name
        v-if="isNamePopShow"
        @closePop="isNamePopShow = false"
        @changeUserName="updateUserInfo"
        v-model="userInfo.name"
      />
    </van-popup>

    <!-- gender弹出层 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <pop-gender
        @closePop="isGenderShow = false"
        v-if="isGenderShow"
        v-model="userInfo.gender"
        @changeUserGender="updateUserInfo"
      />
    </van-popup>

    <!-- birthday弹出层 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <pop-birthday
        v-if="isBirthdayShow"
        v-model="userInfo.birthday"
        @closePop="isBirthdayShow = false"
        @changeUserGender="updateUserInfo"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserMessage, changeUserMessage } from '@/api/user-profile.js'
import popName from './components/pop-name.vue'
import PopGender from './components/pop-gender.vue'
import PopBirthday from './components/pop-birthday.vue'

export default {
  components: { popName, PopGender, PopBirthday },
  name: 'UserProfile',
  data() {
    return {
      userInfo: {},
      isNamePopShow: false,
      isGenderShow: false,
      isBirthdayShow: false
    }
  },
  created() {
    this.loadUserInfo()
  },
  mounted() {},
  methods: {
    // 导航栏左侧图标事件
    onClickLeft() {
      this.$router.push('/my')
    },

    // 加载用户信息
    async loadUserInfo() {
      try {
        // 发起请求
        const {
          data: { data }
        } = await getUserMessage()
        this.userInfo = data
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },

    // 关闭pop
    closePop() {
      this.isNamePopShow = false
      this.isGenderShow = false
      this.isBirthdayShow = false
    },

    // 修改用户信息
    async updateUserInfo(message) {
      try {
        // loading状态
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        // 发起请求
        await changeUserMessage(message)
        // 成功提示
        this.$toast.success('修改成功')
        // 关闭弹出层
        this.closePop()
      } catch (error) {
        this.$toast.fail('网络错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  /deep/ .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
