<template>
  <div class="home qui-fx-f1">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="宿管" key="1">宿管</a-tab-pane>
      <a-tab-pane tab="考勤" key="2">考勤</a-tab-pane>
      <a-tab-pane tab="电子班牌" key="3">电子班牌</a-tab-pane>
    </a-tabs>
    <div>
      我是文字
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
    };
  },
  components: {
  },
  created() {},
  mounted() {
    this.$message.loading('努力加载中...', 0)
  },
};
</script>
<style lang="less" scoped>
.home {
  color: @main-color
}
</style>