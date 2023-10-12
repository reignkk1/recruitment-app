import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Content from "@/components/Content";
import Search from "@/components/Search";
import { Suspense } from "react";

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

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Search />
      <Suspense fallback={<div>로딩중</div>}>
        <Content data={data} />
      </Suspense>
    </div>
  );
}

export const getStaticProps = (async ({ params }) => {
  const section = params?.path![0];

  const GET_URL = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?job=frontend&career=junior&page=1`;

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
          path: ["saramin"],
        },
      },
      {
        params: {
          path: ["jobkorea"],
        },
      },
    ],
    fallback: false,
  };
}
