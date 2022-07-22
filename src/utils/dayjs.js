import dayjs from 'dayjs' // ES 2015
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

Vue.filter('timeFilter', (value) => dayjs().to(dayjs(value)))
