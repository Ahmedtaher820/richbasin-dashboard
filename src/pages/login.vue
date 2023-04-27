<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required,email } from "@vuelidate/validators";
const router = useRouter()
const formData = reactive({
    email:'',
    password:''
})
const rules = {
    email:{
        required,
        email
    },
    password:{
        required
    }
}
const userData = ref([
    {
    email:'Kh.elgendy@richbasin.co',
    password:'Kmb@13111976'
    },
    {
    email:'ahmed@gmail.com',
    password:'00112233'
    },
])
const err = ref('')
const v$ = useVuelidate(rules,formData)
const login = ()=>{
    console.log(formData)
    let flag = 0
    v$.value.$touch()
    if(v$.value.$invalid)
        return

    userData.value.forEach((e)=>{
        if(e.email === formData.email && e.password === formData.password){
            router.push({path:"/"})
            flag++
            localStorage.setItem("auth",JSON.stringify('true'))
            console.log('done')
        }
    })
    if(flag === 0){
        err.value = 'The email or password is incorrect'
    }
}
</script>

<template>
    <div class="grid grid-cols-6 h-screen">
        <div class="lg:col-span-2 col-span-6">
            <div class="left-side py-16 px-16 center-items flex-col">
                <img src="/logo.jfif" class="w-20" alt="">
                <h1 class="text-3xl mt-4 text-primary font-semibold">Login</h1>
                <form @submit.prevent="login" class="flex flex-col gap-4 mt-6 w-full">
                    <div>
                        <base-input v-model="formData.email" id="email" title="Email" inputType="email" />
                        <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div>
                        <base-input v-model="formData.password" id="password" title="password" inputType="password" />
                        <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
                        <p class="input-errors">{{err}}</p>
                    </div>
                    <base-button class="mt-4" type="submit">login</base-button>
                </form>
            </div>
        </div>
        <div class="col-span-4 relative right-side hidden lg:block">
            <div class="absolute top-0 left-0 w-full h-full opacity-30" style="backgroundColor:#d1d1d1"></div>
        </div>
    </div>
</template>
  
  <style>
  .right-side{
    background: url("../../public/pertol1.jpeg");
    background-size: cover;
  }
  </style>