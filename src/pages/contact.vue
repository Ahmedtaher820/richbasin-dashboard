<script lang="ts" setup>
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
</script>

<template>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Contact</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showModal = true">Create</base-button>
    </div>
    <service-modal :show="showModal" @closeModal="closeModal"></service-modal>
  </template>
  
  <style>
  
  </style>