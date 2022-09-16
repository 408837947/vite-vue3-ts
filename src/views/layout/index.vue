<!-- 左侧菜单栏 -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <!-- <div class="header">
          <div class="left">
            <el-icon @click="handleCollapse" v-if="isCollapse">
              <Fold />
            </el-icon>
            <el-icon @click="handleCollapse" v-if="!isCollapse">
              <Expand />
            </el-icon>
            无忧行管理系统
          </div>
        </div> -->
        <Header :isCollapse="isCollapse" @handle-collapse="handleCollapse" ></Header>
      </el-header>
      <el-container>

        <el-menu class="el-menu el-menu-vertical-demo" width:active-text-color="#ffd04b" background-color="#242424"
          text-color="#fff" router :collapse="isCollapse" @open="handleOpen" @close="handleClose">
          <el-sub-menu :index="sub.path" v-for="sub in store.menuList">
            <template #title>
              <el-icon>
                <component :is="sub.meta.icon"></component>
              </el-icon>
              <span>{{sub.meta.title}}</span>
            </template>
            <el-menu-item v-for="item in sub.children" :key="item.path" :index="item.path">
              {{item.meta.title}}
            </el-menu-item>
          </el-sub-menu>
        </el-menu>

        <el-main>
          <div class="main">
            <Breadcrumb />
            <RouterView>
              <template #default="{ Component, route }">
                <keep-alive>
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
              </template>
            </RouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import useMainStore from '@/store/useMainStore'
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Header from '@/components/Header/index.vue';
const store = useMainStore()
watchEffect(() => {
  store.getSystemMenu()
})
let isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleCollapse = (value:boolean) => {
  isCollapse.value = value
}
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100%;

  &>.el-container {
    height: 100%;

    span,
    li {
      font-weight: 300;
    }

    &>.el-header {
      padding: 0;

      .header {
        background-color: #242424;
      }
    }

    .el-menu:not(.el-menu--collapse) {
      width: 220px;
    }

    .el-menu {
      height: 100%;

      .el-menu-item {
        background-color: #2a3033 !important;

        &:hover {
          color: #409eff !important;
        }
      }
    }

  }

}

.header {
  width: 100%;
  height: 100%;
  padding: 14px 30px;
  background-color: #545c64;
  box-sizing: border-box;

  .left {
    margin-left: 20px;
    font-size: 22px;
    position: relative;
    color: #fff;
    font-weight: 300;

    .el-icon {
      cursor: pointer;
      position: absolute;
      top: 5px;
      left: -25px;
    }
  }
}

.el-main {
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  .main{
    padding-bottom: 20px;
    background-color: #fff;
  }
}
</style>
