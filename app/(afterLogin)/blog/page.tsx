"use client";
import { useSearchParams } from "next/navigation";
import PostContainer from "@/components/PostContainer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
// import { getMdx } from "@/_lib/getMdxPosts";
type Props = {
  category: string | null;
};
export default function Page() {
  const searchQuery = useSearchParams();
  const query = searchQuery.get("category");
  let category = query;
  if (category === undefined || category === null) {
    category = "";
  }
  console.log("blogpage searchuquercy : ", query);

  // const queryClient = new QueryClient();
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["posts", "All"],
  //   queryFn: getMdx,
  //   initialPageParam: 0,
  // });
  // const dehydratedState = dehydrate(queryClient);
  return (
    <PostContainer category={query} />
    // <HydrationBoundary state={dehydratedState}>
    // </HydrationBoundary>
  );
}
