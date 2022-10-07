// 发布状态
export const planSendStatusList = [
  { value: 1, label: 'market.plan.unPublished' }, // 未发布
  { value: 2, label: 'market.plan.published' }, // 已发布
  { value: 3, label: 'market.plan.finish' }, // 结束
  // { value: 4, label: 'market.plan.pause' }, // 暂停
]

// 计划类型
export const planTypeList = [
  { value: 1, label: 'market.plan.eventTrigger' }, // 事件触发
  // { value: 2, label: 'market.plan.single' }, // 单次
  // { value: 3, label: 'market.plan.cycle' }, // 周期
  // { value: 4, label: 'market.plan.specificTime' }, // 特定时间
]

// 审核状态
export const planAuditStatusList = [
  { value: 1, label: 'market.plan.draft' }, // 草稿
  { value: 2, label: 'market.plan.pendingReview' }, // 待审核
  { value: 3, label: 'market.plan.reviewSucceeded' }, // 审核成功
  { value: 4, label: 'market.plan.auditFailure' }, // 审核失败
  { value: 5, label: 'market.plan.changedPendingReview' }, // 已变更待提审
]
