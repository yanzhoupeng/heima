<template>
  <div class="update-photo">
    <img :src="img" alt="" class="img" ref="img" />

    <div class="toolbar">
      <div @click="$emit('closePop')">取消</div>
      <div @click="submitAvater">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { updateUserAvater } from '@/api/user-profile.js'

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },

  methods: {
    // 上传用户头像
    submitAvater() {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto(blob)
      })
    },

    // 上传事件
    async updateUserPhoto(blob) {
      // 加载提醒
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 创建FormDate实例对象
        const formDate = new FormData()
        // 将blob格式的图像数据压入实例对象中
        formDate.append('photo', blob)
        // 发起ajax请求
        const { data } = await updateUserAvater(formDate)
        // 关闭弹出层
        this.$emit('closePop')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        // 成功提醒
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('网络错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background: #000;
  width: 100%;
  height: 100%;

  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    justify-content: space-between;

    padding: 0 40px 20px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 90px;
      height: 90px;
      font-size: 30px;

      color: #fff;
    }
  }
}
</style>
