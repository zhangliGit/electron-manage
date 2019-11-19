<template>
  <div class="search-form">
    <a-row type="flex" justify="space-between" style="padding: 15px">
      <a-col>
        <slot name="left"></slot>
      </a-col>
      <a-col class="qui-fx qui-fx-ac">
        <div class="qui-fx">
          <a-form
            :form="form"
            layout="inline"
            class="qui-fx"
          >
            <div v-for="(item, index) in searchLabel" :key="index">
              <!--文本框-->
              <a-form-item
                :label="item.label"
                v-if="item.type === 'input'"
              >
                <a-input
                  :placeholder="item.placeholder"
                  v-decorator="[
                    item.value,
                    {rules: [
                      { required: false, message: item.placeholder || '请输入' }
                    ]}
                  ]"
                />
              </a-form-item>
              <!--选择框-->
              <a-form-item
                :label="item.label"
                v-if="item.type === 'select'"
              >
                <a-select
                  v-decorator="[
                    item.value,
                    { rules: [{ required: false, message: item.placeholder }]}
                  ]"
                  style="width: 120px"
                  :placeholder="item.placeholder || '全部'"
                >
                  <a-select-option v-for="(item2, index2) in item.list" :value="item2.key" :key="index2">
                    {{ item2.val }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <!--单选日期-->
              <a-form-item
                :label="item.label"
                v-if="item.type === 'singleTime'"
              >
                <a-date-picker v-decorator="[item.value, {rules: [{ required: false, message: item.placeholder }]}]" />
              </a-form-item>
              <!--复选日期-->
              <a-form-item
                :label="item.label"
                v-if="item.type === 'rangeTime'"
              >
                <a-range-picker v-decorator="[item.value, {rules: [{ required: false, message: item.placeholder }]}]" />
              </a-form-item>
            </div>
          </a-form>
        </div>
        <a-button type="primary" style="margin-left: 0px" @click="searchBtn">搜索</a-button>
        <slot name="right"></slot>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SearchForm',
  props: {
    searchLabel: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      moment,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    searchBtn (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          for (const key in values) {
            if (Object.prototype.toString.call(values[key]) === '[object Object]' && values[key]._isAMomentObject) {
              values[key] = moment(values[key]).format('YYYY-MM-DD')
            }
            if (values[key] instanceof Array && values[key].length === 0) {
              values[key] = ''
            }
            if (values[key] instanceof Array && values[key][0]._isAMomentObject) {
              values[key] = [moment(values[key][0]).format('YYYY-MM-DD'), moment(values[key][1]).format('YYYY-MM-DD')]
            }
            if (typeof values[key] === 'undefined' || values[key] === null) values[key] = ''
          }
          this.$emit('search-form', values)
        }
      })
    }
  }
}
</script>

<style>

</style>
