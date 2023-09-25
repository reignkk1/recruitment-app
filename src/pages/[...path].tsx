import Content from "@/components/Content";
import useActiveSection from "@/utils/useActiveSection";
import axios from "axios";
import { GetStaticProps, InferGetStaticPropsType } from "next";

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
  const section = useActiveSection();
  return <Content data={data} section={section} />;
}

export const getStaticProps = (async ({ params }) => {
  const page = params?.page || 1;
  const section = params?.path![0];

  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section}?page=${page}`
  );

  return { props: { data }, revalidate: 60 };
}) satisfies GetStaticProps<{
  data: IData;
}>;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { page: 1, path: ["saramin"] } },
      { params: { page: 1, path: ["jobkorea"] } },
    ],
    fallback: false,
  };
}
