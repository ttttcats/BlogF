"use client";
import styles from "../../styles/module/SideBar.module.scss";
import cn from "clsx";
import Link from "next/link";
import {
  IconFacebook,
  IconGitHub,
  IconInstagram,
  IconLikedIn,
} from "../../public/svgs";
import { usePathname } from "next/navigation";
import React from "react";
function SideBar() {
  const path = usePathname();
  console.log("path :: ", path.split("/")[1]);

  const handleHeadingClick = (id: string): void => {
    const element = document.getElementById(id);

    if (element === null) {
      return;
    }

    window.scrollTo({
      top: element.offsetTop + 300,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h4>📩 Contacts</h4>
      </div>

      <aside className={styles.aside}>
        <Link
          id="guestbook"
          href={"/guestbook"}
          onClickCapture={() => handleHeadingClick("guestbook")}
          className={cn(path.split("/")[1] === "guestbook" && styles.select)}
        >
          <IconInstagram width="40" height="40" />
          <p>GuestBook</p>
        </Link>
        <Link href={"/"}>
          <IconGitHub width="40" height="40" />
          <p>GitHub</p>
        </Link>
        <Link href={"/"}>
          <IconLikedIn width="40" height="40" />
          <p>LinkedIn</p>
        </Link>
        <Link href={"/"}>
          <IconFacebook width="40" height="40" />
          <p>Facebook</p>
        </Link>
        <Link href={"/"}>
          <IconInstagram width="40" height="40" />
          <p>Instagram</p>
        </Link>
      </aside>
    </div>
  );
}

export default React.memo(SideBar);
