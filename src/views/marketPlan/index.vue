<!--
 * @Author: Jelly
 * @Date: 2022-09-16 10:02:56
 * @LastEditTime: 2022-09-20 18:24:58
 * @LastEditors: Jelly
 * @Description:计划列表
-->
<template>
  <div class="panel-body">
    <Panel title="查询条件">
      <el-form :model="formParams" label-width="80px" status-icon>
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('market.plan.id')">
              <el-input v-model="formParams.planId" style="width: 80%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('market.plan.name')">
              <el-input v-model="formParams.planName" style="width: 80%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('market.plan.type')">
              <el-select v-model="formParams.planType" style="width: 80%" placeholder="请选择">
                <el-option
                  v-for="item in planTypeList"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('market.plan.status')">
              <el-select v-model="formParams.sendStatus" style="width: 80%" placeholder="请选择">
                <el-option
                  v-for="item in planSendStatusList"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="21">
            <el-form-item :label="$t('market.plan.auditStatus')">
              <el-select v-model="formParams.sendStatus" placeholder="请选择" style="width: 20%">
                <el-option
                  v-for="item in planAuditStatusList"
                  :key="item.value"
                  :label="$t(item.label)"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button icon="Search" size="large" type="primary"> 查询 </el-button>
          </el-col>
        </el-row>
      </el-form>
    </Panel>
    <div class="filter-container">
      <el-button-group>
        <el-button type="primary" size="large" icon="Plus" @click="addPlan"> 新增计划 </el-button>
      </el-button-group>
    </div>
    <el-table :data="tabelData" border>
      <el-table-column align="center" label="计划ID" prop="planId" width="100"> </el-table-column>
      <el-table-column align="center" label="计划名称" prop="planName" width="120">
      </el-table-column>
      <el-table-column align="center" label="类型" prop="planType" width="100">
        <template #default="scope">
          <span>{{ formatterKey(scope.row, 'planType', planTypeList) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" prop="startTime"> </el-table-column>
      <el-table-column align="center" label="结束时间" prop="endTime"> </el-table-column>
      <el-table-column align="center" label="发布状态" prop="sendStatus" width="140">
        <template #default="scope">
          <span>{{ formatterKey(scope.row, 'sendStatus', planSendStatusList) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" prop="creator" width="100"> </el-table-column>
      <el-table-column align="center" label="审核状态" prop="auditStatus" width="140">
        <template #default="scope">
          <span>{{ formatterKey(scope.row, 'auditStatus', planAuditStatusList) }}</span>
          <el-tooltip v-if="scope.row.auditStatus === 3" class="item" :content="'123'">
            <em class="el-icon-question" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核人" prop="operator" width="100"> </el-table-column>
      <el-table-column align="center" label="策略配置" prop="policyConfig" width="100">
        <template #default="scope">
          <el-button
            text
            :type="scope.row.policyConfig === 1 ? 'danger' : 'primary'"
            @click="jumpConfig(scope.row)"
          >
            {{ scope.row.policyConfig === 1 ? '待配置' : '已配置' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" prop="operate">
        <template #default="scope">
          <div v-if="scope.row.sendStatus === 1">
            <div v-if="scope.row.auditStatus === 3" class="text-button">发布</div>
            <div v-if="[1, 4, 5].includes(scope.row.auditStatus)" class="text-button">提审</div>
            <div v-if="[2].includes(scope.row.auditStatus)" class="text-button">撤回提审</div>
            <div
              v-if="[2].includes(scope.row.auditStatus)"
              class="text-button"
              @click="approval(scope.row)"
            >
              审批
            </div>
          </div>
          <div
            v-if="[1, 2].includes(scope.row.sendStatus)"
            class="text-button"
            @click="editPlan(scope.row)"
          >
            编辑
          </div>
          <div v-if="[2, 3].includes(scope.row.sendStatus)" class="text-button">查看</div>
          <div v-if="[1, 2, 3].includes(scope.row.sendStatus)" class="text-button">复制</div>
          <div v-if="[1].includes(scope.row.sendStatus)" class="text-button">删除</div>
          <!-- <div v-if="[2].includes(scope.row.sendStatus)" >
                  启动
                </div>
                <div v-if="[1].includes(scope.row.sendStatus)" >
                  暂停
                </div> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="formParams.pageNum"
      v-model:pageSize="formParams.pageSize"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 10px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
  <AddPlanDialog ref="addPlanDialog" />
  <AuditPlanDialog ref="aduitPlanDiaLog" />
</template>

<script setup lang="ts">
import Panel from '@/components/Panel/index.vue'
import { planSendStatusList, planTypeList, planAuditStatusList } from '@/utils/enumerate/market'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AddPlanDialog from './components/addPlanDialog.vue'
import AuditPlanDialog from './components/auditPlanDialog.vue'

interface TableData {
  planId: number
  planName: string
  planType: number
  startTime: string
  endTime: string
  sendStatus: number
  creator: string
  auditStatus: number
  operator: string
  policyConfig: number
}
interface DataFormat {
  label: string
  value: number
}
const { t } = useI18n()
const router = useRouter()
const addPlanDialog = ref()
const aduitPlanDiaLog = ref()
const formParams = reactive({
  planId: '',
  planName: '',
  planType: '',
  sendStatus: '',
  auditStatus: '',
  pageSize: 10,
  pageNum: 1,
})
const total = ref(0)
const tabelData: TableData[] = [
  {
    planId: 1,
    planName: 'ljw',
    planType: 1,
    startTime: '2022-09-07 10:36:25',
    endTime: '2022-09-09 10:36:25',
    sendStatus: 1,
    creator: 'ljw',
    auditStatus: 2,
    operator: 'ljw',
    policyConfig: 1,
  },
]

const formatterKey = (row: TableData[], key: string, data: DataFormat[]): string => {
  const val = data.filter((item) => item.value == row[key])
  if (val.length > 0) {
    return t(val[0].label)
  } else {
    return '-'
  }
}
const jumpConfig = (row: TableData) => {
  router.push({
    path: '/graph',
    query: { planId: row.planId, sendStatus: row.sendStatus },
  })
}
const approval = (row: TableData) => {
  aduitPlanDiaLog.value.handleEcho(row)
}
const addPlan = () => {
  addPlanDialog.value.handleEcho()
}
const editPlan = (row: TableData) => {
  addPlanDialog.value.handleEcho(row)
}
const handleSizeChange = (val: number) => {
  formParams.pageSize = val
}
const handleCurrentChange = (val: number) => {
  formParams.pageNum = val
}
</script>
<style lang="scss">
.text-button {
  color: #409eff;
  cursor: pointer;
}

.filter-container {
  margin-bottom: 20px;
}
</style>
