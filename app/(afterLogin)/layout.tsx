import Header from "../_component/Header";
import styles from "../../styles/module/layout/afterLoginLayout.module.scss";
import NavBar from "../_component/NavBar";
import SideBar from "../_component/SideBar";
import Footer from "../_component/Footer";
import cn from "clsx";
import { getGuestMessage } from "@/_lib/getMdxPosts";
import { QueryClient } from "@tanstack/react-query";
type Props = {
  children: React.ReactNode;
};
export default async function afterLoginLayout({ children }: Props) {
  console.log("레이아웃");
  const queryClient = new QueryClient();
  // const { data, isLoading } = useQuery<messageProps[]>({
  //   queryKey: ["message"],
  //   queryFn: getGuestMessage,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });

  // console.log("게스트 데이타 :", data);
  await queryClient.prefetchQuery({
    queryKey: ["message"],
    queryFn: getGuestMessage,
  });
  return (
    <body className={styles.container}>
      <Header />

      <div className={styles.containerWrapper}>
        <section className={styles.navSection}>
          <NavBar />
        </section>
        <div className={styles.rightSection}>
          <section className={styles.mainWrapper}>
            <section className={styles.mainSection}>
              <div className={cn(styles.title)}>
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
              </div>
              <section className={styles.navSection2}>
                <NavBar />
              </section>
              <div className={styles.main}>{children}</div>
              {/* <div style={{ width: "100%", height: "500px" }}></div> */}
              {/* <div style={{ width: "100%", height: "500px" }}></div> */}
            </section>
          </section>
          <section className={styles.sideWrapper}>
            <section className={styles.sideSection}>
              <SideBar />
            </section>
          </section>
        </div>
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </body>
  );
}
