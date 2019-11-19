<template>
  <a-row class="pagination-com" type="flex" justify="end" align="middle">
    <span class="page-total">一共{{ total }}条</span>
    <a-pagination
      :pageSize.sync="pageList.size"
      :total="total"
      showSizeChanger
      showQuickJumper
      @change="changePage"
      @showSizeChange="changeSize" />
  </a-row>
</template>

<script>
export default {
  name: 'PageNum',
  props: {
    total: {
      type: Number,
      default: 0
    },
    value: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      pageList: this.value
    }
  },
  mounted () {
  },
  methods: {
    changePage (page, size) {
      this.$emit('input', {
        page,
        size
      })
      this.$emit('change-page')
    },
    changeSize (page, size) {
      this.$emit('input', {
        page,
        size
      })
      this.$emit('change-page')
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination-com {
    margin: 30px 0;
    .page-total {
      margin-right: 10px;
    }
  }
</style>
