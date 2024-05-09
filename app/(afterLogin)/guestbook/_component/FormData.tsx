"use client";
import styles from "@/styles/module/(afterLogin)/guestbook.module.scss";
import { FormProvider, useFormContext } from "react-hook-form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useCallback, useEffect } from "react";
import useSocket from "../_lib/useSocket";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { messageProps } from "@/model/messageModel";
const colors = [
  "#a5c1ca",
  "#7c889f",
  "#6C92BE",
  "#b8e0ff",
  "#8DB596",
  "#c4a583",
  "#BB8395",
  "#FFBE98",
  "#E2C9C9",
  "#ffd9b8",
];
export const guestbookFormSchema = z.object({
  message: z.string().min(1).max(3000),
  color: z.string().regex(/^#[0-9A-F]{6}$/i),
});
export type GuestbookFormValues = z.infer<typeof guestbookFormSchema>;

const defaultValues: Partial<GuestbookFormValues> = {
  message: "",
  color: "#E2C9C9",
};

const FormData = () => {
  const methods = useFormContext();
  const queryClient = useQueryClient();
  const [socket] = useSocket();
  console.log("여기가 FormData");
  const onSubmit = () => {
    console.log("여기가 emit");
    // socket?.emit("sendMessage", {
    //   content: watch("message"),
    //   color: watch("color"),
    //   createdAt: Date(),
    // });
    console.log("socket :: ", socket);

    socket?.emit("testt", {
      data: watch("message"),
    });
  };
  // const test = () => {
  //   console.log("test");
  // };
  // useEffect(() => {
  //   console.log("socket :: ", socket);

  //   socket?.on("receiveMessage", (data) => {
  //     console.log("socket ::", data);
  //   });
  //   console.log("몇번");
  // }, [socket]);
  const form = useForm<GuestbookFormValues>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues,
    mode: "onChange",
  });
  const { watch, trigger, formState } = form;
  const onHandleClick = (color: string) => {
    form.setValue("color", color);
  };

  const onHandleSubmit = useCallback(() => {
    if (watch("message").trim().length < 1) {
      alert("메시지를 입력해주세요.");
      return false;
    }

    if (socket) {
      // await fetch(`${process.env.NEXT_PUBLIC_BACK_BASE_URL}/message/create`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     content: watch("message"),
      //     color: watch("color"),
      //     createdAt: new Date(),
      //   }),
      // });
      socket?.emit("sendMessage", {
        content: watch("message"),
        color: watch("color"),
        createdAt: new Date(),
      });
      // queryClient.resetQueries({
      //   queryKey: ["message"],
      // });
      // const exMessages: messageProps[] | undefined = queryClient.getQueryData([
      //   "message",
      // ]);
      // const newMessages = exMessages;
      // newMessages?.push({
      //   messageId: "",
      //   content: watch("message"),
      //   color: watch("color"),
      //   createdAt: new Date(),
      // });
      // console.log("newMessages :::", exMessages);

      // queryClient.setQueryData(["message"], newMessages);

      // const testData: messageProps[] | undefined = queryClient.getQueryData([
      //   "message",
      // ]);
      // queryClient.resetQueries({
      //   queryKey: ["message"],
      // });

      form.setValue("message", "");
      // setGoDown(true);
    } else {
      alert("소켓 언디파이");
    }
  }, [socket, form]);
  // useEffect(() => {
  //   queryClient.resetQueries({
  //     queryKey: ["message"],
  //   });
  // }, [socket]);

  // if (!socket?.connected) {
  //   return <></>;
  // }
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onHandleSubmit();
          }}
        >
          <div className={styles.form}>
            <div className={styles.formData}>
              <div className={styles.formMain}>
                <input
                  type="text"
                  style={{ backgroundColor: `${watch("color")}` }}
                  onChange={(e) => form.setValue("message", e.target.value)}
                  value={watch("message")}
                />
                <button type="submit">전송</button>
              </div>
              <div className={styles.colorMain}>
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={styles.colorMain}
                    style={{ backgroundColor: `${color}` }}
                    onClick={() => onHandleClick(color)}
                  ></button>
                ))}
                {/* <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button>
            <button className={styles.colorMain}></button> */}
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default FormData;
