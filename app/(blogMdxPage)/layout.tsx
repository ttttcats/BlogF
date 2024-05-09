"use client";
import Header from "../_component/Header";
import styles from "../../styles/module/layout/afterLoginLayout.module.scss";
import NavBar from "../_component/NavBar";
import SideBar from "../_component/SideBar";
import Footer from "../_component/Footer";
import { useState } from "react";
import PostSideBar from "@/components/PostSideBar";
import { posts } from "@/.velite";
type Props = {
  children: React.ReactNode;
};

export default function BLlogMdxPageLayout({ children }: Props) {
  const [postElement, setPostElement] = useState<HTMLElement | null>(null);

  console.log("postElement =", postElement);
  const headingElements =
    postElement && Array.from(postElement?.querySelectorAll("h2,h3"));

  console.log("headingElements =", headingElements);

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.blogcontainerWrapper}>
        {/* <section className={styles.blognavSection}><NavBar /></section> */}
        <div className={styles.rightSection}>
          <section className={styles.mainWrapper}>
            <section className={styles.mainSection}>
              {/* <div className={styles.title}>
                <div>
                  <h2>Welcome to Beom-blog 🖐️</h2>
                </div>
                <div className={styles.intoduceWrapper}>
                  <div className={styles.intoduce}>
                    ℹ️ 김인범의 블로그에 오신것을 환영합니다. 이곳에는
                    개발뿐만이 아닌, 다양한 카테고리의 글들이 올라올 예정입니다.
                    재미있게 봐주세요. 😀
                  </div>
                </div>
              </div> */}
              <div className={styles.main} ref={setPostElement}>
                {children}
              </div>
            </section>
          </section>
          <section className={styles.sideWrapper}>
            <section className={styles.blogsideSection}>
              <PostSideBar postId={"sadsa"} postElement={postElement} />
            </section>
          </section>
        </div>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
