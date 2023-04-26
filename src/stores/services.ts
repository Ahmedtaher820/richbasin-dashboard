import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import servicecsServices from "../services/servicesServices"

export const services = defineStore('services',{
    state: ()=>({

    }),
    actions:{
        async getAllServices(){
            return servicecsServices.getAllServices().then((res)=>{
                return res
            })
        },
        async updateServices(payload:PublicFormData , id:string){
            return servicecsServices.updateServices(payload,id).then((res)=>{
                console.log(res)
            })
        },
        async deleteServices(servicesId: string){
            return servicecsServices.deleteServices(servicesId).then((res)=>{
                console.log(res)
            })
        },
        async createServices(payload:PublicFormData){
            return servicecsServices.createServices(payload).then((res)=>{
                console.log(res)
            })
        },
    }
})