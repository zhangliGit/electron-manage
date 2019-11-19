<template>
  <div id="tableList" class="qui-fx-f1">
    <a-table
      :scroll="{y: this.$tools.setScroll('tableList')}"
      :customRow="customRow"
      :pagination="false"
      :rowKey="(record) => record.id"
      :rowSelection="selectObj"
      :columns="columns"
      :dataSource="tableList">
      <template v-if="isIndex" slot="index" slot-scope="text, record, index">
        {{ index | getPageIndex(pageList) }}
      </template>
      <template slot="photoPic" slot-scope="text">
        <img :src="text" style="width: 100px; height: 120px; display: block; margin: 0 auto" alt="">
      </template>
      <template slot="snapPic" slot-scope="text">
        <img :src="text" style="width: 100px; height: 120px; display: block; margin: 0 auto" alt="">
      </template>
      <template slot="action" slot-scope="text, record">
        <slot name="actions" :record="record"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'TableList',
  props: {
    isIndex: {
      type: Boolean,
      default: true
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableList: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageList: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 200
        }
      }
    },
    // 选中项
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  filters: {
    // 获取表格索引
    getPageIndex: (val, obj) => {
      if (JSON.stringify(obj) === '{}') {
        return val + 1
      } else {
        return (obj.page - 1) * obj.size + val + 1
      }
    },
  },
  computed: {
    typeForm () {
      if (this.isRadio) {
        return 'radio'
      } else if (this.isCheck) {
        return 'checkbox'
      } else {
        return 'checkbox'
      }
    },
    selectedRowKeys: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    selectObj () {
      if (!this.isRadio && !this.isCheck) return null
      return { type: this.typeForm, selectedRowKeys: this.selectedRowKeys, onSelect: this.selectChange, onChange: this.onSelectChange }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 点击单行表格
    customRow (record, index) {
      return {
        on: {
          click: () => {
            if (this.isRadio) {
              this.selectedRowKeys = [record.id]
            } else if (this.isCheck) {
              const index = this.selectedRowKeys.indexOf(record.id)
              if (index > -1) {
                this.selectedRowKeys.splice(index, 1)
              } else {
                this.selectedRowKeys.push(record.id)
              }
            }
          }
        }
      }
    },
    // 详情
    detail (record) {
      this.$emit('detail', record)
    },
    // 编辑
    modify (record, index) {
      this.$emit('modify', record)
    },
    // 删除
    del (record, index) {
      this.$emit('del', record)
    },
    // 绑定解绑
    bind (record, index) {
      this.$emit('bind', record)
    },
    // 解绑
    unbind (record) {
      this.$emit('unbind', record)
    },
    // 点击单选框
    selectChange (record) {
      if (this.isRadio) this.selectedRowKeys = [record.id]
    },
    // 点击复选框
    onSelectChange (record) {
      if (this.isCheck) this.selectedRowKeys = record
    }
  }
}
</script>

<style lang="less" scoped>
  .table-list {
  }
</style>
