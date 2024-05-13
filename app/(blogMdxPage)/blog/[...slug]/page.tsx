import { posts } from "@/.velite";
import "@/styles/mdx.css";
// import "/styles/mdx.css";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { log } from "console";
import React from "react";
import { Callout } from "@/components/callout";
import { MDXContent } from "@/components/mdx-content";
import styles from "@/styles/module/component/postDetail.module.scss";
import "@/styles/module/component/postDetail.scss";
import MDXImage from "@/components/MDXImage";
import dayjs from "dayjs";
interface BlogDetailProps {
  params: {
    slug: string[];
  };
}
dayjs.locale("ko");
const getPost = async (params: BlogDetailProps["params"]) => {
  const slug = params?.slug?.join("/");
  // console.log("slug: ", slug);
  const post = posts.find((post) => post.permalink === slug);
  // console.log("왜ㅔ 안나옴");

  // console.log("내부: ", post?.permalink.split("/")[0]);

  return post;
};

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  // console.log("params :", params);

  const post = await getPost(params);
  // console.log("post :", post);
  // console.log("post.tuhmnail :", post?.thumbnail);
  if (!post || !post.published) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);
  ogSearchParams.set("description", post.description);

  return {
    title: post.title,
    description: post.description,
    authors: { name: "defaultData.author " },
  };
}

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// 빌드 시점에 정적으로 생성할 페이지의 경로를 반환.
export const generateStaticParams = async (): Promise<
  BlogDetailProps["params"][]
> => {
  // posts 배열에서 published가 true인 것만 필터링하여 slug만 반환
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.permalink.split("/"),
    }));
};

const BlogDetail = async ({ params: { slug } }: BlogDetailProps) => {
  const post = await getPost({ slug });

  if (!post || !post.published) {
    return notFound();
  }

  const jsonLd = {
    "@context": "http://localhost",
    "@type": "BlogPosting",
    name: post.title,
    description: post.description,
    datePublished: post.date,
  };

  return (
    <section className="pb-24 pt-12 max-w-screen-lg px-6 mx-auto prose dark:prose-invert">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.detail_container}>
        <div>
          <h1 className={styles.title}>{post.title}</h1>
        </div>
        <div className={styles.category}>
          <Link href={`/blog?category=${post.permalink.split("/")[0]}`}>
            {post.permalink.split("/")[0]}
          </Link>
          <time>{dayjs(post.date).format("YYYY년 MM월 DD일")}</time>
        </div>
        <MDXImage src={post.thumbnail} title="" />
        <p>{post.description}</p>
      </div>
      <hr className="my-6" />

      <div className="markdown">
        <MDXContent code={post.body} />
      </div>
      <hr />
      <div>
        <h4>관련 태그</h4>
        <ul className="list-none flex p-0 flex-wrap gap-2">
          {/* {post.tags.map((tag) => (
            <li key={tag} className="p-0">
              <Link href={`/blog?tag=${tag}`}></Link>
            </li>
          ))} */}
        </ul>
      </div>
    </section>
  );
};

export default BlogDetail;
