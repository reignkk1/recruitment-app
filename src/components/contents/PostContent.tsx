import { css } from "@emotion/react";
import PostList from "../PostList";
import Search from "../Search";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IData, IResult } from "@/pages/[[...path]]";
import { useRouter } from "next/router";
import axios from "axios";
import Pagination from "../Pagination";
import useActiveSection from "@/hooks/useActiveSection";

interface PostContentProps {
  data: IData;
}

export default function PostContent({ data }: PostContentProps) {
  const [posts, setPosts] = useState<IResult[]>(data.result);
  const [total, setTotal] = useState(data.total);
  const [loading, setLoading] = useState(false);
  const section = useActiveSection();
  const {
    query: { job = "frontend", career = "junior", page = "1" },
    asPath,
  } = useRouter();
  const isQueryString = asPath.split(/[\?\#]/)[1];

  const getFetchPosts = async () => {
    const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=${job}&career=${career}&page=${page}`;
    const {
      data: { result, total },
    } = await axios.get(GET_URI);
    setPosts(result);
    setTotal(total);
    setLoading(false);
  };

  useEffect(() => {
    if (isQueryString) {
      setLoading(true);
      getFetchPosts();
    }
  }, [asPath]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div css={Container}>
      <Search />
      <PostList posts={posts} />
      <Pagination total={total} />
    </div>
  );
}

const Container = css`
  width: 1200px;
  margin: 0 auto;
`;

function Loading() {
  return (
    <div css={LoadingContainer}>
      <Image alt="loading" width={600} height={250} src="/loading.gif" />
    </div>
  );
}

const LoadingContainer = css`
  text-align: center;
`;
