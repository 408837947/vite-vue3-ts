<!--
 * @Author: Jelly
 * @Date: 2022-09-13 14:47:52
 * @LastEditTime: 2022-09-22 09:36:40
 * @LastEditors: Jelly
 * @Description: 发送奖励弹窗
-->
<template>
  <div>
    <el-dialog
      title="奖励设置"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
      close-on-click-modal
    >
      <el-form :model="formParams" ref="form" :rules="rulesForm" label-width="130px">
        <el-form-item label="允许重复发放：" prop="isAllowed">
          <el-radio-group v-model="formParams.isAllowed">
            <el-radio :label="1">不允许</el-radio>
            <el-radio :label="2">允许</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="奖品：" prop="reward">
          <el-select v-model="formParams.reward" placeholder="请选择" style="width: 70%">
            <el-option
              v-for="item in rewardList"
              :key="item.value"
              :label="`(${item.value})${item.label}`"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
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
  isAllowed?:number;
  reward?:number
}
const dialogVisible = ref(false)
const formParams:FormType = reactive({})
const rulesForm = reactive<FormRules>({
  isAllowed: [{ required: true, message: '请选择群组', trigger: 'change' }],
  reward: [{ required: true, message: '请选择奖品', trigger: 'change' }],
})
const form = ref()
const emit = defineEmits(['dialogSave'])
const rewardList = reactive([{ label: '精准营销', value: 103626 }])
let model
let item
const handleEcho = (i, m) => {
  item = i
  model = m
  dialogVisible.value = true
}
const handleConfirm = () => {
  let arr = rewardList.filter((ele) => {
    return ele.value === formParams.reward
  })[0]
  let text = `${formParams.isAllowed === 1 ? '不允许' : '允许'},(${arr.value})${arr.label}`
  emit('dialogSave', [item, model, text,formParams,'giftForm'])
  handleClose()
}
const handleClose = () => {
  item = null
  model = null
  dialogVisible.value = false
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
defineExpose({ handleEcho })
</script>
<style scoped></style>
