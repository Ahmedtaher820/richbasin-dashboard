import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import csrServices from "../services/csrServices"

export const csr = defineStore('csr',{
    state: ()=>({

    }),
    actions:{
        async getAllCsr(){
            return csrServices.getAllCsr().then((res)=>{
                return res
            })
        },
        async updateCsr(payload:PublicFormData , id:string){
            return csrServices.updateCsr(payload,id).then((res)=>{
                console.log(res)
            })
        },
        async deleteCsr(servicesId: string){
            return csrServices.deleteCsr(servicesId).then((res)=>{
                console.log(res)
            })
        },
        async createCsr(payload:PublicFormData){
            return csrServices.createCsr(payload).then((res)=>{
                console.log(res)
            })
        },
    }
})