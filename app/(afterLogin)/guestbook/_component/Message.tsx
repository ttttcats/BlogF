"use client";

import { getGuestMessage } from "@/_lib/getMdxPosts";
import { messageProps } from "@/model/messageModel";
import styles from "@/styles/module/(afterLogin)/guestbook.module.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import useSocket from "../_lib/useSocket";
type Props = {
  content: string;
  color: string;
  createdAt: Date;
};

function Message() {
  const [socket] = useSocket();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<messageProps[]>({
    queryKey: ["message"],
    queryFn: getGuestMessage,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    socket?.on("receiveMessage", (data) => {
      const exMessages: messageProps[] | undefined = queryClient.getQueryData([
        "message",
      ]);
      const newMessages = exMessages;
      newMessages?.push(data);
      // console.log("newMessages :::", newMessages);
      queryClient.setQueryData(["message"], newMessages);
      queryClient.resetQueries({
        queryKey: ["message"],
      });
      // console.log("receiveMessage useEffect :: ", data);
    });

    // const exMessages: messageProps[] | undefined = queryClient.getQueryData([
    //   "message",
    // ]);
    // queryClient.resetQueries({
    //   queryKey: ["message"],
    // });
    // console.log("receiveMessage useEffect :: ", exMessages);
  }, [socket]);

  // useEffect(() => {
  //   alert("queryClient.resetQueries useEffect");
  //   queryClient.resetQueries({
  //     queryKey: ["message"],
  //   });
  // }, [queryClient]);

  // useEffect(() => {
  //   alert("일단 여긴 처음 한번 될 거 아냐");
  //   queryClient.resetQueries({
  //     queryKey: ["message"],
  //   });
  // }, []);

  const DataMessage = useMemo(() => {
    return (
      <div className={styles.messageContainer}>
        {data?.map((p, i) => (
          <div key={i} className={styles.messageBlock}>
            <span>{dayjs(p.createdAt).format("YY MM")}</span>
            <div style={{ backgroundColor: `${p.color}` }}>{p.content}</div>
          </div>
        ))}
      </div>
    );
  }, [socket, data]);
  // const queryClient = useQueryClient();

  // const { data, isLoading } = useQuery<messageProps[]>({
  //   queryKey: ["message"],
  //   queryFn: getGuestMessage,
  //   staleTime: 60 * 100, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });

  // <div className={styles.messageBlock}>
  //   <span>{dayjs(createdAt).format("YY MM")}</span>
  //   <div style={{ backgroundColor: `${color}` }}>{content}</div>
  // </div>

  if (!socket?.connected) {
    return <></>;
  }
  return data?.map((p, i) => (
    <div key={i} className={styles.messageBlock}>
      <span>{dayjs(p.createdAt).format("YY MM")}</span>
      <div style={{ backgroundColor: `${p.color}` }}>{p.content}</div>
    </div>
  ));
  // {data?.map((p, i) => (
  //   <div key={i} className={styles.messageBlock}>
  //     <span>{dayjs(p.createdAt).format("YY MM")}</span>
  //     <div style={{ backgroundColor: `${p.color}` }}>{p.content}</div>
  //   </div>
  // ))}
}

export default React.memo(Message);
