// import { posts } from "@/.velite";

import { posts as posts} from "@/.velite";

interface BlogCategory {
    params : string ,
    
}
interface initialPageParam {
    queryKey: string[],
    signal: AbortSignal,
    pageParam: number;
    meta: Record<string, unknown> | undefined;
}
interface queryKey {
    queryKey : string[]
}
export const utilGetPost = async ( {params} : BlogCategory) => {
    // const category = params  ;
    // console.log('category :: ' , category);
    
    const post  =await posts.find( (post)=> post?.slug.split("/")[1] === params );
    // const post = await posts ;
    const arr = [] ;
    arr.push(post);
  
    
    
    return post ;
}
// export const utilGetPost = async ( initialPageParam : initialPageParam , category : string  ) => {
//     // const category = params  ;
//     // console.log('category :: ' , category);
//     let infiniteData;
//     let copytestData =  posts.filter( (post) => category !== "All" ? post?.slug.split("/")[1] === category : post).flatMap((p, index) => {
//     const post  =await posts.find( (post)=> post?.slug.split("/")[1] === params );
//     // const post = await posts ;
//     const arr = [] ;
//     arr.push(post);
  
    
    
//     return post ;
// }
// export const getMdx : QueryFunction<InfiniteProps, [_1 : string , string ,number] ,number> = async ({queryKey , pageParam})=>{
//     const[_1 , category , pageNumbers]= queryKey;
    
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/${category}?cursor=${pageParam}&page=${pageNumbers}` , {
//       next : {
//          tags : ['posts'] ,
//       },
//       credentials: 'include',
//       cache: 'no-store',
//      }
     
//   )
//   if (!res.ok) {
//      // This will activate the closest `error.js` Error Boundary
//      throw new Error('Failed to fetch data')
//    }
     
//    return res.json() ;
//   }
export const utilGetCategory = () => {
    

    // Category 명
    const path = posts.map( (post)=> post?.permalink.split("/")[0]).flat() ;
    const categoryname = path.filter( (value,index) => {
        
        return path.indexOf(value) === index ;
    }) ;
    
    categoryname.unshift('All') ;
    

    const category = {
        categoryname    
    }

    return category ; 
}