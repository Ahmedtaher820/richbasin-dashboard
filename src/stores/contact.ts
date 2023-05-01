import { Contact } from './../types';
import { defineStore } from "pinia";
import contactServices from "../services/contactServices"

export const contact = defineStore('contact',{
    state: ()=>({
        contactInfo:{} as Contact
    }),
    actions:{
        async getContact(){
            return contactServices.getContact().then((res)=>{
                this.contactInfo = res.data.documents[0]
                return res
            })
        },
        async updateContact(payload:Contact , id:string){
            return contactServices.updateContact(payload,id).then((res)=>{
                this.contactInfo = res.data.documents[0]
            })
        },
    }
})