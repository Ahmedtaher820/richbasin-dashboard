<script lang="ts" setup>
import { PropType } from "vue";
import type {PublicFormData} from "../../types"
const props = defineProps({
    info:{
        type:Array as PropType<PublicFormData[]>,
        default :()=>([
          {
            number:1,
            content:'welcome',
            header:'header project',
            img: null,
            date:'2023-04-21'
          }
        ])
    }
})
const emit = defineEmits(['showInfo'])
const showInfo = (item: PublicFormData)=>{
  emit('showInfo' , item)
}
const route = useRoute()
const getDate = computed(()=>{
  return props.info[0]?.date?.length > 0 ? true : false
})
</script>

<template>
  <div>
    <grid class="mt-8">
        <template #grid-header>
          <tr class="">
            <grid-th>
              <grid-td>Number</grid-td>
            </grid-th>
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
        <tr v-for="(item) in info" :key="item.header">
          <grid-td>{{item.number}}</grid-td>
          <grid-td>{{item.content}}</grid-td>
          <grid-td>{{item.header}}</grid-td>
          <grid-td v-if="getDate">{{item.date}}</grid-td>
          <grid-td>
            <base-button type="button" class="mt-4 text-center hover:bg-primary-600 duration-300 transition-all capitalize" @click="showInfo(item)">Show {{$route.name}}</base-button>
          </grid-td>

        </tr>
      </grid>
  </div>
</template>


<style>

</style>