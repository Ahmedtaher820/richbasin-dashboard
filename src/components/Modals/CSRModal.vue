<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import type {PublicFormData} from "../../types"

const props = defineProps({
    show:{
        type:Boolean,
        default:false
    },
    csrInfo:{
        type:Object as PropType<PublicFormData>,
        default:{}
    },
    imgLink:{
        type:String,
        defualt:''
    }
})
const emit = defineEmits(['submitInfo','closeModal','update','create'])
const {csrInfo} = toRefs(props)
watch( csrInfo , (val:PublicFormData)=>{
    formData.header = val?.header || ''
    formData.content = val?.content || ''
    // @ts-ignore
    formData.image = val?.content || ''
})
const closeModal = ()=>{
        v$.value.$reset()
        emit('closeModal')
}
const formData = reactive({
    header:'',
    content:'',
    image:null
})
const rules = {
    header:{
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
    if(props.csrInfo?._id){
        emit('update' , formData)

    }else{
        emit('create' , formData )
    }
}
</script>

<template>
    <modal :open="show" :title="csrInfo.content?.length === 0 ? 'Create CSR' : 'Update CSR'" @close="closeModal">
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
                <img-input v-model="formData.image" :link="imgLink" />
                <div class="input-errors" v-for="error of v$.image.$errors" :key="error.$uid">
                    <div class="error-msg">{{ error.$message }}</div>
                </div>
            </div>
            <base-button type="submit" class="mt-4 text-center hover:bg-primary-600 duration-300 transition-all" >{{csrInfo.content?.length === 0 ? 'Create' : 'Update'}}</base-button>
        </div>
    </form>
    </modal>
  </template>
  
  <style>
  
  </style>