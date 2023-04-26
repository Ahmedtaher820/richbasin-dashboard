import DatasServices from "./common/DataServices"
import type {PublicFormData} from "../types"
export default{
    getAllProjects(){
        return DatasServices.get('/projects')
    },
    createProjects(payload:PublicFormData){
        return DatasServices.post('/projects',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    deleteProjects(projectId:string){
        return DatasServices.delete(`/projects/${projectId}`)
    },
    updateProjects(payload:PublicFormData ,projectId:string){
        return DatasServices.put(`/projects/${projectId}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
}