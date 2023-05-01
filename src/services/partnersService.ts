import DatasServices from "./common/DataServices"
import type {PartnerShip} from "../types"
export default{
    getAllpartnerShips(){
        return DatasServices.get('/partnerShips')
    },
    createpartnerShips(payload:PartnerShip){
        return DatasServices.post('/partnerShips',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    deletepartnerShips(projectId:string){
        return DatasServices.delete(`/partnerShips/${projectId}`)
    },
    updatepartnerShips(payload:PartnerShip ,projectId:string){
        return DatasServices.put(`/partnerShips/${projectId}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
}