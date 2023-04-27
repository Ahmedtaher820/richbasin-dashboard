export interface PublicFormData {
    content: string | null
    header: string | null
    image: string
    number?:number | null
    date?:string 
    _id:string 
}
export interface News {
    content: string | null
    header: string | null
    image: string
    date:string 
    _id:string 
}
export interface TeamsType{
    content:string
    name:string
    image: string
    _id:string 
}