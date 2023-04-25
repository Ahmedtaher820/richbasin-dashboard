<script lang="ts" setup>
import type {PublicFormData} from "../types"
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const submitInfo = (formData:PublicFormData) =>{
  console.log(formData)
}
const updateData = ref({})
const showInfo = (info: PublicFormData)=>{
  updateData.value = info
  showModal.value = true
}
</script>

<template>
  <service-modal :show="showModal" @submitInfo="submitInfo" @closeModal="closeModal" :servicesInfo="updateData"></service-modal>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Service</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',img:null})">Create</base-button>
    </div>
    <basic-grid @showInfo="showInfo" />
  </template>
  
  <style>
  
  </style>