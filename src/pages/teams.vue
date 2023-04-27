<script lang="ts" setup>
import type {TeamsType} from "../types"
import { UserIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { teams } from "../stores/teams";

const processing = ref(false)
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const updateData = ref<TeamsType>({name:'',content:'',image:'',_id:''})
const showInfo = (info: TeamsType)=>{
  updateData.value = info
  showModal.value = true
}
const info = ref<TeamsType[]>([])

const getAllScr = ()=>{
  processing.value = true
  teams().getAllTeams().then((res)=>{
    info.value = res.data.documents
  }).finally(()=>{
    processing.value = false
  })
}

const deleteInfo = (itemsData: TeamsType,event: Event)=>{
  processing.value = true
  teams().deleteTeams(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
    console.log(info.value)
  }).finally(()=>{
    processing.value = false
  })
  event.stopPropagation()
}
const updateInfo = (itemsData: TeamsType)=>{
  teams().updateTeams(itemsData,updateData.value._id).then(()=>{
    getAllScr()
  showModal.value = false

  }).finally(()=>{
    processing.value = false
  })
}
const create = (formData:TeamsType) =>{
  processing.value = true
  teams().createTeams(formData).then(()=>{
    getAllScr()
  }).finally(()=>{
    processing.value = false
    showModal.value = false
  })
}
onMounted(()=>{
  getAllScr()
})
</script>

<template>
  <over-lay-loader v-if="processing" />
  <teams-modal :show="showModal" :showTeams="updateData" @update="updateInfo" @create="create"  :imgLink="updateData.image" @closeModal="closeModal"></teams-modal>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Teams</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({name:'',content:'',image:'',_id:''})">Create</base-button>
    </div>
    <div class="grid md:grid-cols-3 grid-cols-1 mt-8 gap-8 gap-y-10">
      <div class="col-span-1" v-for="team in info" :key="team.name">
        <div class="card flex items-center flex-col shadow-md rounded-md pb-4 pt-6 px-3 hover:shadow-inner transition-all duration-600 cursor-pointer relative" @click="showInfo(team)">
          <div class="absolute top-3 right-3 w-8 rounded-lg border border-red-600 py-2 bg-red-600 text-white hover:bg-white hover:text-red-600  duration-300 transition-all center-items" @click="deleteInfo(team,$event)">
            <TrashIcon class="w-8 h-4  " />
          </div>
          <img :src="team.image" v-if="team.image" class="w-48 h-48 object-fill rounded-full" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-24 " v-else viewBox="0 0 24 24"><path fill="#888888" d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11a9 9 0 0 0-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.3a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"/></svg>
            <h3 class="text-2xl mt-2 text-primary">{{team.name}}</h3>
            <p class="text-sm mt-2 text-center">{{team.content.length > 100 ? team.content.slice(0,64)+'...' : team.content}}</p>
          </div>
      </div>
    </div>
  </template>
  
  <style>
  
  </style>