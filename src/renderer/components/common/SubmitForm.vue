<template>
  <a-modal
    width="650px"
    :title="title"
    v-model="status"
    @ok="submitOk"
    :maskClosable="false"
    :destroyOnClose="true"
    okText="提交"
    :confirmLoading="confirmLoading"
  >
    <a-form
      :form="form"
    >
      <div v-for="(item, index) in formData" :key="index">
        <!--文本框-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'input'"
        >
          <a-input
            :placeholder="item.placeholder"
            :read-only="item.readonly"
            :disabled="item.disabled"
            v-decorator="[
              item.value,
              { initialValue: item.initValue + '', rules: [
                { type: item.validator || '', len: item.len, max: item.max, required: !item.hasOwnProperty('required') || item.required, message: item.placeholder }
              ]}
            ]"
          />
        </a-form-item>
        <!--单选框-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'radio'"
        >
          <a-radio-group :read-only="item.readonly" :disabled="item.disabled" buttonStyle="solid" v-decorator="[item.value, {initialValue: item.initValue, rules: [{ required: !item.hasOwnProperty('required') || item.required, message: item.placeholder }]}]">
            <a-radio-button :value="list.key" v-for="(list, ind) in item.list" :key="ind">
              {{ list.val }}
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!--复选框-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'checkbox'"
        >
          <a-checkbox-group
            :read-only="item.readonly"
            :disabled="item.disabled"
            v-decorator="[item.value, {initialValue: item.initValue, rules: [{ required: !item.hasOwnProperty('required') || item.required, message: item.placeholder }]}]"
            style="width: 100%;margin-top: 8px;"
            :placeholder="item.placeholder"
          >
            <a-row>
              <a-col :span="24 % (item.list.length) == 0 ? 24/item.list.length : parseInt(24/item.list.length)" v-for="(item1, index1) in item.list" :key="index1">
                <a-checkbox :value="item1.key">
                  {{ item1.val }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <!--选择框-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'select'"
        >
          <a-select
            :read-only="item.readonly"
            :disabled="item.disabled"
            v-decorator="[
              item.value,
              { initialValue: item.initValue, rules: [{ required: !item.hasOwnProperty('required') || item.required, message: item.placeholder }]}
            ]"
            :placeholder="item.placeholder"
          >
            <a-select-option v-for="(item2, index2) in item.list" :value="item2.key" :key="index2">
              {{ item2.val }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!--上传图片-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'upload'"
        >
          <slot name="upload"></slot>
        </a-form-item>
        <!--单个日期-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'singleTime'"
        >
          <a-date-picker v-decorator="[item.value, {initialValue: moment(item.initValue || new Date(), 'YYYY-MM-DD'), rules: [{ required: !item.hasOwnProperty('required') || item.required, message: item.placeholder }]}]" />
        </a-form-item>
        <!--日期区间-->
        <a-form-item
          v-bind="formItemLayout"
          :label="item.label"
          v-if="item.type === 'rangeTime'"
        >
          <a-range-picker v-decorator="[item.value, {initialValue: [moment(item.initValue[0] || new Date(), 'YYYY-MM-DD'), moment(item.initValue[1] || new Date(), 'YYYY-MM-DD')], rules: [{ required: !item.hasOwnProperty('required') || item.required, message: item.placeholder }]}]" />
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SubmitForm',
  components: {
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Array,
      default: () => {
        return []
      }
    }
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
      moment,
      confirmLoading: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      }
    }
  },
  methods: {
    reset () {
      this.confirmLoading = false
      this.$emit('input', false)
    },
    error () {
      this.confirmLoading = false
    },
    submitOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          for (const key in values) {
            if (values[key]._isAMomentObject) {
              values[key] = moment(values[key]).format('YYYY-MM-DD')
            }
            if (values[key] instanceof Array && values[key][0]._isAMomentObject) {
              values[key] = [moment(values[key][0]).format('YYYY-MM-DD'), moment(values[key][1]).format('YYYY-MM-DD')]
            }
          }
          this.confirmLoading = true
          this.$emit('submit-form', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
