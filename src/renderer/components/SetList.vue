<template>
  <a-modal
    width="1280px"
    height="1024px"
    title="设置"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    okText="确定"
    v-model="status"
    :footer="null"
  >
    
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SetList',
  components: {
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
   computed: {
    status: {
      get () {
        return this.value
      },
      set () {
        this.$emit('input', false)
      }
    }
  },
  data () {
    return {
      moment
    }
  },
  methods: {
    submitOk (e) {
      e.preventDefault()
      this.$emit('ok')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
