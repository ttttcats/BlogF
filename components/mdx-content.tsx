import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import MDXImage from "./MDXImage";
import styles from "@/styles/module/component/postDetail.module.scss";
const mdxComponents = {
  Callout,
  MDXImage,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContent = ({ code, components }: MdxProps) => {
  const Component = useMDXComponent(code);
  // console.log("mdx component :", Component);

  return <Component cl components={{ ...mdxComponents, ...components }} />;
};
