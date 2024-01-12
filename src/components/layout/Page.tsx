import { css } from "@emotion/react";
import Header from "./Header";
import SideBar from "./SideBar";
import Seo from "../Seo";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <Seo />
      <Header />
      <main css={Main}>
        <SideBar />
        <div css={Content}>{children}</div>
      </main>
    </>
  );
}

const Main = css`
  display: flex;
  padding-top: 50px;
`;

const Content = css`
  width: 85%;
  padding: 50px 50px 50px 150px;
`;
