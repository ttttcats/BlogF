"use client"
import { useCallback, useEffect } from 'react';
import {io , Socket} from 'socket.io-client';

let socket : Socket | null ;
export default function useSocket() : [Socket | null , ()=>void] {
    // const [socket , setSocket] = useState<Socket | null>(null) ;
    const disconnect = useCallback( ()=>{
        socket?.disconnect();
        socket = null ;
    },[]);
    
    useEffect(()=>{
        // console.log('소켓');
        
        if(!socket ) {
            socket = io(`${process.env.NEXT_PUBLIC_BACK_BASE_URL}/messages`, {
                transports:['websocket']
                
            })
            socket.on('connect_error' , (err) => {
                console.log(`connect_error due to ${err.message}`);
            })
          
        }
        
        console.log('socket  else:: ', socket.connected );
    },[socket])

    return [socket ,disconnect];
}


