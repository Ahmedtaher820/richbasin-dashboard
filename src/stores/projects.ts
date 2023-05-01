import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import projectsServices from "../services/projectsServices"

export const projects = defineStore('projects',{
    state: ()=>({
        projectsData:[] as PublicFormData[]

    }),
    actions:{
        async getAllProjects(){
            return projectsServices.getAllProjects().then((res)=>{
                this.projectsData = res.data.documents
                return res
            })
        },
        async updateProjects(payload:PublicFormData , id:string){
            return projectsServices.updateProjects(payload,id).then((res)=>{
                return res
            })
        },
        async deleteProjects(servicesId: string){
            return projectsServices.deleteProjects(servicesId).then((res)=>{
                return res
            })
        },
        async createProjects(payload:PublicFormData){
            return projectsServices.createProjects(payload).then((res)=>{
                return res
            })
        },
    }
})