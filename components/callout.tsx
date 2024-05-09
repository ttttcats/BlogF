import "@/styles/mdx/mdx.scss";
import cn from "clsx";
interface Info {
  code?: string;
  text: string;
}

export const Callout = ({ code, text }: Info) => {
  // your common component
  return <div className={cn("call_out", code)}>{text}</div>;
};
