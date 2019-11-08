<template>
  <div class="list">
    <div @click="back">返回</div>
    我是列表页哈哈
  </div>
</template>

<script>
export default {
  name: 'list',
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
}
</script>
<style lang="less" scoped>

</style>