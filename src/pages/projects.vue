<script lang="ts" setup>
import type {PublicFormData} from "../types"
import { projects } from "../stores/projects";

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
const create = (formData:PublicFormData) =>{
  processing.value = true
  projects().createProjects(formData).then(()=>{
    getAllProjects()
  }).finally(()=>{
    processing.value = false
    showModal.value = false
  })
}
const updateData = ref<PublicFormData>({header:'',content:'',image:'',_id:''})

const showInfo = (info: PublicFormData)=>{
  updateData.value = info
  showModal.value = true
}
onMounted(()=>{
  getAllProjects()
})
const deleteInfo = (itemsData: PublicFormData)=>{
  processing.value = true
  projects().deleteProjects(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
  }).finally(()=>{
    processing.value = false
  })
}
const updateInfo = (itemsData: PublicFormData)=>{
  processing.value = true

  projects().updateProjects(itemsData,updateData.value._id).then(()=>{
    getAllProjects()
    showModal.value = false
  }).finally(()=>{
    processing.value = false
  })
}
</script>

<template>
  <over-lay-loader v-if="processing" />

    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Projects</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',image:'',_id:''})">Create</base-button>
    </div>
    <project-modal :show="showModal" @update="updateInfo" :imgLink="updateData.image" @create="create" @closeModal="closeModal" :projectsInfo="updateData"></project-modal>
    <basic-grid @showInfo="showInfo" @deleteInfo="deleteInfo" :info="info" />

  </template>
  
  <style>
  
  </style>