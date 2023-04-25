<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type {PublicFormData} from "../../types"

const props = defineProps({
    show:{
        type:Boolean,
        default:false
    },
    newsInfo:{
        type:Object as PropType<PublicFormData>,
            default:null
    }

    
})
const emit = defineEmits(['submitInfo','closeModal'])
const {newsInfo} = toRefs(props)
watch( newsInfo , (val:PublicFormData)=>{
    console.log(val)
    formData.header = val.header || ''
    formData.content = val.content || ''
    formData.img = val.img || null
    formData.date = val.date || ''
})
const closeModal = ()=>{
        v$.value.$reset()
        emit('closeModal')
}
const formData = reactive({
    header:'',
    content:'',
    img:null,
    date:''
})
const rules = {
    header:{
        required
    },
    content:{
        required
    },
    img :{
        required
    },
    date :{
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
    emit('submitInfo' , formData)
}
</script>

<template>
    <modal :open="show" title="Create News" @close="closeModal">
      <form @submit.prevent="submitData" class="px-4 edit-form">
        <div class="flex flex-col gap-3">
            <div>
                <base-input v-model="formData.header" id="Header" title="Header" />
                <div class="input-errors" v-for="error of v$.header.$errors" :key="error.$uid">
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
                <div class="flex flex-col">
                    {{ formData.date }}
                    <label class="text-base mb-1" for="date"></label>
                    <input type="date" class="border ps-2 py-2 rounded-md" name="date" id="date" v-model="formData.date">
                </div> 
                <div class="input-errors" v-for="error of v$.date.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <div>
                <img-input v-model="formData.img" :link="null" />
                <div class="input-errors" v-for="error of v$.img.$errors" :key="error.$uid">
                        <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            
            <base-button type="submit" class="mt-4 text-center hover:bg-primary-600 duration-300 transition-all" >Create</base-button>
        </div>
    </form>
    </modal>
  </template>
  
  <style>
  
  </style>