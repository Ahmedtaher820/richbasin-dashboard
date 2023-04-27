import DatasServices from "./common/DataServices"
import type { TeamsType } from "../types";
export default{
    getAllTeams(){
        return DatasServices.get('/teams')
    },
    createTeams(payload:TeamsType){
        return DatasServices.post('/teams',payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    deleteTeams(servicesId:string){
        return DatasServices.delete(`/teams/${servicesId}`)
    },
    updateTeams(payload:TeamsType ,servicesId:string){
        return DatasServices.put(`/teams/${servicesId}`,payload,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
}