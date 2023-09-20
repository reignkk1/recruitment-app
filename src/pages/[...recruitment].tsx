import Content from "@/components/Content";
import axios from "axios";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

interface IData {
  data: {
    title: string;
    link: string;
    company: { name: string; link: string };
    workPlace: string;
    career: string;
    education: string;
    deadLines: string;
  }[];
}

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Content data={data} />;
}

export const getServerSideProps = (async ({ params }) => {
  console.log(params?.recruitment);
  const { data } = await axios.get(
    `http://localhost:3000/api/crawling/${params?.recruitment}`
  );
  if (!data) {
    return {
      notFound: true,
    };
  }
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IData;
}>;
