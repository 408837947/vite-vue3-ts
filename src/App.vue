<script setup lang="ts">
  import zhCn from 'element-plus/lib/locale/lang/zh-cn';
  const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;

  &>.n-config-provider {
    height: 100%;

    &>.n-layout {
      height: 100%;
    }
  }
}
</style>
