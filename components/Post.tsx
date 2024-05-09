import React from "react";
import styles from "/styles/module/component/post.module.scss";
import Image from "next/image";
// import * as dayjs from "dayjs";
// import * as isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import { IconNavIcon, IconSvgHead } from "@/public/svgs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // load on demand
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(advancedFormat); // use plugin
// import "dayjs/locale/kr";
interface blogpost {
  title: string;
  description: string;
  date: string;
  image: string;
  category: string | null;
  pageNum: number;
}

export default function Post({
  title,
  description,
  date,
  image,
  category,
  pageNum,
}: blogpost) {
  // dayjs.extend(advancedFormat);
  dayjs.locale("ko"); // use locale
  console.log("dayjs : ", dayjs(date).format("YYYY년 MM월 DD일"));
  console.log("slug = ", category);

  return (
    <div className={styles.container}>
      <div className={styles.postWrapper}>
        <div className={styles.content}>
          <section className={styles.text}>
            <time>{dayjs(date).format("YYYY년 MM월 DD일")}</time>
            <h3>{title}</h3>
            <p>{description}</p>
          </section>
          <section className={styles.img}>
            <Image src={image} width={200} height={110} alt="없음" />
            {/* <IconSvgHead width="200" height="110" /> */}
          </section>
        </div>
        <div className={styles.title}>
          <span>{category}</span>
        </div>
      </div>
    </div>
  );
}
