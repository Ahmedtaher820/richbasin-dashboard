export interface PublicFormData {
    content: string 
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
    job:string
}
export interface location{
    coordinates:string[]
    address:string
}
export interface Contact{
    email:string
    phoneNumber1: string
    phoneNumber2: string
    location: location
    _id?:string | null
}
export interface PartnerShip{
    image:string
    text: string
    _id:string 

}