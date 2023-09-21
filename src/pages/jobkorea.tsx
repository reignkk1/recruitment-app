import Content from "@/components/Content";
import axios from "axios";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";

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

export default function jobkorea({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Content data={data} />;
}

export const getServerSideProps = (async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/api/crawling/jobkorea`
  );
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IData;
}>;
