<template>
  <div class="home">
    <ul>
      <li v-for="list in dataList" :key="list.id">
        {{ list.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    goList () {
      this.$router.push('/list')
    },
    getList () {
      this.$store.dispatch('getList').then(res => {
        this.dataList = res.data
      })
    }
  },
  mounted() {
    this.getList()
  },
}
</script>
<style lang="less" scoped>
  .home {
    li {
      border-bottom: 1px #ccc solid;
      padding: 20px;
    }
  }
</style>