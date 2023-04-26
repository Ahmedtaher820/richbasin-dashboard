<script lang="ts" setup>
import { PropType } from "vue";
import type {PublicFormData} from "../../types"
const props = defineProps({
    info:{
        type:Array as PropType<PublicFormData[]>,
        default :()=>([
          {
            content:'',
            header:'',
            img: null,
            date:''
          }
        ])
    }
})
const emit = defineEmits(['showInfo','deleteInfo'])
const showInfo = (item: PublicFormData)=>{
  emit('showInfo' , item)
}
const deleteInfo = (item: PublicFormData)=>{
  emit('deleteInfo' , item)
}
const route = useRoute()
const getDate = computed(()=>{
  return props.info[0]?.date  ? true : false
})
</script>

<template>
  <div class="md:overflow-x-hidden overflow-x-scroll">
    <grid class="mt-8">
        <template #grid-header>
          <tr class="">
            <grid-th>
              <grid-td>Header</grid-td>
            </grid-th>
            <grid-th >
              <grid-td>Content</grid-td>
            </grid-th>
            <grid-th v-if="getDate">
              <grid-td>Date</grid-td>
            </grid-th>
            <grid-th>
              <grid-td>
                
                #
              </grid-td>
            </grid-th>
          </tr>
        </template>
        <tr v-for="(item,ind) in info" :key="ind" class="overflow-x-scroll">
          <grid-td>{{item.content}}</grid-td>
          <grid-td>{{item.header}}</grid-td>
          <grid-td v-if="getDate">{{new Date(item?.date).toDateString()}}</grid-td>
          <grid-td class="flex gap-2">
            <base-button type="button" class="mt-4 text-center hover:bg-primary-600 duration-300 transition-all capitalize" @click="showInfo(item)">Show {{$route.name}}</base-button>
            <base-button type="button" customBg="bg-red-600" class="mt-4 text-center hover:bg-red-500 duration-300 transition-all capitalize" @click="deleteInfo(item)">Delete {{$route.name}}</base-button>
          </grid-td>

        </tr>
        <tr v-if="info.length === 0">
          <grid-td colspan="6">
            <div class="text-gray-900 text-xl">
              No data found
            </div>
          </grid-td>
        </tr>
      </grid>
  </div>
</template>


<style>
.table{
  overflow-x: scroll;
}
</style>