import Head from "next/head";

export default function Seo() {
  const title = "asdf";
  return (
    <Head>
      <title>{title + " | Recruitment"}</title>
      <meta
        name="description"
        content="Recruitment 사이트는 개발자 신입/채용 공고 모음 사이트 입니다. 다양한 공고 정보를 지원합니다."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
