<script lang="ts" setup>
import type {team} from "../types"
import { UserIcon } from '@heroicons/vue/24/outline'
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const updateData = ref<team>({name:'',content:'',img:''})
const showInfo = (info: team)=>{
  updateData.value = info
  showModal.value = true
}
const teams = ref<team[]>([
  {
    name:'Khaled elgendy',
    content:'He is a petroleum engineer and live in cairo.Eng khaled is CEO Founder of richbasin',
    img:''
  },
  {
    name:'Moaz Ali',
    content:'He is a petroleum engineer and live in cairo.Eng khaled is CEO Founder of richbasin',
    img:''
  },
])
</script>

<template>
  <teams-modal :show="showModal" :showTeams="updateData" @closeModal="closeModal"></teams-modal>
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Teams</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({name:'',content:'',img:''})">Create</base-button>
    </div>
    <div class="grid md:grid-cols-3 grid-cols-1 mt-8 gap-8 gap-y-10">
      <div class="col-span-1" v-for="team in teams" :key="team.name">
          <div class="card flex items-center flex-col shadow-md rounded-md pb-4 pt-6 px-3 hover:shadow-inner transition-all duration-300 cursor-pointer" @click="showInfo(team)">
            <img :src="team.img" v-if="team.img" alt="">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-24 " viewBox="0 0 24 24"><path fill="#888888" d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11a9 9 0 0 0-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.3a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"/></svg>
            <h3 class="text-xl text-primary">{{team.name}}</h3>
            <p class="text-sm mt-2 text-center">{{team.content}}</p>
          </div>

      </div>
    </div>
  </template>
  
  <style>
  
  </style>