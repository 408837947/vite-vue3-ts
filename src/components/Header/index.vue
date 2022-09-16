<!--
 * @Author: Jelly
 * @Date: 2022-09-16 10:38:55
 * @LastEditTime: 2022-09-16 17:11:40
 * @LastEditors: Jelly
 * @Description:顶部退出登录
-->
<template>
  <div class="header">
    <div class="left">
      <el-icon @click="handleClick" v-if="isCollapse">
        <Fold />
      </el-icon>
      <el-icon @click="handleClick" v-if="!isCollapse">
        <Expand />
      </el-icon>
      无忧行管理系统
    </div>
    <div class="right">
      <el-tooltip content="全屏">
        <el-icon class="fullScreen" @click="onToggle">
          <FullScreen />
        </el-icon>
      </el-tooltip>
      <SelectLang />
      <el-dropdown trigger="click" class="logOut" @command="handleLogOut">
        <span class="el-dropdown-link">
          <img :src="'/src/assets/img/avatar.jpg'">
          {{store.name}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import screenfull from 'screenfull'
import SelectLang from '@/components/SelectLang/index.vue'
import useMainStore from '@/store/useMainStore';
const store = useMainStore()
const myEmit = defineEmits(["handleCollapse"])
const myProps = defineProps({
  isCollapse: {
    type: Boolean,
    default: true
  }
})
// 菜单收缩
const handleClick = () => {
  myEmit('handleCollapse', !myProps.isCollapse)
}
// 全屏切换
const onToggle = () => {
  screenfull.toggle()
}
// 退出登录
const handleLogOut = () => {

}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  padding: 14px 30px;
  background-color: #545c64;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

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

  .right {
    .fullScreen{
      margin-top: 3px;
    }
    .logOut {
      margin: 5px;
      margin-top: 7px;
      margin-left: 50px;
    }

    .el-dropdown-link {
      position: relative;
      cursor: pointer;
      color: #ffffff;
      font-weight: 300;
      img{
        position: absolute;
        width: 30px;
        height: 30px;
        left: -40px;
        top: -7px;
      }
    }

    .el-icon--right {
      font-size: 14px;
    }
  }

  .el-icon {
    color: #fff;
    font-size: 22px;
  }
}
</style>
