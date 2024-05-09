// "use client";

import styles from "@/styles/module/(afterLogin)/guestbook.module.scss";
// import { FormProvider, useForm, useFormContext } from "react-hook-form";
import FormData from "./_component/FormData";
import WebSocketComponent from "./_component/WebSocketComponent";
import { getGuestMessage } from "@/_lib/getMdxPosts";
import { QueryClient } from "@tanstack/react-query";
import { messageProps } from "@/model/messageModel";
import dayjs from "dayjs";
import Message from "./_component/Message";
import React from "react";
async function Guestbook() {
  // const { data, isLoading } = useQuery<messageProps[]>({
  //   queryKey: ["message"],
  //   queryFn: getGuestMessage,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });

  //   const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["message"],
  //   queryFn: getGuestMessage,
  // });
  // const methods = useFormContext();
  // if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <WebSocketComponent />
      <h4>익명 방명록</h4>
      <span className={styles.span}>24년 5월부터 작성된 방명록</span>
      <div className={styles.containerScroll}>
        <div className={styles.messageContainer}>
          <Message />
        </div>
        <FormData />
        {/* <div className={styles.messageContainer}>
          {!isLoading &&
            data?.map((p, i) => (
              <Message
                key={p._id}
                content={p.content}
                color={p.color}
                createdAt={p.createdAt}
              />
              // <div className={styles.messageBlock}>
              //   <span>{dayjs(p.createdAt).format("YY MM")}</span>
              //   <div style={{ backgroundColor: `${p.color}` }}>
              //     {p.content}
              //   </div>
              // </div>
            ))}
        </div> */}
        {/* <FormProvider {...methods}>

        <FormData />
        </FormProvider> */}
      </div>
    </div>
  );
}
export default Guestbook;
