<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div id="app">
      <router-view />
    </div>
  </n-config-provider>
</template>

<style>
body,
html {
  width: 100%;
  height: 100%;
}
</style>
