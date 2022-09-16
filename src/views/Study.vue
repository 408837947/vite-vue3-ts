<template>
  <h1>{{ num }}</h1>
  <button @click="add">自增</button>
  <button @click="stop">停止监听</button>
</template>

<script setup>
import { ref, watch } from 'vue';

const num = ref(0)
const add = () => {
  num.value++
}
const stop = watch(num,()=>console.log('num 变了'))
</script>

<style lang="scss">
</style>
