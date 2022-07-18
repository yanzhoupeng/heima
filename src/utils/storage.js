/**
 * 封装本地存储方法
 *  获取本地存储信息 get
 *  进行本地存储 set
 *  删除本地存储 delete
 */

// set
export const setItem = (key, value) => {
  // 判断是否为对象数据类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// get
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)

  // 取出数据后，通过try catch返回数据
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// del
export const deleteItem = (key) => {
  window.localStorage.deleteItem(key)
}
