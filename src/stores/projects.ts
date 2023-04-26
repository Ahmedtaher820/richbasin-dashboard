import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import projectsServices from "../services/projectsServices"

export const projects = defineStore('projects',{
    state: ()=>({

    }),
    actions:{
        async getAllProjects(){
            return projectsServices.getAllProjects().then((res)=>{
                return res
            })
        },
        async updateProjects(payload:PublicFormData , id:string){
            return projectsServices.updateProjects(payload,id).then((res)=>{
                console.log(res)
            })
        },
        async deleteProjects(servicesId: string){
            return projectsServices.deleteProjects(servicesId).then((res)=>{
                console.log(res)
            })
        },
        async createProjects(payload:PublicFormData){
            return projectsServices.createProjects(payload).then((res)=>{
                console.log(res)
            })
        },
    }
})