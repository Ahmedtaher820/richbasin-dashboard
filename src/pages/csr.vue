<script lang="ts" setup>
import type {PublicFormData} from "../types"
import { csr } from "../stores/csr";
import { storeToRefs } from "pinia";
const {csrData} = storeToRefs(csr())
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const processing = ref(false)
const info = ref<PublicFormData[]>([])

const getAllScr = ()=>{
  processing.value = true
  csr().getAllCsr().then((res)=>{
    info.value = res.data.documents
  }).finally(()=>{
    processing.value = false
  })
}
const updateData = ref<PublicFormData>({header:'',content:'', image:'',_id:''})
const showInfo = (info: PublicFormData)=>{
  updateData.value = info
  showModal.value = true
}
const deleteInfo = (itemsData: PublicFormData)=>{
  processing.value = true
  csr().deleteCsr(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
    getAllScr()

  }).finally(()=>{
    processing.value = false
  })
}

onMounted(()=>{
  if(csrData.value.length === 0){
    getAllScr()
  }else{
    info.value = csrData.value
  }
})
const submit = ()=>{
  getAllScr()
}
</script>

<template>
  <over-lay-loader v-if="processing" />
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">CSR</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',image:'',_id:''})">Create</base-button>
    </div>
    <basic-grid @showInfo="showInfo" @deleteInfo="deleteInfo" :info="info" />
    <CSR-modal :show="showModal" @closeModal="closeModal" @submit="submit"  :csrInfo="updateData" :imgLink="updateData.image"></CSR-modal>
  </template>
  
  <style>
  
  </style>