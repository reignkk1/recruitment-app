import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageButtons from "./PageButtons";
import useQuery from "@/utils/useQuery";
import PostList from "./PostList";
import { IData } from "@/pages/[...path]";

interface IContent {
  data: IData[];
}

export default function Content({ data }: IContent) {
  const [posts, setPosts] = useState<IData[]>();
  const [loading, setLoading] = useState(false);

  const { section, job, career, page } = useQuery();
  const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=${job}&career=${career}&page=${page}`;

  const getPostsFetch = async () => {
    setLoading(true);
    const { data } = await axios.get(GET_URI);
    setLoading(false);
    setPosts(data);
  };

  useEffect(() => {
    if (job && career && page) {
      getPostsFetch();
    } else {
      setPosts(data);
    }
  }, [job, career, page, data]);

  if (loading) {
    return (
      <div
        css={css`
          font-size: 28px;
          font-weight: bold;
          text-align: center;
        `}
      >
        🛠️크롤링 중..
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
