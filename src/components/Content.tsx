import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import PageButtons from "./PageButtons";
import useQuery from "@/utils/useQuery";
import PostList from "./PostList";
import { IData } from "@/pages/[...path]";
import Image from "next/image";

export default function Content({ data }: { data: IData[] }) {
  const [posts, setPosts] = useState<IData[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(data);
    setLoading(false);
  }, []);

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
    <>
      <PostList posts={data} />
      <PageButtons />
    </>
  );
}
