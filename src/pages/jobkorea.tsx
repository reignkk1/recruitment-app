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

export default function jobkorea({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Content data={data} />;
}

export const getServerSideProps = (async () => {
  const { data } = await axios.get(
    "http://localhost:3000/api/crawling/jobkorea"
  );
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IData;
}>;
