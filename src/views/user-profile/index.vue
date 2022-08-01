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
    <!-- 头像 cellitem -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="userInfo.photo" />
    </van-cell>

    <!-- 昵称 cellitem  -->
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isNamePopShow = true"
    />

    <!-- 性别 cellitem -->
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isGenderShow = true"
    />

    <!-- 生日 cellitem -->
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

    <!-- avater 表单 -->
    <input type="file" hidden ref="file" @change="onFileChange" />

    <!-- avater 弹出层 -->
    <van-popup
      v-model="isPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <pop-update-photo
        :img="img"
        @closePop="isPhotoShow = false"
        v-if="isPhotoShow"
        @update-photo="userInfo.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
// 引入接口
import { getUserMessage, changeUserMessage } from '@/api/user-profile.js'
// 引入组件
import popName from './components/pop-name.vue'
import PopGender from './components/pop-gender.vue'
import PopBirthday from './components/pop-birthday.vue'
import PopUpdatePhoto from './components/pop-updatePhoto.vue'

export default {
  components: { popName, PopGender, PopBirthday, PopUpdatePhoto },
  name: 'UserProfile',
  data() {
    return {
      userInfo: {},
      isNamePopShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      img: null
    }
  },
  created() {
    this.loadUserInfo()
  },
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
    },

    // 文件上传事件
    onFileChange() {
      // 从input元素中获取图片数据
      const data = this.$refs.file.files[0]
      // 将图片数据转换为BLOB格式
      const img = window.URL.createObjectURL(data)
      // 赋值
      this.img = img
      // 显示弹出层
      this.isPhotoShow = true
      // 清空value 重复选择同一图片
      this.$refs.file.value = ''
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
