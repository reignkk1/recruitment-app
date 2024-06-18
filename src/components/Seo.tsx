import { useQuery } from "@/hooks";
import Head from "next/head";

export default function Seo() {
  const { section } = useQuery();

  let title;

  switch (section) {
    case "home":
      title = "흠";
      break;
    case "jobkorea":
      title = "잡코리아";
      break;
    case "saramin":
      title = "사람인";
      break;
    default:
      title = "404 Error";
  }

  return (
    <Head>
      <title>{title + " | Recruitment"}</title>
      <meta
        name="description"
        content="Recruitment 사이트는 개발자 신입/채용 공고 모음 사이트 입니다. 다양한 공고 정보를 지원합니다."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.png" />
    </Head>
  );
}
