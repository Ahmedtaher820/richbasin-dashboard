import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import newsServices from "../services/newsServices"

export const news = defineStore('news',{
    state: ()=>({

    }),
    actions:{
        async getAllNews(){
            return newsServices.getAllNews().then((res)=>{
                return res
            })
        },
        async updateNews(payload:PublicFormData , id:string){
            return newsServices.updateNews(payload,id).then((res)=>{
                console.log(res)
            })
        },
        async deleteNews(servicesId: string){
            return newsServices.deleteNews(servicesId).then((res)=>{
                console.log(res)
            })
        },
        async createNews(payload:PublicFormData){
            return newsServices.createNews(payload).then((res)=>{
                console.log(res)
            })
        },
    }
})