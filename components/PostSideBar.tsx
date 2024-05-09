import usePostToc from "@/util/postToc";
import styles from "@/styles/module/component/postDetail.module.scss";
import { Ref } from "react";
type PostSideProps = {
  postId: string;
  postElement: HTMLElement | null;
};

const PostSideBar = ({ postId, postElement }: PostSideProps): JSX.Element => {
  const { headings, activeId, handleHeadingClick } = usePostToc({
    postId,
    postElement,
    disable: false,
  });

  return (
    <ul>
      {headings.map(({ id, text, level }) => (
        <li
          className={styles.ul}
          key={id}
          style={{
            fontSize: level > 2 ? "24px" : "25px",
            lineHeight: "1.5",
            wordBreak: "keep-all",
            color: id === activeId ? "rgb(33, 150, 243)" : "var(--color-text)",
            cursor: "pointer",
            margin: level > 2 ? `0 0 0 ${(level * 10) / 2}px` : "0",
            marginBottom: "15px",
            listStyle: "none",
          }}
          onClick={() => handleHeadingClick(id)}
        >
          {text}
        </li>
      ))}
    </ul>
  );
};

export default PostSideBar;
