import type { TeamsType } from "../types";
import { defineStore } from "pinia";
import teamsServices from "../services/teamsServices"

export const teams = defineStore('teams',{
    state: ()=>({
        newsData: [] as TeamsType[]

    }),
    actions:{
        async getAllTeams(){
            return teamsServices.getAllTeams().then((res)=>{
                this.newsData = res.data.documents
                return res
            })
        },
        async updateTeams(payload:TeamsType , id:string){
            return teamsServices.updateTeams(payload,id).then((res)=>{
                console.log(res)
            })
        },
        async deleteTeams(servicesId: string){
            return teamsServices.deleteTeams(servicesId).then((res)=>{
                console.log(res)
            })
        },
        async createTeams(payload:TeamsType){
            return teamsServices.createTeams(payload).then((res)=>{
                console.log(res)
            })
        },
    }
})