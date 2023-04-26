<script lang="ts" setup>
import type {PublicFormData} from "../types"
import { services } from "../stores/services";
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const processing = ref(false)
const create = (formData:PublicFormData) =>{
  processing.value = true
  services().createServices(formData).then(()=>{
    getAllServices()
  }).finally(()=>{
    processing.value = false
    showModal.value = false
  })
}
const updateData = ref<PublicFormData>({header:'',content:'',image:null,_id:''})
const showInfo = (info: PublicFormData)=>{
  updateData.value = info
  showModal.value = true
}
const info = ref<PublicFormData[]>([])
const getAllServices = ()=>{
  processing.value = true
  services().getAllServices().then((res)=>{
    info.value = res.data.documents
  }).finally(()=>{
    processing.value = false
  })
}
onMounted(()=>{
  getAllServices()
})
const deleteInfo = (itemsData: PublicFormData)=>{
  processing.value = true
  services().deleteServices(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
  }).finally(()=>{
    processing.value = false
  })
}
const updateInfo = (itemsData: PublicFormData)=>{
  processing.value = true
  services().updateServices(itemsData,updateData.value._id).then(()=>{
    getAllServices()
  showModal.value = false

  }).finally(()=>{
    processing.value = false
    
  })
}
</script>

<template>
  <over-lay-loader v-if="processing" />
  <service-modal :show="showModal"  @create="create" @closeModal="closeModal" :servicesInfo="updateData" @update="updateInfo" :imgLink="updateData.image" :processing="processing"></service-modal>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Service</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',image:null,_id:''})">Create</base-button>
    </div>
    <basic-grid @showInfo="showInfo"  @deleteInfo="deleteInfo" :info="info" />
  </template>
  
  <style>
  
  </style>