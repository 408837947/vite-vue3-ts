<script setup lang="ts">
</script>

<template>
  <router-view />
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
