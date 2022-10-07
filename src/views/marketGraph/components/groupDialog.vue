<!--
 * @Author: Jelly
 * @Date: 2022-09-13 14:48:05
 * @LastEditTime: 2022-09-22 09:36:56
 * @LastEditors: Jelly
 * @Description: 群组判断弹窗
-->
<template>
  <div>
    <el-dialog
      title="群组设置"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
      close-on-click-modal
    >
      <el-form :model="formParams" ref="formRef" :rules="rulesForm" label-width="120px">
        <el-form-item label="判断群组：" prop="isGroup">
          <el-select v-model="formParams.isGroup" placeholder="请选择" style="width: 70%">
            <el-option
              v-for="item in groupList"
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
          <el-button type="primary" @click="submitForm(formRef)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
interface FormType {
  isGroup?: number
}
interface GroupListType {
  value: number
  label: string
}
const emit = defineEmits(['dialogSave'])
const formRef = ref<FormInstance>()
const dialogVisible = ref(false)
const formParams: FormType = reactive({})
const rulesForm = reactive<FormRules>({
  isGroup: [{ required: true, message: '请选择群组', trigger: 'change' }],
})
const groupList: GroupListType[] = reactive([{ label: '精准营销', value: 103626 }])
let model
let item

const handleEcho = (i, m) => {
  item = i
  model = m
  dialogVisible.value = true
}
const handleConfirm = () => {
  let arr = groupList.filter((ele) => {
    return ele.value === formParams.isGroup
  })[0]
  const text = `(${arr.value})${arr.label}`
  emit('dialogSave', [item, model, text,formParams,'giftForm'])
  handleClose()
}
const handleClose = () => {
  dialogVisible.value = false
  model = null
  item = null
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
// 抛出子组件方法
defineExpose({ handleEcho })
</script>
<style scoped></style>
