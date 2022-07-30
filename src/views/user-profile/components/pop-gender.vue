<template>
  <div class="">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('closePop')"
      @change="onChange"
      :default-index="gender"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onConfirm(value, index) {
      // 修改gender数据
      this.$emit('input', index)
      // 发起ajax请求
      this.$emit('changeUserGender', { gender: index })
    },
    onChange(picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style scoped></style>
