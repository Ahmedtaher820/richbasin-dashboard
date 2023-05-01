<script lang="ts" setup>
import { UserIcon, TrashIcon } from '@heroicons/vue/24/outline'
import {partners} from "../stores/partners"
import type {PartnerShip} from "../types"
import { storeToRefs } from 'pinia';
const {partnerData} = storeToRefs(partners())
const showModal = ref(false)
const closeModal = ()=>{
  showModal.value = false
}
const info  = ref<PartnerShip[]>([])
const processing = ref(false)
const getAllPartner = ()=>{
  processing.value = true
  partners().getAllpartnerShips().then((res)=>{
    info.value = res.data.documents
  }).finally(()=>{
    processing.value = false
  })
}

const updateData = ref<PartnerShip>({image:'',text:'',_id:''})

const showInfo = (info: PartnerShip)=>{
  updateData.value = info
  showModal.value = true
}
onMounted(()=>{
  if(partnerData.value.length === 0){
    getAllPartner()
  }else{
    info.value = partnerData.value
  }
})
const errHandle = reactive({
  message:''
})
const deleteInfo = (itemsData: PartnerShip,event:Event)=>{
  processing.value = true
  partners().deletepartnerShips(itemsData._id).then(()=>{
    info.value = info.value.filter((e)=> e._id !== itemsData._id)
  }).finally(()=>{
    processing.value = false
  })
  event.stopPropagation()
}
const submit = ()=>{
  getAllPartner()
}
</script>

<template>
    <over-lay-loader v-if="processing" />
    <div class="flex items-center justify-between">
      <h1 class="text-4xl text-primary">Partnerships</h1>
      <base-button type="submit" customBg="bg-green-600" class="mt-4 text-center hover:bg-green-700 duration-300 transition-all" @click="showInfo({image:'',text:'',_id:''})">Create</base-button>
    </div>
    <div class="grid md:grid-cols-3 grid-cols-1 mt-8 gap-8 gap-y-10">
        <div class="col-span-1" v-for="part in info" :key="part._id">
          <div class="card flex items-center flex-col shadow-md rounded-md pb-4 pt-6 px-3 hover:shadow-inner transition-all duration-600 cursor-pointer relative" @click="showInfo(part)">
            <div class="absolute top-3 right-3 w-8 rounded-lg border border-red-600 py-2 bg-red-600 text-white hover:bg-white hover:text-red-600  duration-300 transition-all center-items" @click="deleteInfo(part,$event)">
              <TrashIcon class="w-8 h-4  " />
            </div>
            <img :src="part.image" v-if="part.image" class="w-48 h-48 object-fill rounded-full" alt="">
            
            </div>
            </div>
        </div>
    <Partner-modal  :show="showModal"  :imgLink="updateData.image" @submit="submit" @closeModal="closeModal" :partnerInfo="updateData"></Partner-modal>
</template>

<style>

</style>