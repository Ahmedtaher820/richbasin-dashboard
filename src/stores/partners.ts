import {defineStore} from "pinia"
import partnersService from "../services/partnersService"
import type {PartnerShip} from "../types"

export const partners = defineStore({
    id:'partners',
    state:()=>({
        partnerData:[] as PartnerShip[]

    }),
    actions:{
        async getAllpartnerShips(){
            return partnersService.getAllpartnerShips().then((res)=>{
                this.partnerData = res.data.documents
                return res
            })
        },
        async updatepartnerShips(payload:PartnerShip , id:string){
            return partnersService.updatepartnerShips(payload,id).then((res)=>{
                console.log(res)
            })
        },
        async deletepartnerShips(servicesId: string){
            return partnersService.deletepartnerShips(servicesId).then((res)=>{
                console.log(res)
            })
        },
        async createpartnerShips(payload:PartnerShip){
            return partnersService.createpartnerShips(payload).then((res)=>{
                console.log(res)
            })
        },
    }
})