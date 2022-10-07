<!--
 * @Author: Jelly
 * @Date: 2022-09-19 17:13:21
 * @LastEditTime: 2022-09-20 15:25:53
 * @LastEditors: Jelly
 * @Description:新增计划
-->
<template>
  <el-dialog v-model="dialogPlanVisible" :title="$t(`btn.${titleType}`)+$t('market.plan.plan')">
    <el-form :model="planForm" ref="planFormRef" :rules="rules">
      <el-form-item prop="planName" :label="$t('market.plan.name')">
        <el-input v-model="planForm.planName" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="planTime" :label="$t('market.plan.time')">
        <el-date-picker
          v-model="planForm.planTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="Start date"
          end-placeholder="End date"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(planFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(planFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormInstance,FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
const dialogPlanVisible = ref(false)
const titleType = ref('add')
const planFormRef = ref<FormInstance>()
interface PlanFormType {
  planName: string
  planTime?: [Date, Date]
  // startTime: string
  // endTime: string
}
interface DataFormType extends PlanFormType {
  startTime: Date
  endTime: Date
}
const planForm: PlanFormType = reactive({
  planName: '',
})
const rules = reactive<FormRules>({
  planName:[{required:true,message:'请填写计划名称',trigger:'blur'}],
  planTime:[{required:true,message:'请选择计划时间',trigger:'change'}]
})
const handleEcho = (data: DataFormType) => {
  if (data) {
    planForm.planName = data.planName
    planForm.planTime = [data.startTime, data.endTime]
  }
  dialogPlanVisible.value = true
}
defineExpose({ handleEcho }) // 抛出子类方法，父级可调用
const handleClose = (formEl: FormInstance | undefined) => {
  dialogPlanVisible.value = false
  resetForm(formEl)
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(planForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped></style>
