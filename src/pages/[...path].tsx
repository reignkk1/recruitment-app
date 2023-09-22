import Content from "@/components/Content";
import useActiveSection from "@/utils/useActiveSection";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const section = useActiveSection();
  return <Content data={data} section={section} />;
}

export const getServerSideProps = (async ({ params, query }) => {
  const page = query.page || 1;
  const section = params?.path![0];

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?page=${page}`
  );
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: IData;
}>;
