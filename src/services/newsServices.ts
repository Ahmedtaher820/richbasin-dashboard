import DatasServices from "./common/DataServices"
import type {PublicFormData} from "../types"
export default{
    getAllNews(){
        return DatasServices.get('/news')
    },
    createNews(payload:PublicFormData){
        return DatasServices.post('/news',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    deleteNews(projectId:string){
        return DatasServices.delete(`/news/${projectId}`)
    },
    updateNews(payload:PublicFormData ,projectId:string){
        return DatasServices.put(`/news/${projectId}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
}