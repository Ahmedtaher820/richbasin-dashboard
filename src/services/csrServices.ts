import DatasServices from "./common/DataServices"
import type {PublicFormData} from "../types"
export default{
    getAllCsr(){
        return DatasServices.get('/csr')
    },
    createCsr(payload:PublicFormData){
        return DatasServices.post('/csr',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    deleteCsr(projectId:string){
        return DatasServices.delete(`/csr/${projectId}`)
    },
    updateCsr(payload:PublicFormData ,projectId:string){
        return DatasServices.put(`/csr/${projectId}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
}