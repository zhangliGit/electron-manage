/**
 * @description 全局的功能函数
 */

import Vue from 'vue'
const vm = new Vue({})

const Tools = {
  // 设置table滚动高度
  setScroll (id) {
    if (document.getElementById(id)) {
      return document.getElementById(id).offsetHeight - 55
    }
  },
  // 延迟处理方法
  goNext: (fn) => {
    setTimeout(() => {
      fn()
    }, 1200)
  },
  // 删除提示
  delTip (title = '确定删除吗?', fn) {
    vm.$confirm({
      title,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk () {
        fn()
      }
    })
  },
  // 表单回填
  fillForm (autoForm, record) {
    return autoForm.map(item => {
      var initValue
      initValue = record[item.value] || ''
      if (item.type === 'rangeTime') {
        initValue = [record.startTime, record.endTime]
      }
      return {
        ...item,
        initValue: initValue
      }
    })
  }
}

export default Tools
