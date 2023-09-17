import Link from "next/link";
import { css } from "@emotion/react";

export default function Header() {
  return (
    <header
      css={css`
        background-color: white;
        position: fixed;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      `}
    >
      <Link href={"/about"}>채용 사이트 모음집</Link>
    </header>
  );
}
