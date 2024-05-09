"use client";

import styles from "../../styles/module/header.module.scss";
import { IconDarkModeMoon, IconDarkModeSun, IconSvgHead } from "@/public/svgs";
import { useEffect, useState } from "react";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// import { getMdxPosts } from "@/_lib/getMdxPosts";
import { useInView } from "react-intersection-observer";
export default function Header() {
  // const g: undefined | boolean | string = getCookie("data-theme");
  // document.documentElement.getAttribute("data-theme");
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  // const [co, setco] = useState("false");

  setCookie("data-theme", "false");
  console.log(getCookie("data-theme"));
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", `${co}`);
  // }, [co]);
  const onClickCookie = () => {
    // setco(co === "true" ? "false" : "true");
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  const onClickHome = () => {
    router.push("/");
  };
  // const { data } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getMdxPosts,
  // });
  // console.log("header data =", data);

  // const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: ["posts"],
  //   queryFn: getMdxPosts,
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
  //   // getNextPageParam: (lastPage, allPages) => {
  //   //   const nextPage = allPages.length + 1;
  //   //   return lastPage.data.length === 0 ? undefined : nextPage;
  //   // },
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });
  // useEffect(() => {
  //   if (inView) {
  //     !isFetching && hasNextPage && fetchNextPage();
  //     console.log("data : ", data);
  //   }
  // }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <div className={styles.container}>
      <div className={styles.headerFixed}>
        <div className={styles.headerSection}>
          <section style={{ cursor: "pointer" }} onClick={onClickHome}>
            <div className={styles.svgSection}>
              <IconSvgHead width="24" height="24" />
            </div>
            <span>Beom-blog </span>
          </section>
          <section>
            <div className={styles.svgDarkMode} onClick={onClickCookie}>
              {resolvedTheme === "light" ? (
                <IconDarkModeSun width="30" height="30" />
              ) : (
                <IconDarkModeMoon width="30" height="30" />
              )}
            </div>
          </section>
        </div>
      </div>
      <div ref={ref} style={{ height: 50 }} />
    </div>
  );
}
