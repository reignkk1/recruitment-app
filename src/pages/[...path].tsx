import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import PostList from "@/components/PostList";
import Search from "@/components/Search";

interface IData {
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

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Search />
      <PostList data={data} />
    </div>
  );
}

export const getStaticProps = (async ({ params }) => {
  const page = params?.page || 1;
  const section = params?.path![0];
  const job = params?.job;
  const career = params?.career;

  const GET_URL = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=${job}&career=${career}&page=${page}`;

  const { data } = await axios(GET_URL);

  return { props: { data }, revalidate: 1 };
}) satisfies GetStaticProps<{
  data: IData;
}>;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          page: 1,
          path: ["saramin"],
          job: "frontend",
          career: "junior",
        },
      },
      {
        params: {
          page: 1,
          path: ["jobkorea"],
          job: "frontend",
          career: "junior",
        },
      },
    ],
    fallback: false,
  };
}
