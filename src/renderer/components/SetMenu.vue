<template>
  <div class="set-menu">
    <a-row type="flex" justify="space-between">
      <a-col class="qui-fx qui-fx-ac">
        <div class="qui-fx">
          <a-form :form="form" layout="inline" class="qui-fx">
            <div v-for="(item, index) in setLabel" :key="index">
              <!--文本框-->
              <a-form-item v-bind="formItemLayout" :label="item.label" v-if="item.type === 'input'">
                <a-input
                  :placeholder="item.placeholder"
                  :read-only="item.readonly"
                  :disabled="item.disabled"
                  v-decorator="[
              item.value,
              { initialValue: item.initValue + '', rules: [
                { type: item.validator || '', len: item.len, max: item.max, required: item.required, message: item.placeholder }
              ]}
            ]"
                />
              </a-form-item>
              <!--选择框-->
              <a-form-item :label="item.label" v-if="item.type === 'select'">
                <a-select
                  v-decorator="[
                    item.value,
                    { rules: [{ required: false, message: item.placeholder }]}
                  ]"
                  style="width: 150px"
                  :placeholder="item.placeholder || '全部'"
                  @change="item.change"
                  @select="item.change"
                >
                  <a-select-option
                    v-for="(item2, index2) in item.list"
                    :value="item2.key"
                    :key="index2"
                  >{{ item2.val }}</a-select-option>
                </a-select>
              </a-form-item>
              <!--选择框多选-->
              <a-form-item :label="item.label" v-if="item.type === 'selectMore'">
                <a-select
                  mode="multiple"
                  v-decorator="[
                    item.value,
                    { initialValue: item.initValue,rules: [{ required: false, message: item.placeholder }]}
                  ]"
                  style="width: 100%;min-width:200px;"
                  showArrow
                  @select="item.select"
                  @deselect="item.deselect"
                >
                  <a-select-option
                    v-for="(item2, index2) in item.list"
                    :value="item2.key"
                    :key="index2"
                  >{{ item2.val }}</a-select-option>
                </a-select>
              </a-form-item>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "SetMenu",
  props: {
    setLabel: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      moment,
      form: this.$form.createForm(this)
    };
  },
  methods: {}
};
</script>

<style>
</style>
