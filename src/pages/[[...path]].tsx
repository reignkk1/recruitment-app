import HomeContent from "@/components/contents/HomeContent";
import PostContent from "@/components/contents/PostContent";
import { useQuery } from "@/hooks";
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

export interface IPosts {
  result: IResult[];
  total: number;
}

export default function Layout({ data: posts }: { data: IPosts }) {
  const { section } = useQuery();

  let content;

  switch (section) {
    case "home":
      content = <HomeContent />;
      break;
    case "jobkorea":
    case "saramin":
      content = <PostContent posts={posts} />;
      break;
  }

  return content;
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
