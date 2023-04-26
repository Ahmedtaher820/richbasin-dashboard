import DatasServices from "./common/DataServices"
import type {PublicFormData} from "../types"
export default{
    getAllServices(){
        return DatasServices.get('/services')
    },
    createServices(payload:PublicFormData){
        return DatasServices.post('/services',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    deleteServices(servicesId:string){
        return DatasServices.delete(`/services/${servicesId}`)
    },
    updateServices(payload:PublicFormData ,servicesId:string){
        return DatasServices.put(`/services/${servicesId}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
}