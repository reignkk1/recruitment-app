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
        div {
          margin-top: 10px;
          margin-left: 30px;
          font-size: 25px;
          font-weight: bold;

          a {
            color: #3f83f8;
          }
        }
      `}
    >
      <div>
        <Link href="/">Recruitment</Link>
      </div>
    </header>
  );
}
