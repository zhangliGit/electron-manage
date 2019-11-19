<template>
  <div class="home qui-fx-f1">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="宿管" key="1">
        <div style="background: red"></div>
        <!-- <table-list
          :page-list="pageList"
          :columns="columns"
          :table-list="list">
          <template v-slot:actions="action">
            <a-tag color="#f50">历史版本</a-tag>
          </template>
        </table-list> -->
      </a-tab-pane>
      <a-tab-pane tab="考勤" key="2">考勤</a-tab-pane>
      <a-tab-pane tab="电子班牌" key="3">电子班牌</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TableList from '@c/common/TableList'
const columns = [
  {
    title: '序号',
    scopedSlots: {
      customRender: 'index'
    },
    width: '10%'
  }, {
    title: '模块名',
    dataIndex: 'name',
    width: '20%'
  },  {
    title: '模块描述',
    dataIndex: 'des',
    width: '30%'
  }, {
    title: '开发者',
    dataIndex: 'user',
    width: '10%'
  }, {
    title: '版本号',
    dataIndex: 'version',
    width: '20%'
  }, {
    title: '操作',
    dataIndex: '',
    width: '10%',
    scopedSlots: {
      customRender: 'action'
    }
  }
]
export default {
  name: "Home",
  data() {
    return {
      list: [],
      columns,
      pageList: {
        page: 1,
        size: 20
      }
    };
  },
  components: {
    TableList
  },
  created() {},
  async mounted() {
    const res = await this.moduleList()
    this.list = res.data
  },
  methods: {
    ...mapActions('manage', [
      'moduleList'
    ])
  },
};
</script>
<style lang="less" scoped>
.home {
  color: @main-color
}
</style>