import { MdxOptions } from "velite";

export interface postProps {
    body:MdxOptions , 
    description : string,
    permalink : string, 
    published : string,
    slug : string,
    tags : string[],
    thumbnail : string,
    title : string,
    date:string , 
    pageNum:number
    
  }