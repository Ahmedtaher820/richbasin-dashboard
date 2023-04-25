<script lang="ts" setup>
import type {PublicFormData} from "../types"

const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const updateData = ref<PublicFormData>({header:'',content:'',img:null})

const showInfo = (info: PublicFormData)=>{
  updateData.value = info
  showModal.value = true
}
</script>

<template>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Projects</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',img:null})">Create</base-button>
    </div>
    <project-modal :show="showModal" @closeModal="closeModal" :projectsInfo="updateData"></project-modal>
    <basic-grid @showInfo="showInfo" />

  </template>
  
  <style>
  
  </style>