import HomeContent from "@/components/contents/HomeContent";
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
    case "home":
      content = <HomeContent />;
      break;
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
  if (cleanedPath === "/") {
    return "home";
  } else if (cleanedPath === "/saramin") {
    return "saramin";
  } else if (cleanedPath === "/jobkorea") {
    return "jobkorea";
  }
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const section = params?.path || "home";
  let props;

  if (section === "home") {
    props = {};
  } else {
    const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section[0]}?job=frontend&career=junior&page=1`;
    const { data } = await axios(GET_URI);
    props = { data };
  }

  return { props, revalidate: 10 };
}

export async function getStaticPaths() {
  // 정적 생성 페이지 paths
  const staticPaths = ["/", "/saramin", "/jobkorea"];

  // '/foo/bar/baz' => ['foo','bar','baz']
  const getSegment = (staticPath: string) => {
    let segement = staticPath.split("/");
    segement.shift();
    return segement;
  };

  const paths = staticPaths.map((staticPath) => ({
    params: {
      path: getSegment(staticPath),
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}
