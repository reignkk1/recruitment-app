import PageButtons from "@/components/PageButtons";
import PostList from "@/components/PostList";
import Search from "@/components/Search";
import { css } from "@emotion/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";

export interface IData {
  id: string;
  title: string;
  link: string;
  company: { name: string; link: string };
  workPlace: string;
  career: string;
  education: string;
  etc: string;
  deadLines: string;
}

export default function Page({ data }: { data: IData[] }) {
  return (
    <div
      css={css`
        width: 1200px;
        margin: 0 auto;
      `}
    >
      <Search />
      <PostList posts={data} />
      <PageButtons />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {
    query: { job = "frontend", career = "junior", page = "1", path },
  } = context;
  const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${
    path![0]
  }?job=${job}&career=${career}&page=${page}`;
  const { data } = await axios.get(GET_URI);

  return { props: { data } };
}
