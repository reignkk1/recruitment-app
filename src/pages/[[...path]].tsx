import HomeContent from "@/components/contents/HomeContent";
import PostContent from "@/components/contents/PostContent";
import Page from "@/components/layout/Page";
import useActiveSection from "@/hooks/useActiveSection";
import axios from "axios";
import { GetStaticPropsContext } from "next";

export interface IResult {
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

export interface IData {
  result: IResult[];
  total: number;
}

export default function Layout({ data }: { data: IData }) {
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const section = params?.path || "home";
  let props;

  if (section === "home") {
    props = {};
  } else {
    console.log(section);
    const GET_URI = `${process.env.NEXT_PUBLIC_HOST}/api/crawling/${section[0]}?job=frontend&career=junior&page=1`;
    const { data } = await axios(GET_URI);
    props = { data };
  }

  return { props, revalidate: 10 };
}

export async function getStaticPaths() {
  // 정적 생성 페이지 paths
  const staticPaths = ["/", "/saramin", "/jobkorea"];

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
