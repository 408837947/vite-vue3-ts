<!--
 * @Author: Jelly
 * @Date: 2022-09-16 15:43:55
 * @LastEditTime: 2022-09-19 11:30:45
 * @LastEditors: Jelly
 * @Description:切换语言
-->
<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <span class="el-dropdown-link">
      {{ currentName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(item, index) in languages"
          :disabled="currentName === item.key"
          :key="index"
          :command="item.key"
          >{{ item.value }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import useMainStore from '@/store/useMainStore'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const store = useMainStore()
const languages = [
  { key: 'zh', value: '简体中文' },
  // { key: 'zh-tw', value: '繁体中文' },
  { key: 'en', value: 'English' },
]
let currentName = ref('简体中文')
const { locale } = useI18n()
const handleSetLanguage = (lang) => {
  locale.value = lang
  setCurrentName(lang)
  store.setLanguages(lang)
  ElMessage({ message: '操作成功', type: 'success' })
}
const setCurrentName = (lang) => {
  currentName.value = languages.filter((item) => {
    return item.key === lang
  })[0].value
}
</script>
<style scoped>
.international {
  margin: 6px 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
