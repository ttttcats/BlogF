"use client";
import React, { Fragment, useEffect, useState } from "react";
import styles from "@/styles/module/(afterLogin)/wrapper.module.scss";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/.velite";
import Post from "@/components/Post";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getLocalMdx } from "@/_lib/getMdxPosts";
import { MdxOptions } from "velite";
import { postProps as IpostProps } from "@/model/postsModel";
import { useInView } from "react-intersection-observer";
type Props = {
  category: string | null;
};
type InfiniteProps = {
  post: IpostProps[];
  TotalPage: number;
};
export default function PostContainer({ category }: Props) {
  // console.log("category : ", category);
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });
  const [pageNumbers, setPageNumbers] = useState(1);

  const view = 2;
  // const { data } = useQuery<
  //   IpostProps[],
  //   Object,
  //   IpostProps[],
  //   [_1: string, _2: string]
  // >({
  //   queryKey: ["posts", category],
  //   queryFn: getMdx,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      name: "asdas",
    },
  };
  const backData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_BASE_URL}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: posts,
        }),
      }
    );
    console.log(" backData :: ", res.json());
  };

  ////////// ////////////////////////////////////////////////////////////
  // if (category === null) category = "";
  // const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
  //   [_1: string, _2: string, _3: number],
  //   number
  // >({
  //   queryKey: ["posts", category, pageNumbers],
  //   queryFn: getTestMdx(this.queryKey),
  //   getNextPageParam: (lastPage, allPages) => {
  //     const nextPage = 3 * allPages.length;

  //     const lastPageNum = lastPage.post?.at(-1)?.pageNum;
  //     if (lastPageNum === undefined) return;
  //     // return allPages.length;
  //     return lastPageNum === undefined ? undefined : nextPage;
  //   },
  //   initialPageParam: 0,
  //   // getNextPageParam: (lastPage, allPages) => {
  //   //   console.log("allPages : ", allPages);
  //   //   console.log("allPages.length : ", allPages.length);
  //   //   console.log("lastpage : ", lastPage);
  //   //   console.log("lastpage.length : ", lastPage.length);
  //   //   console.log("lastpage : ", lastPage.at(-1)?.pageNum);

  //   //   return lastPage.at(-1)?.pageNum && undefined;
  //   // },

  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });

  ////////// ////////////////////////////////////////////////////////////

  if (category === null) category = "";
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    InfiniteProps,
    Object,
    InfiniteData<InfiniteProps>,
    [_1: string, _2: string, _3: number],
    number
  >({
    queryFn: getLocalMdx,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = 3 * allPages.length;

      const lastPageNum = lastPage.post?.at(-1)?.pageNum;
      if (lastPageNum === undefined) return;
      // return allPages.length;
      return lastPageNum === undefined ? undefined : nextPage;
    },
    queryKey: ["posts", category, pageNumbers],
    initialPageParam: 0,
    // getNextPageParam: (lastPage, allPages) => {
    //   console.log("allPages : ", allPages);
    //   console.log("allPages.length : ", allPages.length);
    //   console.log("lastpage : ", lastPage);
    //   console.log("lastpage.length : ", lastPage.length);
    //   console.log("lastpage : ", lastPage.at(-1)?.pageNum);

    //   return lastPage.at(-1)?.pageNum && undefined;
    // },

    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  console.log("data pages ====", data);

  // const { data } = useQuery<[category: string]>({
  //   queryKey: ["posts", "test"],
  //   queryFn: getMdx,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });
  // console.log("postcontainer post 첫번째 비동기: ", post);

  useEffect(() => {
    // backData();
    if (inView) {
      fetchNextPage();
      // !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  if (data) {
    return (
      <div className={styles.container}>
        <div>
          📝 {category} ({data.pages.at(-1)?.TotalPage})
        </div>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            {data &&
              data?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page.post &&
                    page.post.map((p, i) => (
                      <Link key={i} href={p.slug}>
                        <section className={styles.section}>
                          <Post
                            title={p.title}
                            description={p.description}
                            date={p.date}
                            image={p.thumbnail}
                            category={p.permalink.split("/")[0]}
                            pageNum={p.pageNum}
                          />
                        </section>
                      </Link>
                    ))}
                </Fragment>
              ))}
            {/* {data &&
              data?.map((p) => (
                <Link key={p.date} href={p.slug}>
                  <section className={styles.section}>
                    <Post
                      title={p.title}
                      description={p.description}
                      date={p.date}
                      image={p.thumbnail}
                      category={p.permalink.split("/")[0]}
                    />
                  </section>
                </Link>
              ))} */}
            {/* <Image
            src={"/images/amplify-repo.png"}
            width="1024"
            height="1024"
            alt="없음"
          /> */}
          </div>
        </main>
        <div ref={ref} style={{ height: 50, marginTop: "70px" }} />
      </div>
    );
  }
  return null;
}
