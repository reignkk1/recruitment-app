import Link from "next/link";
import { css } from "@emotion/react";

export default function SideBar() {
  return (
    <nav
      css={css`
        width: 100px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        background-color: white;
        position: fixed;
        height: 100%;
        padding: 10px 5px;
      `}
    >
      <Link href={"/"}>사이드바 영역</Link>
    </nav>
  );
}
