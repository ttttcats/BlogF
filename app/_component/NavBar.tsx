"use client";

import styles from "../../styles/module/NavBar.module.scss";
import Link from "next/link";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import cn from "clsx";
import { utilGetCategory } from "@/util/velite";
import { urlPathName } from "@/util/searchParam";
import React from "react";
function NavBar() {
  const segment = useSelectedLayoutSegment();
  console.log("segment : ", segment);

  const getCategory = utilGetCategory().categoryname;
  const searchQuery = useSearchParams();
  const query = searchQuery.get("category");

  const handleOFFsettop = (id: string) => {
    const element = document.getElementById(id);

    if (element === null) {
      return;
    }

    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container} id="navMain">
      <div className={styles.catagories}>
        📮
        <h4>Categories</h4>
      </div>
      <section className={styles.navMain}>
        <ul>
          {getCategory.map((value, index) => (
            <Link
              key={index}
              onClickCapture={() => handleOFFsettop("navMain")}
              href={{ pathname: "/blog", query: { category: value } }}
            >
              <li className={cn(query === value && styles.select)}>{value}</li>
            </Link>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default React.memo(NavBar);
