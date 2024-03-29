import { css } from "@emotion/react";
import Header from "./Header";
import SideBar from "./SideBar";

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <>
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
  width: 100%;
  padding: 50px 50px 50px 150px;
`;
