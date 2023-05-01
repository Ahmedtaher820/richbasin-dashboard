import DatasServices from "./common/DataServices"
import { Contact } from './../types';

export default{
    getContact(){
        return DatasServices.get('/contacts')
    },
    updateContact(payload:Contact , id:string){
        return DatasServices.put(`/contacts/${id}`,payload)
    },
}