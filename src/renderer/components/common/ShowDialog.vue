<template>
  <a-modal
    width="650px"
    :title="title"
    v-model="status"
    :maskClosable="false"
    :destroyOnClose="true"
  >
    <slot></slot>
    <template slot="footer">
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        {{ onText }}
      </a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  name: 'ShowDialog',
  props: {
    onText: {
      type: String,
      default: '确定'
    },
    title: {
      type: String,
      default: '详情'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    status: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', false)
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleOk () {
      this.status = false
      this.$emit('submit')
    }
  }
}
</script>

<style lang="less">

</style>
