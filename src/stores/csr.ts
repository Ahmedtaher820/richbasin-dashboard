import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import csrServices from "../services/csrServices"

export const csr = defineStore('csr',{
    state: ()=>({
        csrData: [] as PublicFormData[]

    }),
    actions:{
        async getAllCsr(){
            return csrServices.getAllCsr().then((res)=>{
                this.csrData = res.data.documents
                return res
            })
        },
        async updateCsr(payload:PublicFormData , id:string){
            return csrServices.updateCsr(payload,id).then((res)=>{
                return res
            })
        },
        async deleteCsr(servicesId: string){
            return csrServices.deleteCsr(servicesId).then((res)=>{
                return res
            })
        },
        async createCsr(payload:PublicFormData){
            return csrServices.createCsr(payload).then((res)=>{
                return res
            })
        },
    }
})