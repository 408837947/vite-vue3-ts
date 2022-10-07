<!--
 * @Author: Jelly
 * @Date: 2022-09-20 14:53:59
 * @LastEditTime: 2022-09-20 15:39:44
 * @LastEditors: Jelly
 * @Description:审核意见
-->
<template>
  <el-dialog v-model="dialogAuditVisible" :title="$t('market.plan.auditOpinion')">
    <el-form :inline="false" :model="auditForm" ref="auditFormRef" :rules="rules">
        <el-form-item prop="type">
          <el-radio-group v-model="auditForm.type">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="2">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="context" v-if="auditForm.type===2">
          <el-input type="textarea" placeholder="请输入不通过原因" v-model="auditForm.context">
          </el-input>
        </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose(auditFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(auditFormRef)">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormInstance,FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
interface FormType {
  type:number;
  context?:string
}
const dialogAuditVisible = ref(false)
const auditFormRef = ref<FormInstance>()
const auditForm:FormType = reactive({
  type:2,
  context:''
})
let planId =ref(null)
const rules = reactive<FormRules>({
  type:[{required:true,message:'请选择',trigger:'change'}],
  context:[{required:true,message:'请填写不通过原因',trigger:'blur'}]
})
const handleClose = (formEL:FormInstance | undefined)=>{
  if(!formEL) return
  formEL.resetFields()
}
const handleEcho = (row) => {
  dialogAuditVisible.value = true
  planId.value = row.planId
}
defineExpose({ handleEcho }) // 抛出子类方法，父级可调用
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(auditForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped></style>
