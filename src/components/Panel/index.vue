<template>
  <div class="panel panel-default">
    <div class="panel-header">{{ myProps.title }}</div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
const myProps = defineProps({
  title: { type: String, required: true, default: '' }
})
</script>

<style rel="stylesheet/scss" lang="scss">
.panel-default {
  min-height: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #ebeef5;

  .panel-header {
    background-color: #f5f5f5;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #ebeef5;
    color: #606266;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 14px;
  }

  .toolbar-label {
    span {
      font-size: 16px;
    }
  }
}
.panel-body {
  margin: 20px;
}
</style>
