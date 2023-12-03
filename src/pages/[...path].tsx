import Content from "@/components/Content";
import Search from "@/components/Search";
import { css } from "@emotion/react";

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

export default function Page() {
  return (
    <div
      css={css`
        width: 1200px;
        margin: 0 auto;
      `}
    >
      <Search />
      <Content />
    </div>
  );
}
