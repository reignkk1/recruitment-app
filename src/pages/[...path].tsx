import PostContent from "@/components/contents/PostContent";
import Page from "@/components/layout/Page";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

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

export default function Layout({ data }: { data: IData[] }) {
  const section = useActiveSection();
  let content;

  switch (section) {
    case "jobkorea":
    case "saramin":
      content = <PostContent data={data} />;
      break;
  }

  return <Page>{content}</Page>;
}

function useActiveSection() {
  const { asPath } = useRouter();
  const cleanedPath = asPath.split(/[\?\#]/)[0];
  if (cleanedPath === "/saramin") {
    return "saramin";
  } else if (cleanedPath === "/jobkorea") {
    return "jobkorea";
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const section = params?.path || "";
  const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section[0]}?job=frontend&career=junior&page=1`;
  const { data } = await axios(GET_URI);
  return { props: { data }, revalidate: 10 };
}

export async function getStaticPaths() {
  const staticPaths = ["saramin", "jobkorea"];
  const paths = staticPaths.map((staticPath) => ({
    params: {
      path: [staticPath],
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
