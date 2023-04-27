<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type {TeamsType} from "../../types"

const props = defineProps({
    show:{
        type:Boolean,
        default:false
    },
    showTeams:{
        type:Object as PropType<TeamsType>,
        default:{}
    },
    imgLink:{
        type:String as PropType<string | null>,
        defualt:''
    },
})
const emit = defineEmits(['submitInfo','closeModal','create','update'])
const {showTeams} = toRefs(props)
const closeModal = ()=>{
        v$.value.$reset()
        emit('closeModal')
}
watch( showTeams , (val:TeamsType)=>{
    formData.name = val.name
    formData.content = val.content
    // @ts-ignore

    formData.image = val?.image || File

})
const formData = reactive({
    name:'',
    content:'',
    image:null
})
const rules = {
    name:{
        required
    },
    content:{
        required
    },
    image :{
        required
    },
}
const v$ = useVuelidate(rules , formData)
const processing = ref(false)
const submitData = ()=>{
    v$.value.$touch()
    if(v$.value.$invalid){
        return
    }
    processing.value = true
    if(props.showTeams?._id){
        emit('update' , formData)

    }else{
        emit('create' , formData )
    }
}
</script>

<template>
    <modal :open="show" :title="showTeams.content?.length === 0 ? 'Create Teams' : 'Update Teams'" @close="closeModal">
      <form @submit.prevent="submitData" class="px-4 edit-form">
        <div class="flex flex-col gap-3">
            <div>
                <base-input v-model="formData.name" id="Name" title="name" />
                <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div>
                <base-input v-model="formData.content" id="Content" title="Content" />
                <div class="input-errors" v-for="error of v$.content.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div>
                <img-input v-model="formData.image" :link="imgLink" />
                <div class="input-errors" v-for="error of v$.image.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            
            <base-button type="submit" class="mt-4 text-center hover:bg-primary-600 duration-300 transition-all" >{{showTeams.content?.length === 0 ? 'Create' : 'Update'}}</base-button>
        </div>
    </form>
    </modal>
  </template>
  
  <style>
  
  </style>