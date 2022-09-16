<!--
 * @Author: Jelly
 * @Date: 2022-09-16 10:38:26
 * @LastEditTime: 2022-09-16 14:40:35
 * @LastEditors: Jelly
 * @Description:面包屑头部
-->
<template>
  <div class="app-breadcrumb">
    <el-icon>
      <Menu />
    </el-icon>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
          {{ item.meta?.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { compile } from 'path-to-regexp'
const levelList = ref(null)

//Whether close the animation fo breadcrumb
const route = useRoute()
const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  levelList.value = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const pathCompile = (path) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const router = useRouter()
const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) {
    router.push(pathCompile(path))
  }
}
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
onBeforeMount(() => {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #f5f5f5;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  .el-breadcrumb {
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    margin-left: 8px;
    color: #333;

    .no-redirect {
      cursor: text;
    }

    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      font-weight: 400;
    }
  }
}
</style>
