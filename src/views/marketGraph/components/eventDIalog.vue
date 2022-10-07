<!--
 * @Author: Jelly
 * @Date: 2022-09-13 14:47:58
 * @LastEditTime: 2022-09-22 09:36:24
 * @LastEditors: Jelly
 * @Description: 事件判断弹窗
-->
<template>
  <div>
    <el-dialog
      title="事件设置"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
      close-on-click-modal
    >
      <el-form :model="formParams" ref="form" :rules="rulesForm" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="触发事件" prop="trigger">
              <el-select style="width: 100%" v-model="formParams.trigger" placeholder="请选择">
                <el-option
                  v-for="item in triggerList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="event" label-width="10px">
              <el-select style="width: 100%" v-model="formParams.event" placeholder="请选择">
                <el-option
                  v-for="item in eventList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="业务线" prop="bizType">
          <el-checkbox-group v-model="formParams.bizType">
            <el-checkbox v-for="item in bizTypeList" :label="item.value" :key="item.value">{{
              item.label
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="订单金额≥" prop="orderPrice">
          <el-input v-model.number="formParams.orderPrice" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitForm(form)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
interface FormType {
  trigger?: number
  event?: number
  bizType?: number[]
  orderPrice?: number
}
const dialogVisible = ref(false)
const formParams = reactive<FormType>({})
const rulesForm = reactive<FormRules>({
  event: [{ required: true, message: '请选择', trigger: 'change' }],
  trigger: [{ required: true, message: '请选择', trigger: 'change' }],
  bizType: [{ required: true, message: '请选择业务线', trigger: 'change' }],
  orderPrice: [
    { required: true, message: '请输入订单金额', trigger: 'blur' },
    { type: 'number', message: '请输入数字' },
  ],
})
const form = ref()
let model
let item
const triggerList = reactive([{ label: '交易行为', value: 1 }])
const eventList = reactive([{ label: '订单完成支付', value: 1 }])
const bizTypeList = reactive([
  { label: '实物', value: 1 },
  { label: '门票', value: 2 },
  { label: '机票', value: 3 },
  { label: '火车票', value: 4 },
  { label: '酒店', value: 5 },
  { label: '流量', value: 7 },
  { label: '语音', value: 8 },
  { label: '无忧币', value: 6 },
])
const emit = defineEmits(['dialogSave'])
const handleEcho = (i, m) => {
  dialogVisible.value = true
  item = i
  model = m
}
const handleConfirm = () => {
  let arr = eventList.filter((ele) => {
    return ele.value === formParams.event
  })[0]
  const text = `${arr.label}`
  emit('dialogSave', [item, model, text,formParams,'eventTrigger'])
  handleClose()
}
const handleClose = ()=>{
  dialogVisible.value =false
  item = null
  model = null
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleConfirm()
    } else {
      console.log('error submit!', fields)
    }
  })
}
defineExpose({handleEcho})
</script>
<style scoped></style>
