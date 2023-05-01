import { PublicFormData } from './../types';
import { defineStore } from "pinia";
import newsServices from "../services/newsServices"

export const news = defineStore('news',{
    state: ()=>({
        newsData: [] as PublicFormData[]
    }),
    actions:{
        async getAllNews(){
            return newsServices.getAllNews().then((res)=>{
                this.newsData = res.data.documents
                return res
            })
        },
        async updateNews(payload:PublicFormData , id:string){
            return newsServices.updateNews(payload,id).then((res)=>{
                return res
            })
        },
        async deleteNews(servicesId: string){
            return newsServices.deleteNews(servicesId).then((res)=>{
                return res
            })
        },
        async createNews(payload:PublicFormData){
            return newsServices.createNews(payload).then((res)=>{
                return res
            })
        },
    }
})