import { css } from "@emotion/react";
import PageButtons from "../PageButtons";
import PostList from "../PostList";
import Search from "../Search";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IData } from "@/pages/[[...path]]";
import { useRouter } from "next/router";
import axios from "axios";

export default function PostContent({ data }: { data: IData[] }) {
  const [posts, setPosts] = useState<IData[]>(data);
  const [loading, setLoading] = useState(false);
  const { query, asPath } = useRouter();
  const section = query.path! || "";
  const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section[0]}?job=${query.job}&career=${query.career}&page=${query.page}`;

  const getFetchPosts = async () => {
    const { data } = await axios.get(GET_URI);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (query.job) {
      setLoading(true);
      getFetchPosts();
    } else {
      setPosts(data);
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
    <div
      css={css`
        width: 1200px;
        margin: 0 auto;
      `}
    >
      <Search />
      <PostList posts={posts} />
      <PageButtons />
    </div>
  );
}
