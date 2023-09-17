import SideBar from "./SideBar";
import Header from "./Header";
import { css } from "@emotion/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        css={css`
          display: flex;
          padding-top: 50px;
        `}
      >
        <SideBar />
        <div
          css={css`
            padding: 50px 50px 50px 150px;
          `}
        >
          {children}
        </div>
      </main>
    </>
  );
}
