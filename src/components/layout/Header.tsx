import Link from "next/link";
import { css } from "@emotion/react";

export default function Header() {
  return (
    <div
      css={css`
        height: 100px;
      `}
    >
      <Link href={"/about"}>헤더 영역</Link>
    </div>
  );
}
