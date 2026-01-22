export interface Users{
    id:number;
    name:string;
    email:string;
    password:string;
    role:string
}

export interface Querry{
    limit:number, 
    skip:number,
}