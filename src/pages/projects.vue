<script lang="ts" setup>
import type {PublicFormData} from "../types"
import { projects } from "../stores/projects";
import {storeToRefs} from "pinia"

const {projectsData} = storeToRefs(projects())

const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const info  = ref<PublicFormData[]>([])
const processing = ref(false)
const getAllProjects = ()=>{
  processing.value = true
  projects().getAllProjects().then((res)=>{
    info.value = res.data.documents
  }).finally(()=>{
    processing.value = false
  })
}
const updateData = ref<PublicFormData>({header:'',content:'',image:'',_id:''})

const showInfo = (info: PublicFormData)=>{
  console.log(info)
  updateData.value = info
  showModal.value = true
}
onMounted(()=>{
  if(projectsData.value.length === 0){
    getAllProjects()
  }else{
    info.value = projectsData.value
  }
})
const errHandle = reactive({
  message:''
})
const deleteInfo = (itemsData: PublicFormData)=>{
  processing.value = true
  projects().deleteProjects(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
    getAllProjects()
  }).finally(()=>{
    processing.value = false
  })
}
const submit = ()=>{
  getAllProjects()
}
</script>

<template>
  <over-lay-loader v-if="processing" />
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Projects</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',image:'',_id:''})">Create</base-button>
    </div>
    <project-modal :errServer="errHandle.message" :show="showModal" @submit="submit" :imgLink="updateData.image"  @closeModal="closeModal" :projectsInfo="updateData"></project-modal>
    <basic-grid @showInfo="showInfo" @deleteInfo="deleteInfo" :info="info" />

  </template>
  
  <style>
  
  </style>