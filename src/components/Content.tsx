import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageButtons from "./PageButtons";
import useQuery from "@/utils/useQuery";
import PostList from "./PostList";
import { IData } from "@/pages/[...path]";

export default function Content() {
  const [posts, setPosts] = useState<IData[]>();
  const [loading, setLoading] = useState(false);

  const {
    section,
    job = "frontend",
    career = "junior",
    page = "1",
  } = useQuery();
  const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=${job}&career=${career}&page=${page}`;

  const getPostsFetch = async () => {
    setLoading(true);
    const { data } = await axios.get(GET_URI);
    setLoading(false);
    setPosts(data);
  };

  useEffect(() => {
    if ((job && career && page) || section) {
      getPostsFetch();
    }
  }, [job, career, page, section]);

  if (loading) {
    return (
      <div
        css={css`
          text-align: center;
        `}
      >
        <img src="/loading.gif" />
      </div>
    );
  }

  return (
    <>
      <PostList posts={posts || []} />
      <PageButtons />
    </>
  );
}
