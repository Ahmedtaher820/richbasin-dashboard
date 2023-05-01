import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import servicecsServices from "../services/servicesServices"

export const services = defineStore('services',{
    state: ()=>({
        err:'',
        servicesInfo:[] as PublicFormData[]
    }),
    actions:{
        async getAllServices(){
            return servicecsServices.getAllServices().then((res)=>{
                this.servicesInfo = res.data.documents
                return res
            })
        },
        async updateServices(payload:PublicFormData , id:string){
            return servicecsServices.updateServices(payload,id).then((res)=>{
                return res
            })
        },
        async deleteServices(servicesId: string){
            return servicecsServices.deleteServices(servicesId).then((res)=>{
            })
        },
        async createServices(payload:PublicFormData){
            return servicecsServices.createServices(payload).then((res)=>{
                return res
            })
        },
    }
})