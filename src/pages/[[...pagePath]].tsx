import Content from "@/components/Content";
import useActiveSection from "@/utils/useActiveSection";
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

let getServerSideProps: GetServerSideProps | string;
let section;
export default function Page({ data }: IData) {
  section = useActiveSection();

  const isHome = section === "홈";

  if (isHome) {
    return <div>홈</div>;
  }

  return <Content data={data} />;
}

if (section === "홈") {
  getServerSideProps = "";
} else {
  getServerSideProps = (async ({ params }) => {
    console.log(params);
    const { data } = await axios.get(
      `http://localhost:3000/api/crawling/saramin`
    );
    return { props: { data } };
  }) satisfies GetServerSideProps<{
    data: IData;
  }>;
}

export { getServerSideProps };
