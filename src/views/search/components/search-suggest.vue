<template>
  <div class="search-suggestion">
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, id) in suggestion"
      :key="id"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="replaceText(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api/search.js'

import { debounce } from 'lodash'

export default {
  name: 'SearchSuggest',
  data() {
    return {
      suggestion: []
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggest(val) {
      try {
        const {
          data: {
            data: { options }
          }
        } = await getSearchSuggest(val)

        this.suggestion = options

        if (options[0] === null) {
          this.suggestion = []
        }
      } catch (error) {
        this.$toast.fail('获取数据失败，请检查网络')
      }
    },

    // 高亮搜索关键字
    replaceText(txt) {
      // // 当txt为空或者null时 退出函数
      // if (txt === null || txt === []) {
      //   return this.searchText
      // }

      // 根据变量 动态创建正则表达式
      const reg = new RegExp(this.searchText, 'gi')

      // 替换文本
      const hightLightText = `<span style="color: #3296fa ">${this.searchText}</span>`

      // replace默认情况只能匹配替换一个字符 此处使用正则全局匹配即可全局替换
      return txt.replace(reg, hightLightText)
    }
  },

  props: {
    searchText: {
      type: String,
      require: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggest(value)
      }, 500),
      immediate: true
    }
  }
}
</script>

<style scoped></style>
