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

export default function PostContent({
  data: { result, total },
}: PostContentProps) {
  const [posts, setPosts] = useState<IResult[]>(result);
  const [loading, setLoading] = useState(false);
  const section = useActiveSection();
  const {
    query: { job = "frontend", career = "junior", page = "1" },
    asPath,
  } = useRouter();
  const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=${job}&career=${career}&page=${page}`;

  const getFetchPosts = async () => {
    const {
      data: { result },
    } = await axios.get(GET_URI);
    setPosts(result);
    setLoading(false);
  };

  useEffect(() => {
    if (job) {
      setLoading(true);
      getFetchPosts();
    } else {
      setPosts(result);
      setLoading(false);
    }
  }, [asPath]);

  if (loading) {
    return (
      <div
        css={css`
          text-align: center;
        `}
      >
        <Image alt="loading" width={600} height={250} src="/loading.gif" />
      </div>
    );
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
