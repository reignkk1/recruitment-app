import { css } from "@emotion/react";
import PostList from "../PostList";
import Search from "../Search";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IPosts, IResult } from "@/pages/[[...path]]";
import { useRouter } from "next/router";
import axios from "axios";
import Pagination from "../Pagination";
import { useQuery } from "@/hooks";

export default function PostContent({ posts }: { posts: IPosts }) {
  return (
    <>
      <Search />
      <PostListContainer posts={posts} />
    </>
  );
}

function PostListContainer({ posts }: { posts: IPosts }) {
  const [total, setTotal] = useState(posts?.total);
  const [curPosts, setCurPosts] = useState<IResult[]>(posts?.result);
  const [loading, setLoading] = useState(false);
  const { section } = useQuery();
  const {
    query: { job = "frontend", career = "junior", page = "1" },
    asPath,
  } = useRouter();
  const isDataFetch = asPath.split("?")[1];

  const getFetchPosts = async () => {
    const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=${job}&career=${career}&page=${page}`;
    const {
      data: { result, total },
    } = await axios.get(GET_URI);
    setCurPosts(result);
    setTotal(total);
    setLoading(false);
  };

  useEffect(() => {
    if (isDataFetch) {
      setLoading(true);
      getFetchPosts();
    }
  }, [asPath]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div css={Container}>
      <PostList posts={curPosts} />
      <Pagination total={total} />
    </div>
  );
}

function Loading() {
  return (
    <div css={[Container, LoadingContainer]}>
      <Image alt="loading" width={600} height={250} src="/loading.gif" />
    </div>
  );
}

const Container = css`
  width: 1200px;
  margin: 120px auto;
`;

const LoadingContainer = css`
  text-align: center;
`;
