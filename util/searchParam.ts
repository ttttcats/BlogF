"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { URLSearchParams } from "url";


 const urlGetCategory  = () => {
    const locasearchParamtion = useSearchParams().getAll("category");
    // const searchParam = new URLSearchParams(strurl).getAll("category");
    
    let Arr = [] ;
    Arr.push(locasearchParamtion);

    return locasearchParamtion ;
}

export default urlGetCategory ;



 export const urlPathName = () => {

    const path = usePathname();

    return path ;
}