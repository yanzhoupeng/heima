<template>
  <div class="">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('closePop')"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    confirm(value) {
      // 转换日期格式
      const newBirthday = dayjs(value).format('YYYY-MM-DD')
      // 修改birthday数据
      this.$emit('input', newBirthday)
      // 发起ajax请求
      this.$emit('changeUserGender', { birthday: newBirthday })
    }
  }
}
</script>

<style scoped></style>
