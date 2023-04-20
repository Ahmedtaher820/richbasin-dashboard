<script lang="ts" setup>
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
</script>

<template>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Teams</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showModal = true">Create</base-button>
    </div>
    <teams-modal :show="showModal" @closeModal="closeModal"></teams-modal>
  </template>
  
  <style>
  
  </style>