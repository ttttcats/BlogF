import { posts } from '@/.velite';
import { postProps } from '@/model/postsModel';
import { QueryFunction } from "@tanstack/react-query";
import { log } from 'console';
import { postProps as IpostProps } from "@/model/postsModel";
import { stringify } from 'querystring';
// export const getmdx : QueryFunction = async ({ queryKey}) =>{
//   console.log('queryKey = ', queryKey);
  
//   const [ category] = queryKey;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/` , {
//     next : {
//        tags : ['posts'] ,
//     },
//     credentials: 'include',
//     cache: 'no-store',
//    }
   
// )
// if (!res.ok) {
//    // This will activate the closest `error.js` Error Boundary
//    throw new Error('Failed to fetch data')
//  }

//  return res.json() ;
// }
type Props = {
   pageParam?:number ,
} ;

type InfiniteProps ={
   post  : IpostProps[] ,
   TotalPage : number
}
// export async function infiniteGetMdx ({pageParam}:Props) {
   
//    const category= 'All';
//    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${category}?cursor=${pageParam}` , {
//      next : {
//         tags : ['posts'] ,
//      },
//      credentials: 'include',
//      cache: 'no-store',
//     }
    
//  )
//  if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json() ;
//  }
// export const getMdx : QueryFunction<InfiniteProps, [_1 : string , string ,number] ,number> = async ({queryKey , pageParam})=>{
//   const[_1 , category , pageNumbers]= queryKey;
  
//   const option = {
//    method : 'GET',
//    headers:{
//        'Content-Type' : 'application/json'
//    },
//    body: JSON.stringify(posts)
// };


//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${category}?cursor=${pageParam}&page=${pageNumbers}&postData=${posts}` , {
//     next : {
//        tags : ['posts'] ,
//     },
//     credentials: 'include',
//     cache: 'no-store', 
//    }
   
// )
// console.log('getMdx json data ::' , res.json());

// if (!res.ok) {
//    // This will activate the closest `error.js` Error Boundary
//    throw new Error('Failed to fetch data')
//  }
   
//  return res.json() ;
// }
// export async function getMdxPosts( ) {
  
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/` , {
//      next : {
//         tags : ['posts'] ,
//      },
//      credentials: 'include',
//      cache: 'no-store',
//     }
    
// )
// if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }

//   return res.json() ;
// }



// type getTestMdxProps = {
//    query : string[] ,
//    pageParam : number

// }

export const getLocalMdx  : QueryFunction<InfiniteProps, [_1 : string , string ,number] ,number>  = async ({queryKey , pageParam} )=>{
   const[_1 , category , pageNumbers]= queryKey;
   

   let infiniteData; 
   let copytestData =  posts.filter( (post) => category !== "All" ? post?.slug.split("/")[1] === category : post).flatMap((p, index) => {
      
      return { ...p, pageNum: index }
    })

    if(pageParam > copytestData.length+3 ) {
      infiniteData=undefined
    }else {
      infiniteData = copytestData.filter( (p) => p.pageNum >= pageParam  &&   p.pageNum <= pageParam+2 
    )
   
}

    
return JSON.parse(JSON.stringify({
   post : infiniteData,      
   TotalPage : copytestData.length    
 })) 

}




export const getGuestMessage = async () => {
  
   const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_BASE_URL}/message/` , {
   method:'POST',
    next : {
       tags : ['message'] ,
    },
    credentials: 'include',
    cache: 'no-store',
   }
   
)
if (!res.ok) {
   // This will activate the closest `error.js` Error Boundary
   throw new Error('Failed to fetch data')
 }

 return res.json() ;
}