<script lang="ts" setup>
import type {PublicFormData} from "../types"
import { news } from "../stores/news";
import {storeToRefs} from "pinia"
const {newsData} = storeToRefs(news())

const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}

const updateData = ref<PublicFormData>({header:'',content:'',date:'',image:'',_id:''})
const showInfo = (info: PublicFormData)=>{
  updateData.value = info
  showModal.value = true
}
const processing = ref(false)
const info = ref<PublicFormData[]>([])

const getAllNews = ()=>{
  processing.value = true
  news().getAllNews().then((res)=>{
    info.value = res.data.documents
  }).finally(()=>{
    processing.value = false
  })
}


const deleteInfo = (itemsData: PublicFormData)=>{
  processing.value = true
  news().deleteNews(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
  getAllNews()
  }).finally(()=>{
    processing.value = false
  })
}

onMounted(()=>{
  if(newsData.value.length === 0){
    getAllNews()
  }else{
    info.value = newsData.value
  }
})
const submit = ()=>{
  getAllNews()
}
</script>

<template>
  <over-lay-loader v-if="processing" />
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">News</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({header:'',content:'',date:'',image:'',_id:''})">Create</base-button>
    </div>
    <news-modal :newsInfo="updateData" @submit="submit" :show="showModal" @closeModal="closeModal" :imgLink="updateData.image"></news-modal>
    <basic-grid @showInfo="showInfo" @deleteInfo="deleteInfo" :info="info" />

  </template>
  
  <style>
  
  </style>